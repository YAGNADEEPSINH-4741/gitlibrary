import { useEffect, useMemo, useRef, useState, useLayoutEffect } from "react";
import { Canvas, useFrame, useThree, createPortal } from "@react-three/fiber";
import { PointerLockControls, Text, Html } from "@react-three/drei";
import * as THREE from "three";
import { ExternalLink, LoaderCircle, X, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { githubToRepo, type Repo } from "./data";
import { awareness, MultiplayerAvatars, useMultiplayerState } from "./Multiplayer";

const isTouch = typeof window !== 'undefined' && (('ontouchstart' in window) || (navigator.maxTouchPoints > 0));

function MobileLookControls() {
  const { camera, gl } = useThree();
  const prev = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const start = (e: TouchEvent) => { prev.current = { x: e.touches[0].clientX, y: e.touches[0].clientY } };
    const move = (e: TouchEvent) => {
      const t = e.touches[0];
      const dx = t.clientX - prev.current.x, dy = t.clientY - prev.current.y;
      prev.current = { x: t.clientX, y: t.clientY };
      const euler = new THREE.Euler(0, 0, 0, 'YXZ');
      euler.setFromQuaternion(camera.quaternion);
      euler.y -= dx * 0.006;
      euler.x -= dy * 0.006;
      euler.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, euler.x));
      camera.quaternion.setFromEuler(euler)
    };
    gl.domElement.addEventListener('touchstart', start);
    gl.domElement.addEventListener('touchmove', move);
    return () => {
      gl.domElement.removeEventListener('touchstart', start);
      gl.domElement.removeEventListener('touchmove', move)
    }
  }, [camera, gl]);
  return null
}

function Walker({ onProgress, maxZ, joystick, setCameraZ, paused }: { onProgress: (z: number) => void; maxZ: number; joystick: React.MutableRefObject<Record<string, boolean>>; setCameraZ: (z: number) => void; paused: boolean }) {
  const k = useRef<Record<string, boolean>>({}), last = useRef(0), lastSync = useRef(0);
  useEffect(() => {
    const d = (e: KeyboardEvent) => k.current[e.key.toLowerCase()] = true;
    const u = (e: KeyboardEvent) => k.current[e.key.toLowerCase()] = false;
    addEventListener("keydown", d);
    addEventListener("keyup", u);
    return () => { removeEventListener("keydown", d); removeEventListener("keyup", u) }
  }, []);
  useFrame(({ camera }, dt) => {
    if (paused) return;
    const f = new THREE.Vector3();
    camera.getWorldDirection(f);
    f.y = 0;
    f.normalize();
    const r = new THREE.Vector3().crossVectors(f, camera.up).normalize(), s = 7 * dt;
    if (k.current.w || k.current.arrowup || joystick.current.w) camera.position.addScaledVector(f, s);
    if (k.current.s || k.current.arrowdown || joystick.current.s) camera.position.addScaledVector(f, -s);
    if (k.current.a || k.current.arrowleft || joystick.current.a) camera.position.addScaledVector(r, -s);
    if (k.current.d || k.current.arrowright || joystick.current.d) camera.position.addScaledVector(r, s);
    camera.position.x = THREE.MathUtils.clamp(camera.position.x, -4.2, 4.2);
    camera.position.z = THREE.MathUtils.clamp(camera.position.z, maxZ, 8);
    camera.position.y = 1.7;
    setCameraZ(camera.position.z);
    
    if (Date.now() - lastSync.current > 50) {
      awareness.setLocalStateField('pos', [camera.position.x, camera.position.y, camera.position.z]);
      const e = new THREE.Euler().setFromQuaternion(camera.quaternion, 'YXZ');
      awareness.setLocalStateField('rot', [0, e.y, 0]);
      lastSync.current = Date.now();
    }
    
    if (Math.abs(camera.position.z - last.current) > 2) {
      last.current = camera.position.z;
      onProgress(camera.position.z)
    }
  });
  return null
}

