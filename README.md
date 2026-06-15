<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>The Library of Code — GitBook</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500&family=Space+Mono&display=swap" rel="stylesheet">
<style>
  :root {
    --bg: #050510;
    --bg2: #08081a;
    --bg3: #0c0c24;
    --indigo: #6366f1;
    --cyan: #22d3ee;
    --violet: #a855f7;
    --gold: #f59e0b;
    --white: #f8fafc;
    --muted: #94a3b8;
    --border: rgba(99,102,241,0.18);
    --glass: rgba(99,102,241,0.07);
    --glow: 0 0 40px rgba(99,102,241,0.35);
    --glow-cyan: 0 0 30px rgba(34,211,238,0.3);
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html { scroll-behavior: smooth; }

  body {
    background: var(--bg);
    color: var(--white);
    font-family: 'Inter', sans-serif;
    font-size: 15px;
    line-height: 1.7;
    overflow-x: hidden;
  }

  /* ── NOISE OVERLAY ── */
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 9999;
    opacity: 0.4;
  }

  /* ── STARS ── */
  .stars {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    overflow: hidden;
  }
  .star {
    position: absolute;
    border-radius: 50%;
    background: white;
    animation: twinkle var(--d, 3s) ease-in-out infinite alternate;
    opacity: 0;
  }
  @keyframes twinkle {
    from { opacity: 0; transform: scale(0.8); }
    to   { opacity: var(--op, 0.7); transform: scale(1.2); }
  }

  /* ── SCROLLBAR ── */
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--indigo); border-radius: 2px; }

  /* ── HERO ── */
  .hero {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 4rem 2rem 6rem;
    position: relative;
    z-index: 1;
  }

  .hero-aurora {
    position: absolute;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
  }
  .aurora-blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    animation: drift var(--dur, 12s) ease-in-out infinite alternate;
  }
  .aurora-blob:nth-child(1) { width: 600px; height: 600px; background: rgba(99,102,241,0.15); top: -100px; left: -150px; --dur: 14s; }
  .aurora-blob:nth-child(2) { width: 400px; height: 400px; background: rgba(34,211,238,0.1); top: 10%; right: -80px; --dur: 10s; }
  .aurora-blob:nth-child(3) { width: 500px; height: 300px; background: rgba(168,85,247,0.1); bottom: 0; left: 30%; --dur: 16s; }
  @keyframes drift {
    from { transform: translate(0, 0) scale(1); }
    to   { transform: translate(30px, 40px) scale(1.1); }
  }

  /* Floating 3D book */
  .book-hero {
    perspective: 900px;
    margin-bottom: 2.5rem;
    animation: float 6s ease-in-out infinite;
  }
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-18px); }
  }
  .book-3d {
    width: 100px;
    height: 130px;
    position: relative;
    transform-style: preserve-3d;
    transform: rotateY(-30deg) rotateX(10deg);
    animation: bookSpin 12s ease-in-out infinite alternate;
  }
  @keyframes bookSpin {
    from { transform: rotateY(-30deg) rotateX(10deg); }
    to   { transform: rotateY(-15deg) rotateX(5deg); }
  }
  .book-face {
    position: absolute;
    inset: 0;
    border-radius: 3px 10px 10px 3px;
    background: linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #4338ca 100%);
    border: 1px solid rgba(99,102,241,0.5);
    box-shadow: 0 0 60px rgba(99,102,241,0.4), inset 0 1px 0 rgba(255,255,255,0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
    backface-visibility: hidden;
  }
  .book-spine {
    position: absolute;
    width: 18px;
    height: 130px;
    left: -18px;
    background: linear-gradient(180deg, #312e81, #1e1b4b);
    border-radius: 3px 0 0 3px;
    transform: rotateY(-90deg) translateZ(-9px);
    transform-origin: right;
    border: 1px solid rgba(99,102,241,0.3);
  }
  .book-pages {
    position: absolute;
    width: 12px;
    height: 124px;
    right: -12px;
    top: 3px;
    background: repeating-linear-gradient(180deg, #e2e8f0 0px, #e2e8f0 1px, #cbd5e1 2px, #cbd5e1 3px);
    transform: rotateY(90deg) translateZ(-6px);
    transform-origin: left;
  }

  /* Eyebrow */
  .eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: 'Space Mono', monospace;
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--cyan);
    background: rgba(34,211,238,0.08);
    border: 1px solid rgba(34,211,238,0.2);
    border-radius: 100px;
    padding: 6px 16px;
    margin-bottom: 1.5rem;
  }
  .eyebrow-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--cyan); animation: pulse 2s infinite; }
  @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }

  .hero-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(2.8rem, 7vw, 6rem);
    font-weight: 700;
    line-height: 1.05;
    letter-spacing: -0.03em;
    margin-bottom: 1.5rem;
  }
  .hero-title .line-1 { display: block; color: var(--white); }
  .hero-title .line-2 {
    display: block;
    background: linear-gradient(90deg, var(--indigo), var(--cyan), var(--violet));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: gradShift 5s linear infinite;
    background-size: 200%;
  }
  @keyframes gradShift {
    0% { background-position: 0% 50%; }
    100% { background-position: 200% 50%; }
  }

  .hero-sub {
    max-width: 620px;
    font-size: 1.05rem;
    color: var(--muted);
    margin-bottom: 2.5rem;
    line-height: 1.8;
  }

  /* CTA row */
  .cta-row {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    justify-content: center;
    margin-bottom: 3rem;
  }
  .btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 28px;
    border-radius: 10px;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.9rem;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s;
    cursor: pointer;
    border: none;
  }
  .btn-primary {
    background: linear-gradient(135deg, var(--indigo), var(--violet));
    color: white;
    box-shadow: 0 0 30px rgba(99,102,241,0.4);
  }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 0 50px rgba(99,102,241,0.6); }
  .btn-ghost {
    background: transparent;
    color: var(--white);
    border: 1px solid var(--border);
    backdrop-filter: blur(10px);
  }
  .btn-ghost:hover { border-color: var(--indigo); background: var(--glass); transform: translateY(-2px); }

  /* Badge strip */
  .badge-strip {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: center;
  }
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 12px;
    border-radius: 6px;
    font-family: 'Space Mono', monospace;
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    border: 1px solid;
  }
  .badge-react    { color: #61dafb; border-color: rgba(97,218,251,0.3); background: rgba(97,218,251,0.05); }
  .badge-ts       { color: #3b82f6; border-color: rgba(59,130,246,0.3); background: rgba(59,130,246,0.05); }
  .badge-three    { color: #a5f3fc; border-color: rgba(165,243,252,0.3); background: rgba(165,243,252,0.05); }
  .badge-vite     { color: #a78bfa; border-color: rgba(167,139,250,0.3); background: rgba(167,139,250,0.05); }
  .badge-framer   { color: #f472b6; border-color: rgba(244,114,182,0.3); background: rgba(244,114,182,0.05); }
  .badge-mit      { color: #34d399; border-color: rgba(52,211,153,0.3); background: rgba(52,211,153,0.05); }

  /* ── SECTIONS ── */
  .section { padding: 6rem 2rem; position: relative; z-index: 1; }
  .section-inner { max-width: 1100px; margin: 0 auto; }

  .section-label {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: 'Space Mono', monospace;
    font-size: 0.65rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--indigo);
    margin-bottom: 0.8rem;
  }
  .section-label::before { content: ''; width: 20px; height: 1px; background: var(--indigo); }

  .section-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(1.8rem, 4vw, 3rem);
    font-weight: 700;
    letter-spacing: -0.02em;
    margin-bottom: 1rem;
  }
  .section-desc { color: var(--muted); max-width: 560px; margin-bottom: 3rem; }

  /* ── STATS ROW ── */
  .stats-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 1px;
    border: 1px solid var(--border);
    border-radius: 16px;
    overflow: hidden;
    margin-top: 4rem;
    background: var(--border);
  }
  .stat-cell {
    background: var(--bg2);
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .stat-num {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 2.2rem;
    font-weight: 700;
    background: linear-gradient(90deg, var(--indigo), var(--cyan));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .stat-label { font-size: 0.8rem; color: var(--muted); }

  /* ── FEATURES GRID ── */
  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
  }
  .feature-card {
    background: var(--glass);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 2rem;
    position: relative;
    overflow: hidden;
    transition: all 0.4s;
    backdrop-filter: blur(10px);
  }
  .feature-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--indigo), transparent);
    opacity: 0;
    transition: opacity 0.4s;
  }
  .feature-card:hover { border-color: rgba(99,102,241,0.4); transform: translateY(-4px); box-shadow: var(--glow); }
  .feature-card:hover::before { opacity: 1; }
  .feature-icon {
    width: 48px; height: 48px;
    border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.4rem;
    margin-bottom: 1rem;
    border: 1px solid;
  }
  .feature-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1.05rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  .feature-desc { font-size: 0.85rem; color: var(--muted); line-height: 1.7; }

  /* ── GENOME RADAR ── */
  .genome-section {
    background: radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.08) 0%, transparent 70%);
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
  }
  .genome-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
  }
  @media (max-width: 768px) { .genome-grid { grid-template-columns: 1fr; } }

  .genome-radar-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }
  .radar-svg { filter: drop-shadow(0 0 20px rgba(99,102,241,0.4)); }

  .genome-metrics {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .metric-row { display: flex; flex-direction: column; gap: 6px; }
  .metric-label-row { display: flex; justify-content: space-between; align-items: center; font-size: 0.82rem; }
  .metric-name { font-family: 'Space Grotesk', sans-serif; font-weight: 500; }
  .metric-val { font-family: 'Space Mono', monospace; font-size: 0.75rem; color: var(--muted); }
  .metric-bar {
    height: 6px;
    background: rgba(255,255,255,0.06);
    border-radius: 100px;
    overflow: hidden;
  }
  .metric-fill {
    height: 100%;
    border-radius: 100px;
    animation: barGrow 1.5s ease-out forwards;
    transform-origin: left;
    transform: scaleX(0);
  }
  @keyframes barGrow { to { transform: scaleX(1); } }

  /* ── TERMINAL ── */
  .terminal-wrap {
    background: rgba(0,0,0,0.6);
    border: 1px solid rgba(99,102,241,0.25);
    border-radius: 16px;
    overflow: hidden;
    font-family: 'Space Mono', monospace;
    box-shadow: var(--glow);
  }
  .terminal-bar {
    background: rgba(99,102,241,0.12);
    border-bottom: 1px solid var(--border);
    padding: 10px 16px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .dot { width: 10px; height: 10px; border-radius: 50%; }
  .dot-r { background: #ff5f57; }
  .dot-y { background: #febc2e; }
  .dot-g { background: #28c840; }
  .terminal-title { font-size: 0.72rem; color: var(--muted); margin-left: auto; margin-right: auto; }
  .terminal-body { padding: 1.5rem; font-size: 0.8rem; line-height: 2; }
  .t-line { display: flex; gap: 10px; opacity: 0; animation: fadeInLine 0.4s ease forwards; }
  .t-prompt { color: var(--indigo); user-select: none; }
  .t-cmd { color: var(--cyan); }
  .t-out { color: #94a3b8; padding-left: 20px; }
  .t-success { color: #4ade80; padding-left: 20px; }
  .t-cursor {
    display: inline-block;
    width: 8px; height: 14px;
    background: var(--cyan);
    animation: blink 1s step-end infinite;
    vertical-align: middle;
  }
  @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
  @keyframes fadeInLine { to { opacity: 1; } }

  /* ── TECH STACK TABLE ── */
  .tech-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.87rem;
  }
  .tech-table th {
    font-family: 'Space Mono', monospace;
    font-size: 0.65rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--indigo);
    padding: 12px 16px;
    text-align: left;
    border-bottom: 1px solid var(--border);
  }
  .tech-table td {
    padding: 14px 16px;
    border-bottom: 1px solid rgba(99,102,241,0.07);
    color: var(--muted);
    vertical-align: top;
  }
  .tech-table tr:hover td { background: var(--glass); }
  .tech-table tr:last-child td { border-bottom: none; }
  .tech-name {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 600;
    color: var(--white);
    display: flex; align-items: center; gap: 8px;
  }
  .tech-pill {
    font-family: 'Space Mono', monospace;
    font-size: 0.62rem;
    padding: 2px 8px;
    border-radius: 4px;
    background: var(--glass);
    border: 1px solid var(--border);
    color: var(--indigo);
  }

  /* ── ARCHITECTURE ── */
  .arch-tree {
    background: rgba(0,0,0,0.5);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 2rem;
    font-family: 'Space Mono', monospace;
    font-size: 0.8rem;
    line-height: 2;
    position: relative;
    overflow: hidden;
  }
  .arch-tree::before {
    content: 'src/';
    position: absolute;
    top: 0; right: 0;
    font-size: 6rem;
    font-weight: 700;
    color: rgba(99,102,241,0.04);
    line-height: 1;
    padding: 10px;
  }
  .tree-line { display: flex; align-items: flex-start; gap: 8px; }
  .tree-branch { color: rgba(99,102,241,0.4); }
  .tree-file { color: var(--cyan); }
  .tree-comment { color: rgba(148,163,184,0.5); font-size: 0.72rem; }
  .tree-dir { color: var(--indigo); font-weight: 600; }

  /* ── ROADMAP ── */
  .roadmap-list { display: flex; flex-direction: column; gap: 0; }
  .roadmap-item {
    display: flex;
    gap: 1.5rem;
    padding: 1.8rem 0;
    border-bottom: 1px solid var(--border);
    position: relative;
  }
  .roadmap-item:last-child { border-bottom: none; }
  .roadmap-num {
    font-family: 'Space Mono', monospace;
    font-size: 0.65rem;
    color: var(--indigo);
    min-width: 32px;
    padding-top: 2px;
  }
  .roadmap-content { flex: 1; }
  .roadmap-title {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 600;
    font-size: 1rem;
    margin-bottom: 4px;
    display: flex; align-items: center; gap: 10px;
  }
  .roadmap-desc { font-size: 0.83rem; color: var(--muted); }
  .tag-planned {
    font-family: 'Space Mono', monospace;
    font-size: 0.6rem;
    padding: 2px 8px;
    border-radius: 4px;
    background: rgba(168,85,247,0.1);
    border: 1px solid rgba(168,85,247,0.3);
    color: var(--violet);
  }
  .tag-soon {
    background: rgba(34,211,238,0.1);
    border: 1px solid rgba(34,211,238,0.3);
    color: var(--cyan);
  }

  /* ── GETTING STARTED ── */
  .steps-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.5rem;
    counter-reset: steps;
  }
  .step-card {
    background: var(--glass);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 1.8rem;
    position: relative;
    counter-increment: steps;
  }
  .step-card::before {
    content: counter(steps, decimal-leading-zero);
    position: absolute;
    top: 1.2rem; right: 1.2rem;
    font-family: 'Space Mono', monospace;
    font-size: 0.65rem;
    color: rgba(99,102,241,0.4);
    letter-spacing: 0.1em;
  }
  .step-icon { font-size: 1.6rem; margin-bottom: 1rem; }
  .step-title {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  .step-desc { font-size: 0.83rem; color: var(--muted); line-height: 1.6; }
  code {
    font-family: 'Space Mono', monospace;
    background: rgba(99,102,241,0.12);
    border: 1px solid rgba(99,102,241,0.2);
    border-radius: 4px;
    padding: 1px 6px;
    font-size: 0.85em;
    color: var(--cyan);
  }

  /* ── MOBILE CONTROLS ── */
  .controls-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }
  @media (max-width: 600px) { .controls-grid { grid-template-columns: 1fr; } }
  .control-card {
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 2rem;
    background: var(--glass);
  }
  .control-icon { font-size: 2rem; margin-bottom: 1rem; }
  .control-title {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 600;
    margin-bottom: 0.8rem;
    display: flex; align-items: center; gap: 10px;
  }
  .platform-tag {
    font-family: 'Space Mono', monospace;
    font-size: 0.6rem;
    padding: 2px 7px;
    border-radius: 4px;
    background: rgba(99,102,241,0.1);
    border: 1px solid rgba(99,102,241,0.25);
    color: var(--indigo);
  }
  .key-list { display: flex; flex-direction: column; gap: 6px; font-size: 0.83rem; color: var(--muted); }
  .key-row { display: flex; align-items: center; gap: 8px; }
  .key {
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 5px;
    padding: 2px 8px;
    font-family: 'Space Mono', monospace;
    font-size: 0.72rem;
    color: var(--white);
    white-space: nowrap;
  }

  /* ── FOOTER ── */
  .footer {
    border-top: 1px solid var(--border);
    padding: 4rem 2rem;
    text-align: center;
    position: relative;
    z-index: 1;
  }
  .footer-logo {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1.3rem;
    font-weight: 700;
    background: linear-gradient(90deg, var(--indigo), var(--cyan));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 0.5rem;
  }
  .footer-tagline { font-size: 0.83rem; color: var(--muted); margin-bottom: 2rem; }
  .footer-links { display: flex; gap: 2rem; justify-content: center; flex-wrap: wrap; }
  .footer-link {
    font-size: 0.82rem;
    color: var(--muted);
    text-decoration: none;
    transition: color 0.2s;
    font-family: 'Space Mono', monospace;
  }
  .footer-link:hover { color: var(--indigo); }
  .footer-copy { margin-top: 2rem; font-size: 0.75rem; color: rgba(148,163,184,0.4); }

  /* ── DIVIDER ── */
  .divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--border), transparent);
    margin: 0 2rem;
  }

  /* ── SCROLL REVEAL ── */
  .reveal { opacity: 0; transform: translateY(30px); transition: opacity 0.7s ease, transform 0.7s ease; }
  .reveal.visible { opacity: 1; transform: none; }

  /* ── MOBILE ── */
  @media (max-width: 768px) {
    .hero-title { font-size: 2.4rem; }
    .section { padding: 4rem 1.5rem; }
    .genome-grid { grid-template-columns: 1fr; }
    .tech-table { font-size: 0.78rem; }
    .tech-table td, .tech-table th { padding: 10px; }
  }
</style>
</head>
<body>

<!-- STARS -->
<div class="stars" id="stars"></div>

<!-- ══════════════════════════════════════
     HERO
═══════════════════════════════════════ -->
<section class="hero">
  <div class="hero-aurora">
    <div class="aurora-blob"></div>
    <div class="aurora-blob"></div>
    <div class="aurora-blob"></div>
  </div>

  <!-- 3D Floating Book -->
  <div class="book-hero">
    <div class="book-3d">
      <div class="book-spine"></div>
      <div class="book-face">📚</div>
      <div class="book-pages"></div>
    </div>
  </div>

  <div class="eyebrow">
    <span class="eyebrow-dot"></span>
    Open Source · WebGL · GitHub API
  </div>

  <h1 class="hero-title">
    <span class="line-1">The Library</span>
    <span class="line-2">of Code</span>
  </h1>

  <p class="hero-sub">
    A philosophical reimagining of open-source discovery. Walk infinite 3D aisles of knowledge,
    pull repositories off digital shelves, and explore the world's code like a living library.
  </p>

  <div class="cta-row">
    <a href="https://github.com/YAGNADEEPSINH-4741/gitlibrary" class="btn btn-primary">
      ★ Star on GitHub
    </a>
    <a href="#getting-started" class="btn btn-ghost">
      ⚡ Quick Start
    </a>
  </div>

  <div class="badge-strip">
    <span class="badge badge-react">⚛ React 18</span>
    <span class="badge badge-ts">TS TypeScript 5</span>
    <span class="badge badge-three">◎ Three.js</span>
    <span class="badge badge-vite">⚡ Vite</span>
    <span class="badge badge-framer">Framer Motion</span>
    <span class="badge badge-mit">MIT License</span>
  </div>
</section>

<!-- ══════════════════════════════════════
     FEATURES
═══════════════════════════════════════ -->
<section class="section">
  <div class="section-inner">
    <div class="reveal">
      <div class="section-label">Core Features</div>
      <h2 class="section-title">Built for <span style="color:var(--cyan)">Exploration</span></h2>
      <p class="section-desc">Every feature engineered to transform abstract code repositories into tangible, navigable spaces.</p>
    </div>

    <div class="features-grid">
      <div class="feature-card reveal">
        <div class="feature-icon" style="background:rgba(99,102,241,0.1);border-color:rgba(99,102,241,0.3);color:var(--indigo)">🏛️</div>
        <div class="feature-title">Infinite 3D Library</div>
        <div class="feature-desc">Procedurally generated aisles extend forever as you walk. React Three Fiber dynamically loads new bookcases, lighting, and floor segments ahead of the camera.</div>
      </div>
      <div class="feature-card reveal">
        <div class="feature-icon" style="background:rgba(34,211,238,0.1);border-color:rgba(34,211,238,0.3);color:var(--cyan)">🔍</div>
        <div class="feature-title">Real-Time GitHub Search</div>
        <div class="feature-desc">Powered by GitHub REST API v3. Debounced queries prevent rate-limit spam. The 3D world tears down and rebuilds instantly with your search results.</div>
      </div>
      <div class="feature-card reveal">
        <div class="feature-icon" style="background:rgba(168,85,247,0.1);border-color:rgba(168,85,247,0.3);color:var(--violet)">📊</div>
        <div class="feature-title">Live Leaderboards</div>
        <div class="feature-desc">Largest volumes, most active codebases, and worldwide trending — curated lists for when you need inspiration without a specific query.</div>
      </div>
      <div class="feature-card reveal">
        <div class="feature-icon" style="background:rgba(245,158,11,0.1);border-color:rgba(245,158,11,0.3);color:var(--gold)">📖</div>
        <div class="feature-title">Detailed Book Summaries</div>
        <div class="feature-desc">Click any 3D book to pull live folder structures, color-coded language tags, and direct GitHub links from the shelf into a rich overlay panel.</div>
      </div>
      <div class="feature-card reveal">
        <div class="feature-icon" style="background:rgba(52,211,153,0.1);border-color:rgba(52,211,153,0.3);color:#34d399">📱</div>
        <div class="feature-title">Full Mobile Support</div>
        <div class="feature-desc">Auto-detected touch input replaces Pointer Lock. Custom touch-to-look Euler rotation algorithm and glassmorphic virtual D-pad for movement.</div>
      </div>
      <div class="feature-card reveal">
        <div class="feature-icon" style="background:rgba(236,72,153,0.1);border-color:rgba(236,72,153,0.3);color:#ec4899">⚡</div>
        <div class="feature-title">Performance First</div>
        <div class="feature-desc">Frustum culling, geometry reuse, shadow map tuning, and React memoization keep the library buttery smooth at 60fps even with thousands of books in memory.</div>
      </div>
    </div>
  </div>
</section>

<div class="divider"></div>

<!-- ══════════════════════════════════════
     REPOSITORY GENOME
═══════════════════════════════════════ -->
<section class="section genome-section">
  <div class="section-inner">
    <div class="reveal">
      <div class="section-label">Repository Genome</div>
      <h2 class="section-title">Every Repo Has <span style="color:var(--violet)">DNA</span></h2>
      <p class="section-desc" style="margin-bottom:3rem">Four metrics aggregate into a visual signature — a glanceable health and scale fingerprint for every repository in the library.</p>
    </div>

    <div class="genome-grid">
      <!-- Radar Chart SVG -->
      <div class="genome-radar-wrap reveal">
        <svg class="radar-svg" width="300" height="300" viewBox="0 0 300 300">
          <defs>
            <linearGradient id="radarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#6366f1;stop-opacity:0.6"/>
              <stop offset="100%" style="stop-color:#22d3ee;stop-opacity:0.3"/>
            </linearGradient>
          </defs>
          <!-- Grid rings -->
          <g opacity="0.2" stroke="#6366f1" fill="none">
            <polygon points="150,50 232,100 232,200 150,250 68,200 68,100" stroke-width="1"/>
            <polygon points="150,90 212,120 212,180 150,210 88,180 88,120" stroke-width="1"/>
            <polygon points="150,115 197,132 197,168 150,185 103,168 103,132" stroke-width="1"/>
          </g>
          <!-- Axis lines -->
          <g stroke="#6366f1" opacity="0.25" stroke-width="1">
            <line x1="150" y1="150" x2="150" y2="50"/>
            <line x1="150" y1="150" x2="232" y2="100"/>
            <line x1="150" y1="150" x2="232" y2="200"/>
            <line x1="150" y1="150" x2="150" y2="250"/>
            <line x1="150" y1="150" x2="68" y2="200"/>
            <line x1="150" y1="150" x2="68" y2="100"/>
          </g>
          <!-- Data polygon -->
          <polygon
            points="150,72 218,112 225,190 150,232 82,185 78,115"
            fill="url(#radarGrad)"
            stroke="#6366f1"
            stroke-width="2"
            style="animation: radarPulse 4s ease-in-out infinite alternate"
          />
          <!-- Axis labels -->
          <text x="150" y="42" text-anchor="middle" fill="#22d3ee" font-size="11" font-family="Space Grotesk">Architecture</text>
          <text x="248" y="98" text-anchor="start" fill="#a855f7" font-size="11" font-family="Space Grotesk">Activity</text>
          <text x="248" y="208" text-anchor="start" fill="#6366f1" font-size="11" font-family="Space Grotesk">Popularity</text>
          <text x="150" y="268" text-anchor="middle" fill="#f59e0b" font-size="11" font-family="Space Grotesk">Discovery</text>
          <text x="52" y="208" text-anchor="end" fill="#ec4899" font-size="11" font-family="Space Grotesk">Docs</text>
          <text x="52" y="98" text-anchor="end" fill="#34d399" font-size="11" font-family="Space Grotesk">Score</text>
          <!-- Center dots -->
          <circle cx="150" cy="72" r="4" fill="#22d3ee"/>
          <circle cx="218" cy="112" r="4" fill="#a855f7"/>
          <circle cx="225" cy="190" r="4" fill="#6366f1"/>
          <circle cx="150" cy="232" r="4" fill="#f59e0b"/>
          <circle cx="82" cy="185" r="4" fill="#ec4899"/>
          <circle cx="78" cy="115" r="4" fill="#34d399"/>
          <circle cx="150" cy="150" r="6" fill="none" stroke="#6366f1" stroke-width="2"/>
        </svg>
        <style>@keyframes radarPulse { from { opacity: 0.8; } to { opacity: 1; } }</style>
      </div>

      <!-- Metrics bars -->
      <div class="genome-metrics reveal">
        <div class="metric-row">
          <div class="metric-label-row">
            <div class="metric-name" style="color:var(--cyan)">🏗 Architecture</div>
            <div class="metric-val">Scale &amp; Complexity</div>
          </div>
          <div class="metric-bar"><div class="metric-fill" style="width:82%;background:linear-gradient(90deg,#6366f1,#22d3ee);animation-delay:0.1s"></div></div>
          <div style="font-size:0.75rem;color:var(--muted)">File count · language distribution · directory depth</div>
        </div>
        <div class="metric-row">
          <div class="metric-label-row">
            <div class="metric-name" style="color:var(--violet)">⚡ Activity</div>
            <div class="metric-val">Velocity &amp; Pulse</div>
          </div>
          <div class="metric-bar"><div class="metric-fill" style="width:91%;background:linear-gradient(90deg,#a855f7,#6366f1);animation-delay:0.25s"></div></div>
          <div style="font-size:0.75rem;color:var(--muted)">Commit frequency · open PRs · issue resolution time</div>
        </div>
        <div class="metric-row">
          <div class="metric-label-row">
            <div class="metric-name" style="color:var(--gold)">⭐ Popularity</div>
            <div class="metric-val">Community Validation</div>
          </div>
          <div class="metric-bar"><div class="metric-fill" style="width:74%;background:linear-gradient(90deg,#f59e0b,#ec4899);animation-delay:0.4s"></div></div>
          <div style="font-size:0.75rem;color:var(--muted)">Stars · forks · watchers — drives glow intensity on shelf</div>
        </div>
        <div class="metric-row">
          <div class="metric-label-row">
            <div class="metric-name" style="color:#34d399">📡 Discoverability</div>
            <div class="metric-val">Documentation &amp; Tags</div>
          </div>
          <div class="metric-bar"><div class="metric-fill" style="width:65%;background:linear-gradient(90deg,#34d399,#22d3ee);animation-delay:0.55s"></div></div>
          <div style="font-size:0.75rem;color:var(--muted)">README quality · topic count · description completeness</div>
        </div>

        <div style="margin-top:1.5rem;padding:1rem 1.2rem;background:rgba(99,102,241,0.07);border:1px solid var(--border);border-radius:10px;font-size:0.82rem;color:var(--muted)">
          All four metrics aggregate into the <strong style="color:var(--white)">Book Score</strong> — rendered as visual weight, shelf height, and glow intensity on each 3D book.
        </div>
      </div>
    </div>
  </div>
</section>

<div class="divider"></div>

<!-- ══════════════════════════════════════
     TERMINAL / QUICK START
═══════════════════════════════════════ -->
<section class="section" id="getting-started">
  <div class="section-inner">
    <div class="reveal">
      <div class="section-label">Getting Started</div>
      <h2 class="section-title">Up and Running<br>in <span style="color:var(--cyan)">60 Seconds</span></h2>
      <p class="section-desc">Clone, install, run. No config files. No API keys required for public GitHub search.</p>
    </div>

    <div class="steps-grid reveal" style="margin-bottom:2.5rem">
      <div class="step-card">
        <div class="step-icon">📦</div>
        <div class="step-title">Prerequisites</div>
        <div class="step-desc">Node.js <code>v16+</code> and npm <code>v7+</code>. Any modern browser with WebGL enabled — Chrome, Firefox, Edge, Safari.</div>
      </div>
      <div class="step-card">
        <div class="step-icon">🔁</div>
        <div class="step-title">Clone the Repo</div>
        <div class="step-desc"><code>git clone</code> from <code>YAGNADEEPSINH-4741/gitlibrary</code> then <code>cd gitlibrary</code>.</div>
      </div>
      <div class="step-card">
        <div class="step-icon">⚙️</div>
        <div class="step-title">Install Deps</div>
        <div class="step-desc">Run <code>npm install</code>. Pulls Three.js, R3F, Drei, Framer Motion, Lucide React, and all build tools.</div>
      </div>
      <div class="step-card">
        <div class="step-icon">🚀</div>
        <div class="step-title">Launch Dev Server</div>
        <div class="step-desc">Run <code>npm run dev</code>. Open <code>localhost:5173</code>. Changes hot-reload instantly via Vite HMR.</div>
      </div>
    </div>

    <!-- Animated Terminal -->
    <div class="terminal-wrap reveal">
      <div class="terminal-bar">
        <span class="dot dot-r"></span>
        <span class="dot dot-y"></span>
        <span class="dot dot-g"></span>
        <span class="terminal-title">bash — ~/gitlibrary</span>
      </div>
      <div class="terminal-body" id="terminal">
        <div class="t-line" style="animation-delay:0.2s"><span class="t-prompt">$</span><span class="t-cmd">git clone https://github.com/YAGNADEEPSINH-4741/gitlibrary.git</span></div>
        <div class="t-line" style="animation-delay:0.8s"><span class="t-out">Cloning into 'gitlibrary'...</span></div>
        <div class="t-line" style="animation-delay:1.4s"><span class="t-success">✓ Done. 247 objects received.</span></div>
        <div class="t-line" style="animation-delay:2s"><span class="t-prompt">$</span><span class="t-cmd">cd gitlibrary && npm install</span></div>
        <div class="t-line" style="animation-delay:2.6s"><span class="t-out">added 142 packages in 3.2s</span></div>
        <div class="t-line" style="animation-delay:3.2s"><span class="t-prompt">$</span><span class="t-cmd">npm run dev</span></div>
        <div class="t-line" style="animation-delay:3.8s"><span class="t-success">  ➜  Local:   http://localhost:5173/</span></div>
        <div class="t-line" style="animation-delay:4.4s"><span class="t-success">  ➜  Network: http://192.168.1.x:5173/</span></div>
        <div class="t-line" style="animation-delay:5s"><span class="t-out">ready in 342ms. <span class="t-cursor"></span></span></div>
      </div>
    </div>
  </div>
</section>

<div class="divider"></div>

<!-- ══════════════════════════════════════
     TECH STACK
═══════════════════════════════════════ -->
<section class="section">
  <div class="section-inner">
    <div class="reveal">
      <div class="section-label">Tech Stack</div>
      <h2 class="section-title">Uncompromising<br><span style="color:var(--indigo)">Technology Choices</span></h2>
      <p class="section-desc">Every dependency chosen deliberately — prioritizing modern paradigms, type safety, and raw performance.</p>
    </div>

    <div style="border:1px solid var(--border);border-radius:16px;overflow:hidden;margin-top:2rem" class="reveal">
      <table class="tech-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Technology</th>
            <th>Why it was chosen</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><span style="color:var(--muted);font-size:0.78rem">UI Framework</span></td>
            <td><div class="tech-name">⚛ React 18 <span class="tech-pill">v18.x</span></div></td>
            <td>Concurrent features keep 2D UI smooth while the 3D canvas renders heavily in parallel.</td>
          </tr>
          <tr>
            <td><span style="color:var(--muted);font-size:0.78rem">Language</span></td>
            <td><div class="tech-name">TS TypeScript <span class="tech-pill">v5.x</span></div></td>
            <td>Strict typing eliminates runtime errors. Every GitHub API response is fully typed before entering the 3D renderer.</td>
          </tr>
          <tr>
            <td><span style="color:var(--muted);font-size:0.78rem">Build Tool</span></td>
            <td><div class="tech-name">⚡ Vite <span class="tech-pill">HMR</span></div></td>
            <td>Sub-second hot module replacement and Rollup-optimized production builds. Zero Webpack friction.</td>
          </tr>
          <tr>
            <td><span style="color:var(--muted);font-size:0.78rem">3D Engine</span></td>
            <td><div class="tech-name">◎ Three.js <span class="tech-pill">WebGL</span></div></td>
            <td>Premier WebGL wrapper for core math, geometry, PBR materials, and dynamic lighting engines.</td>
          </tr>
          <tr>
            <td><span style="color:var(--muted);font-size:0.78rem">3D Framework</span></td>
            <td><div class="tech-name">R3F React Three Fiber <span class="tech-pill">declarative</span></div></td>
            <td>React renderer for Three.js. Builds complex 3D scenes as React components, sharing state with 2D UI seamlessly.</td>
          </tr>
          <tr>
            <td><span style="color:var(--muted);font-size:0.78rem">3D Helpers</span></td>
            <td><div class="tech-name">✦ @react-three/drei <span class="tech-pill">ecosystem</span></div></td>
            <td>PointerLockControls, 3D Text with SDF rendering, and environment helpers — all battle-tested.</td>
          </tr>
          <tr>
            <td><span style="color:var(--muted);font-size:0.78rem">Styling</span></td>
            <td><div class="tech-name">🎨 Vanilla CSS3 <span class="tech-pill">custom</span></div></td>
            <td>Pixel-perfect glassmorphism effects and CSS Grid layouts demand absolute control — no utility framework overhead.</td>
          </tr>
          <tr>
            <td><span style="color:var(--muted);font-size:0.78rem">Data</span></td>
            <td><div class="tech-name">🐙 GitHub REST API v3 <span class="tech-pill">real-time</span></div></td>
            <td>Live data for 100M+ repositories. Free public tier sufficient for search, trending, and user lookups.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</section>

<div class="divider"></div>

<!-- ══════════════════════════════════════
     ARCHITECTURE
═══════════════════════════════════════ -->
<section class="section">
  <div class="section-inner">
    <div class="reveal">
      <div class="section-label">Architecture</div>
      <h2 class="section-title">Modular by <span style="color:var(--cyan)">Design</span></h2>
      <p class="section-desc">Strict separation between data fetching, 2D UI rendering, and 3D canvas state.</p>
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:2rem;align-items:start" class="reveal">
      <div>
        <div class="arch-tree">
          <div class="tree-line"><span class="tree-dir">src/</span></div>
          <div class="tree-line"><span class="tree-branch">├─ </span><span class="tree-file">main.tsx</span><span class="tree-comment">   &nbsp;// entry point</span></div>
          <div class="tree-line"><span class="tree-branch">├─ </span><span class="tree-file">App.tsx</span><span class="tree-comment">    &nbsp;// routing &amp; global state</span></div>
          <div class="tree-line"><span class="tree-branch">├─ </span><span class="tree-file">Library3D.tsx</span><span class="tree-comment"> // 🎯 core 3D engine</span></div>
          <div class="tree-line"><span class="tree-branch">│&nbsp;&nbsp; ├─ </span><span style="color:#94a3b8">Canvas</span><span class="tree-comment">   // R3F scene root</span></div>
          <div class="tree-line"><span class="tree-branch">│&nbsp;&nbsp; ├─ </span><span style="color:#94a3b8">Architecture</span><span class="tree-comment">// procedural aisle gen</span></div>
          <div class="tree-line"><span class="tree-branch">│&nbsp;&nbsp; ├─ </span><span style="color:#94a3b8">Bookcase</span><span class="tree-comment"> // mesh renderer</span></div>
          <div class="tree-line"><span class="tree-branch">│&nbsp;&nbsp; └─ </span><span style="color:#94a3b8">Walker</span><span class="tree-comment">   // FPS camera + paging</span></div>
          <div class="tree-line"><span class="tree-branch">├─ </span><span class="tree-file">data.ts</span><span class="tree-comment">    &nbsp;// types + API mapping</span></div>
          <div class="tree-line"><span class="tree-branch">└─ </span><span class="tree-file">styles.css</span><span class="tree-comment"> // design system</span></div>
        </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:1rem">
        <div style="background:var(--glass);border:1px solid var(--border);border-radius:12px;padding:1.2rem">
          <div style="font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:0.9rem;margin-bottom:0.4rem;color:var(--cyan)">Data Fetching</div>
          <div style="font-size:0.82rem;color:var(--muted)">Debounced search → paginated GitHub API → <code>githubToRepo()</code> normalization. Looping illusion via modular arithmetic prevents 422 errors at page 50.</div>
        </div>
        <div style="background:var(--glass);border:1px solid var(--border);border-radius:12px;padding:1.2rem">
          <div style="font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:0.9rem;margin-bottom:0.4rem;color:var(--indigo)">3D Rendering</div>
          <div style="font-size:0.82rem;color:var(--muted)">Shared geometry instances + <code>meshStandardMaterial</code> PBR + automatic frustum culling. Single <code>hemisphereLight</code> + localized <code>pointLight</code> near visible architecture only.</div>
        </div>
        <div style="background:var(--glass);border:1px solid var(--border);border-radius:12px;padding:1.2rem">
          <div style="font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:0.9rem;margin-bottom:0.4rem;color:var(--violet)">Infinite Scroll</div>
          <div style="font-size:0.82rem;color:var(--muted)">Walker's Z-axis position triggers <code>loadMore()</code>. New bookcases generate ahead of camera. Unique IDs appended to looped entries prevent React key collisions.</div>
        </div>
      </div>
    </div>
  </div>
</section>

<div class="divider"></div>

<!-- ══════════════════════════════════════
     CONTROLS
═══════════════════════════════════════ -->
<section class="section">
  <div class="section-inner">
    <div class="reveal">
      <div class="section-label">Controls</div>
      <h2 class="section-title">Navigate the <span style="color:var(--gold)">Library</span></h2>
      <p class="section-desc">Bespoke control systems for every device. The library never compromises its immersion.</p>
    </div>

    <div class="controls-grid reveal">
      <div class="control-card">
        <div class="control-icon">🖥️</div>
        <div class="control-title">Desktop <span class="platform-tag">Mouse + Keyboard</span></div>
        <div class="key-list">
          <div class="key-row"><span class="key">Click</span> Lock mouse / enter library</div>
          <div class="key-row"><span class="key">Mouse</span> Look in 360° via Pointer Lock</div>
          <div class="key-row"><span class="key">W A S D</span> Walk the aisles</div>
          <div class="key-row"><span class="key">↑ ↓ ← →</span> Arrow key alternative</div>
          <div class="key-row"><span class="key">ESC</span> Unlock cursor</div>
        </div>
      </div>
      <div class="control-card">
        <div class="control-icon">📱</div>
        <div class="control-title">Mobile <span class="platform-tag">Touch Screen</span></div>
        <div class="key-list">
          <div class="key-row"><span class="key">Auto</span> Touch detected at startup</div>
          <div class="key-row"><span class="key">Swipe</span> Look around — custom Euler rotation</div>
          <div class="key-row"><span class="key">D-Pad</span> Glassmorphic virtual arrows appear</div>
          <div class="key-row"><span class="key">Hold</span> Hold D-pad for continuous movement</div>
        </div>
      </div>
    </div>
  </div>
</section>

<div class="divider"></div>

<!-- ══════════════════════════════════════
     ROADMAP
═══════════════════════════════════════ -->
<section class="section">
  <div class="section-inner">
    <div class="reveal">
      <div class="section-label">Roadmap</div>
      <h2 class="section-title">What's <span style="color:var(--violet)">Coming</span></h2>
      <p class="section-desc">The Library of Code is a living project. These are the next chapters.</p>
    </div>

    <div class="roadmap-list reveal">
      <div class="roadmap-item">
        <div class="roadmap-num">01</div>
        <div class="roadmap-content">
          <div class="roadmap-title">Instanced Rendering <span class="tag-planned tag-soon">Near Term</span></div>
          <div class="roadmap-desc">Refactor Bookcase to use <code>THREE.InstancedMesh</code> — render 100,000 books in a single GPU draw call without frame drops.</div>
        </div>
      </div>
      <div class="roadmap-item">
        <div class="roadmap-num">02</div>
        <div class="roadmap-content">
          <div class="roadmap-title">GitHub OAuth <span class="tag-planned">Planned</span></div>
          <div class="roadmap-desc">Log in with GitHub to access private repositories in a dedicated "Private Study" 3D room — your personal wing of the library.</div>
        </div>
      </div>
      <div class="roadmap-item">
        <div class="roadmap-num">03</div>
        <div class="roadmap-content">
          <div class="roadmap-title">Advanced 3D Filter Panels <span class="tag-planned">Planned</span></div>
          <div class="roadmap-desc">Floating 3D UI panels let you filter by language, license, and creation date without ever leaving the immersive canvas.</div>
        </div>
      </div>
      <div class="roadmap-item">
        <div class="roadmap-num">04</div>
        <div class="roadmap-content">
          <div class="roadmap-title">Open-Book README <span class="tag-planned">Planned</span></div>
          <div class="roadmap-desc">Physically open any 3D book and read its README.md mapped onto the pages of the mesh — full Markdown rendered in 3D space.</div>
        </div>
      </div>
      <div class="roadmap-item">
        <div class="roadmap-num">05</div>
        <div class="roadmap-content">
          <div class="roadmap-title">Multiplayer Avatars <span class="tag-planned">Future</span></div>
          <div class="roadmap-desc">WebSocket-powered shared library — see other developers wandering the aisles as avatars in real time.</div>
        </div>
      </div>
    </div>
  </div>
</section>

<div class="divider"></div>

<!-- ══════════════════════════════════════
     CONTRIBUTING
═══════════════════════════════════════ -->
<section class="section">
  <div class="section-inner reveal">
    <div style="background:radial-gradient(ellipse at 50% 0%,rgba(99,102,241,0.12) 0%,transparent 70%);border:1px solid var(--border);border-radius:20px;padding:3rem;text-align:center">
      <div style="font-size:2.5rem;margin-bottom:1rem">🤝</div>
      <h2 class="section-title" style="margin-bottom:1rem">Open to<br><span style="color:var(--indigo)">Contributions</span></h2>
      <p style="color:var(--muted);max-width:500px;margin:0 auto 2rem;font-size:0.9rem">The open-source community is what makes ambitious projects like this possible. Fork, improve, and send a pull request.</p>
      <div style="background:rgba(0,0,0,0.4);border:1px solid var(--border);border-radius:12px;padding:1.5rem;max-width:480px;margin:0 auto;text-align:left;font-family:'Space Mono',monospace;font-size:0.78rem;line-height:2;color:var(--muted)">
        <div><span style="color:var(--indigo)">$</span> <span style="color:var(--cyan)">git fork</span> YAGNADEEPSINH-4741/gitlibrary</div>
        <div><span style="color:var(--indigo)">$</span> <span style="color:var(--cyan)">git checkout</span> -b feature/AmazingFeature</div>
        <div><span style="color:var(--indigo)">$</span> <span style="color:var(--cyan)">git commit</span> -m 'Add some AmazingFeature'</div>
        <div><span style="color:var(--indigo)">$</span> <span style="color:var(--cyan)">git push</span> origin feature/AmazingFeature</div>
        <div style="color:#4ade80">→ Open a Pull Request against main ✓</div>
      </div>
      <div style="margin-top:2rem;display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
        <a href="https://github.com/YAGNADEEPSINH-4741/gitlibrary/fork" class="btn btn-primary">🍴 Fork the Project</a>
        <a href="https://github.com/YAGNADEEPSINH-4741/gitlibrary/issues" class="btn btn-ghost">🐛 Open an Issue</a>
        <a href="https://github.com/YAGNADEEPSINH-4741/gitlibrary" class="btn btn-ghost">★ Star the Repo</a>
      </div>
    </div>
  </div>
</section>

<!-- ══════════════════════════════════════
     FOOTER
═══════════════════════════════════════ -->
<footer class="footer">
  <div class="footer-logo">The Library of Code</div>
  <div class="footer-tagline">Where knowledge becomes a place. — MIT License</div>
  <div class="footer-links">
    <a href="https://github.com/YAGNADEEPSINH-4741/gitlibrary" class="footer-link">GitHub</a>
    <a href="https://github.com/YAGNADEEPSINH-4741/gitlibrary/issues" class="footer-link">Issues</a>
    <a href="https://github.com/YAGNADEEPSINH-4741/gitlibrary/blob/main/LICENSE" class="footer-link">License</a>
    <a href="https://threejs.org/" class="footer-link">Three.js</a>
    <a href="https://pmnd.rs/" class="footer-link">Poimandres</a>
  </div>
  <div class="footer-copy">Built with Three.js · React Three Fiber · Vite · TypeScript<br>© 2024 YAGNADEEPSINH-4741 · MIT License</div>
</footer>

<script>
// ── STARS
(function() {
  const container = document.getElementById('stars');
  const colors = ['#ffffff','#c7d2fe','#a5f3fc','#ddd6fe'];
  for (let i = 0; i < 120; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    const size = Math.random() * 2.5 + 0.5;
    s.style.cssText = `
      width:${size}px;height:${size}px;
      left:${Math.random()*100}%;
      top:${Math.random()*100}%;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      --op:${Math.random()*0.7+0.1};
      --d:${Math.random()*4+2}s;
      animation-delay:${Math.random()*5}s;
    `;
    container.appendChild(s);
  }
})();

// ── SCROLL REVEAL
const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => io.observe(el));

// ── COUNTER ANIMATION
const counters = document.querySelectorAll('[data-target]');
const counterIO = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = +el.dataset.target;
      let current = 0;
      const step = target / 50;
      const timer = setInterval(() => {
        current += step;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = Math.floor(current).toLocaleString() + (target === 1000 ? '+' : target === 60 ? 'fps' : '');
      }, 30);
      counterIO.unobserve(el);
    }
  });
}, { threshold: 0.5 });
counters.forEach(el => counterIO.observe(el));
</script>
</body>
</html>
