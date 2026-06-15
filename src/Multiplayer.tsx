import React, { useEffect, useState, useRef } from 'react';
import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

// Initialize Yjs and WebRTC
export const ydoc = new Y.Doc();
export const provider = new WebrtcProvider('library-of-code-v1', ydoc, {
  signaling: ['wss://signaling.yjs.dev', 'wss://y-webrtc-signaling-eu.herokuapp.com', 'wss://y-webrtc-signaling-us.herokuapp.com']
});
export const awareness = provider.awareness;

const colors = ["#d56b3f", "#4aaac7", "#7c72e8", "#58b480", "#e3c94b", "#c95858", "#9c712d"];
const myColor = colors[Math.floor(Math.random() * colors.length)];
const myName = `Reader-${Math.floor(Math.random() * 9999)}`;

// Initial state
awareness.setLocalStateField('user', {
  name: myName,
  color: myColor,
  pos: [0, 1.5, 0],
  rot: [0, 0, 0]
});

export function useMultiplayerState() {
  const [users, setUsers] = useState<Map<number, any>>(new Map());

  useEffect(() => {
    const updateUsers = () => {
      const state = awareness.getStates();
      const activeUsers = new Map();
      state.forEach((userState, clientId) => {
        if (clientId !== awareness.clientID && userState.user) {
          activeUsers.set(clientId, userState.user);
        }
      });
      setUsers(activeUsers);
    };

    awareness.on('change', updateUsers);
    updateUsers();

    return () => {
      awareness.off('change', updateUsers);
    };
  }, []);

  return users;
}

// Avatar component representing another player
function RemoteAvatar({ user }: { user: any }) {
  const group = useRef<THREE.Group>(null);
  const targetPos = useRef(new THREE.Vector3(...(user.pos || [0,0,0])));
  const targetRot = useRef(new THREE.Euler(...(user.rot || [0,0,0])));

  useEffect(() => {
    if (user.pos) targetPos.current.set(...user.pos);
    if (user.rot) targetRot.current.set(...user.rot);
  }, [user.pos, user.rot]);

  useFrame((state, delta) => {
    if (group.current) {
      // Smooth interpolation (lerp)
      group.current.position.lerp(targetPos.current, 0.2);
      
      // We only really care about Y rotation (turning left/right) for the avatar body
      const currentRot = group.current.rotation.y;
      const targetY = targetRot.current.y;
      
      // Shortest path rotation
      let diff = targetY - currentRot;
      while (diff < -Math.PI) diff += Math.PI * 2;
      while (diff > Math.PI) diff -= Math.PI * 2;
      
      group.current.rotation.y += diff * 0.2;
      
      // Floating animation
      group.current.position.y += Math.sin(state.clock.elapsedTime * 2 + targetPos.current.x) * 0.002;
    }
  });

  return (
    <group ref={group} position={user.pos} rotation={[0, user.rot?.[1] || 0, 0]}>
      {/* Glowing Book Avatar */}
      <mesh position={[0, -0.2, 0]}>
        <boxGeometry args={[0.4, 0.5, 0.1]} />
        <meshStandardMaterial 
          color={user.color} 
          emissive={user.color} 
          emissiveIntensity={0.5} 
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
      {/* Ghostly trail/aura */}
      <mesh position={[0, -0.2, 0]}>
        <boxGeometry args={[0.45, 0.55, 0.15]} />
        <meshBasicMaterial color={user.color} transparent opacity={0.2} blending={THREE.AdditiveBlending} />
      </mesh>
      
      {/* Username label */}
      <Text
        position={[0, 0.4, 0]}
        fontSize={0.15}
        color={user.color}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#ffffff"
      >
        {user.name}
      </Text>
    </group>
  );
}

export function MultiplayerAvatars() {
  const users = useMultiplayerState();
  
  return (
    <>
      {Array.from(users.entries()).map(([id, user]) => (
        <RemoteAvatar key={id} user={user} />
      ))}
    </>
  );
}