function Bookcase({ z, index }: { z: number; index: number }) {
  return (
    <group position={[0, 0, z]}>
      <Text position={[0, 4.35, 0]} fontSize={.32} color="#725326">AISLE {String(index + 1).padStart(2, "0")}</Text>
      {[-5.7, 5.7].map((x, side) => (
        <group key={x}>
          {[.62, 1.9, 3.18, 4.05].map(y => (
            <mesh key={y} position={[x, y, 0]} castShadow>
              <boxGeometry args={[1.4, .14, 6.6]} />
              <meshStandardMaterial color="#a97943" roughness={.55} />
            </mesh>
          ))}
          <mesh position={[x, 2.3, 0]} castShadow>
            <boxGeometry args={[.3, 4.6, 6.6]} />
            <meshStandardMaterial color="#e3c392" />
          </mesh>
        </group>
      ))}
    </group>
  );
}

const bookGeometry = new THREE.BoxGeometry(1.08, 1.1, .26);
const bookMaterial = new THREE.MeshStandardMaterial({ roughness: .55 });
const colorObj = new THREE.Color();

function InstancedBooks({ repos, onOpen }: { repos: Repo[], onOpen: (r: Repo) => void }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  useLayoutEffect(() => {
    if (!meshRef.current) return;
    const mesh = meshRef.current;
    const dummy = new THREE.Object3D();

    repos.forEach((r, i) => {
      const aisleIndex = Math.floor(i / 18);
      const localIndex = i % 18;
      const side = localIndex < 9 ? 0 : 1;
      const sideIndex = localIndex % 9;
      const row = Math.floor(sideIndex / 3);
      const slot = sideIndex % 3;
      
      const x = side ? 5.7 : -5.7;
      const zOffset = -aisleIndex * 8;
      
      const px = side ? x - 0.3 : x + 0.3;
      const py = 1.24 + row * 1.27;
      const pz = zOffset + (-2.35 + slot * 2.35);
      const ry = side ? -Math.PI / 2 : Math.PI / 2;

      dummy.position.set(px, py, pz);
      dummy.rotation.set(0, ry, 0);
      dummy.updateMatrix();

      mesh.setMatrixAt(i, dummy.matrix);
      
      colorObj.set(r.color);
      mesh.setColorAt(i, colorObj);
    });

    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [repos]);

  return (
    <instancedMesh
      ref={meshRef}
      args={[bookGeometry, bookMaterial, repos.length]}
      castShadow
      onClick={(e) => {
        e.stopPropagation();
        if (e.instanceId !== undefined) {
          try { document.exitPointerLock(); } catch(err){}
          onOpen(repos[e.instanceId]);
        }
      }}
    />
  );
}

function BookLabels({ repos, cameraZ }: { repos: Repo[], cameraZ: number }) {
  const currentAisle = Math.max(0, Math.round(-cameraZ / 8));
  
  const startIdx = Math.max(0, (currentAisle - 1) * 18);
  const endIdx = (currentAisle + 2) * 18;
  const visibleRepos = repos.slice(startIdx, endIdx);

  return (
    <>
      {visibleRepos.map((r, visibleIdx) => {
        const i = startIdx + visibleIdx;
        const aisleIndex = Math.floor(i / 18);
        const localIndex = i % 18;
        const side = localIndex < 9 ? 0 : 1;
        const sideIndex = localIndex % 9;
        const row = Math.floor(sideIndex / 3);
        const slot = sideIndex % 3;

        const x = side ? 5.7 : -5.7;
        const zOffset = -aisleIndex * 8;
        
        const px = side ? x - 0.3 : x + 0.3;
        const py = 1.24 + row * 1.27;
        const pz = zOffset + (-2.35 + slot * 2.35);
        const ry = side ? -Math.PI / 2 : Math.PI / 2;

        return (
          <group key={r.id + "_text"} position={[px, py, pz]} rotation={[0, ry, 0]}>
            <Text position={[0, .1, .14]} fontSize={.105} maxWidth={.88} textAlign="center" color="white">{r.name}</Text>
            <Text position={[0, -.31, .14]} fontSize={.06} maxWidth={.88} color="#fff8e8">{r.score.toLocaleString()}</Text>
          </group>
        );
      })}
    </>
  );
}

function ReadmeOverlay({ repo, onClose }: { repo: Repo, onClose: () => void }) {
  const [readme, setReadme] = useState<string>("Loading README...");

  useEffect(() => {
    fetch(`https://raw.githubusercontent.com/${repo.owner}/${repo.name}/${repo.branch}/README.md`)
      .then(res => res.ok ? res.text() : "# No README found\nSorry, we couldn't load the README for this repository.")
      .then(text => setReadme(text))
      .catch(() => setReadme("# Error\nAn error occurred while fetching the README."));
  }, [repo]);

  return (
    <div className="readme-overlay-2d">
      <div className="readme-overlay-inner">
        <div className="readme-header">
          <div>
            <h1>{repo.name}</h1>
            <a href={repo.url} target="_blank" rel="noreferrer">Open on GitHub <ExternalLink size={16} /></a>
          </div>
          <button onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        <div className="readme-content readme-html-container">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{readme}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

function FloatingGeometry({ z }: { z: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x += 0.005;
      ref.current.rotation.y += 0.01;
      ref.current.position.y = 8 + Math.sin(state.clock.elapsedTime + z) * 0.5;
      if (hovered) {
        ref.current.rotation.x += 0.02;
        ref.current.rotation.y += 0.04;
      }
    }
  });
  return (
    <mesh 
      ref={ref} 
      position={[0, 8, z]} 
      onPointerOver={(e) => { e.stopPropagation(); setHover(true); document.body.style.cursor = 'pointer'; }} 
      onPointerOut={(e) => { e.stopPropagation(); setHover(false); document.body.style.cursor = 'auto'; }}
    >
      <octahedronGeometry args={[1.5, 0]} />
      <meshStandardMaterial 
        color="#ffffff" 
        emissive={hovered ? "#ffb870" : "#ffffff"} 
        emissiveIntensity={hovered ? 2 : 0.5} 
        wireframe={hovered}
      />
    </mesh>
  );
}

function Architecture({ length }: { length: number }) {
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, 0, -length / 2 + 10]}>
        <planeGeometry args={[40, length + 40]} />
        <meshStandardMaterial color="#ffffff" roughness={0.05} metalness={0.1} />
      </mesh>
      <mesh position={[0, 4.8, -length / 2 + 10]} receiveShadow>
        <boxGeometry args={[18, .22, length + 40]} />
        <meshStandardMaterial color="#f0f5ff" />
      </mesh>
      {Array.from({ length: Math.ceil(length / 12) }, (_, i) => (
        <group key={i} position={[0, 0, -i * 12]}>
          <FloatingGeometry z={0} />
          <pointLight position={[0, 4.1, 0]} intensity={30} distance={18} color="#e0f0ff" />
          <mesh position={[0, 4.55, 0]}>
            <cylinderGeometry args={[.8, 1.2, .18, 24]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.6} />
          </mesh>
          <mesh position={[-7.4, 2, 0]}>
            <boxGeometry args={[.45, 4, 7]} />
            <meshStandardMaterial color="#ffffff" transparent opacity={0.8} />
          </mesh>
          <mesh position={[7.4, 2, 0]}>
            <boxGeometry args={[.45, 4, 7]} />
            <meshStandardMaterial color="#ffffff" transparent opacity={0.8} />
          </mesh>
        </group>
      ))}
    </>
  );
}

export function Library3D({ repos, query, onClose }: { repos: Repo[], query: string, onClose: () => void }) {
  const [all, setAll] = useState<Repo[]>(repos);
  const users = useMultiplayerState();
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<Repo | null>(null);
  const [cameraZ, setCameraZ] = useState(0);
  const joystick = useRef<Record<string, boolean>>({ w: false, a: false, s: false, d: false });
  const sortOptions = ["stars", "forks", "updated", "help-wanted-issues", ""];

  const loadMore = () => {
    if (loading) return;
    setLoading(true);
    const cycle = Math.floor((page - 1) / 10);
    const targetPage = ((page - 1) % 10) + 1;
    const sort = sortOptions[cycle % sortOptions.length];
    fetch(`https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=${sort}&order=desc&per_page=100&page=${targetPage}`)
      .then(r => r.ok ? r.json() : { items: [] })
      .then(d => {
        const fetched = (d.items || []).map(githubToRepo).map((r: Repo) => ({ ...r, id: r.id + "_" + page }));
        setAll(old => {
          let added = fetched;
          if (added.length === 0 && old.length > 0) {
            const numAisles = Math.ceil(old.length / 18);
            const randomAisleIndex = Math.floor(Math.random() * numAisles);
            const start = randomAisleIndex * 18;
            added = old.slice(start, start + 18).map((r: Repo) => ({ ...r, id: r.id + "_copy_" + page + "_" + Math.random().toString(36).substring(7), color: `hsl(${Math.random() * 360}, 60%, 40%)` }));
          }
          return [...old, ...added];
        });
        setPage(p => p + 1);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadMore() }, []);
  
  useEffect(() => {
    if (selected) {
      document.exitPointerLock();
    }
  }, [selected]);
  
  const aisles = useMemo(() => Array.from({ length: Math.max(1, Math.ceil(all.length / 18)) }, (_, i) => all.slice(i * 18, i * 18 + 18)), [all]);
  const length = Math.max(70, aisles.length * 8 + 35);
  
  const progress = (z: number) => { if (-z > aisles.length * 8 - 24) loadMore() };

  return (
    <div className="library3d light">
      <div className="libraryHud">
        <div>
          <strong>THE INFINITE CODE LIBRARY</strong>
          <span>{all.length} books · {aisles.length} aisles · {users.size} other readers · {loading ? "Extending the library ahead..." : "Walk forward to load more"}</span>
        </div>
        {loading && <LoaderCircle className="spin" />}
        <button onClick={onClose}><X /></button>
      </div>
      <div className="crosshair" style={{ display: isTouch || selected ? 'none' : 'block' }} />
      <Canvas camera={{ position: [0, 1.7, 7], fov: 62 }} shadows>
        <color attach="background" args={["#ffffff"]} />
        <fog attach="fog" args={["#ffffff", 15, 70]} />
        <ambientLight intensity={1.5} />
        <hemisphereLight args={["#ffffff", "#d0e5ff", 1.0]} />
        <Architecture length={length} />
        {aisles.map((r, i) => <Bookcase key={i} index={i} z={-i * 8} />)}
        <InstancedBooks repos={all} onOpen={setSelected} />
        <BookLabels repos={all} cameraZ={cameraZ} />
        <MultiplayerAvatars />
        <Walker onProgress={progress} maxZ={-length + 18} joystick={joystick} setCameraZ={setCameraZ} paused={!!selected} />
        {!selected && (isTouch ? <MobileLookControls /> : <PointerLockControls />)}
      </Canvas>
      
      {selected && <ReadmeOverlay repo={selected} onClose={() => setSelected(null)} />}
      
      {isTouch && !selected && (
        <div className="mobileDpad">
          <div className="dpadRow">
            <button onPointerDown={() => joystick.current.w = true} onPointerUp={() => joystick.current.w = false} onPointerLeave={() => joystick.current.w = false}><ArrowUp size={24} /></button>
          </div>
          <div className="dpadRow">
            <button onPointerDown={() => joystick.current.a = true} onPointerUp={() => joystick.current.a = false} onPointerLeave={() => joystick.current.a = false}><ArrowLeft size={24} /></button>
            <button onPointerDown={() => joystick.current.s = true} onPointerUp={() => joystick.current.s = false} onPointerLeave={() => joystick.current.s = false}><ArrowDown size={24} /></button>
            <button onPointerDown={() => joystick.current.d = true} onPointerUp={() => joystick.current.d = false} onPointerLeave={() => joystick.current.d = false}><ArrowRight size={24} /></button>
          </div>
        </div>
      )}
    </div>
  );
}
