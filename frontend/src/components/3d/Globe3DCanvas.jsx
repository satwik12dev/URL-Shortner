import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { Zap, Cpu, Activity, Sparkles, Layers, ShieldCheck, Radio, Flame } from "lucide-react";

const Globe3DCanvas = () => {
  const mountRef = useRef(null);
  const [theme, setTheme] = useState("cyber"); // 'cyber' | 'void' | 'matrix' | 'plasma'
  const [isOverclocked, setIsOverclocked] = useState(false);
  const [telemetry, setTelemetry] = useState({
    throughput: "582.4 Gbps",
    frequency: "6.2 GHz",
    quantumEntropy: "99.8%",
    compressionRatio: "16.4x",
    coreTemp: "1.8 K",
  });

  const overclockRef = useRef(false);

  const themes = {
    cyber: {
      outer: 0x00f0ff,
      mid: 0x3b82f6,
      inner: 0x8b5cf6,
      core: 0x00ffff,
      connectors: 0x38bdf8,
      particles: 0x38bdf8,
      shockwave: 0x00f0ff,
      bgGlow: "from-cyan-500/25 via-blue-600/15 to-indigo-950/40",
      accentHex: "#00f0ff",
      badgeColor: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
    },
    void: {
      outer: 0xff007f,
      mid: 0xa855f7,
      inner: 0xec4899,
      core: 0xd946ef,
      connectors: 0xf43f5e,
      particles: 0xf472b6,
      shockwave: 0xff007f,
      bgGlow: "from-pink-500/25 via-purple-600/20 to-fuchsia-950/40",
      accentHex: "#ff007f",
      badgeColor: "text-pink-400 border-pink-500/30 bg-pink-500/10",
    },
    matrix: {
      outer: 0x00ff88,
      mid: 0x10b981,
      inner: 0x059669,
      core: 0x34d399,
      connectors: 0x10b981,
      particles: 0x10b981,
      shockwave: 0x00ff88,
      bgGlow: "from-emerald-500/25 via-teal-700/15 to-green-950/40",
      accentHex: "#00ff88",
      badgeColor: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    },
    plasma: {
      outer: 0xff9900,
      mid: 0xef4444,
      inner: 0xf59e0b,
      core: 0xfde047,
      connectors: 0xf97316,
      particles: 0xfbbf24,
      shockwave: 0xffaa00,
      bgGlow: "from-amber-500/25 via-orange-600/20 to-rose-950/40",
      accentHex: "#ff9900",
      badgeColor: "text-amber-400 border-amber-500/30 bg-amber-500/10",
    },
  };

  const currentTheme = themes[theme];

  const handleBoost = useCallback(() => {
    setIsOverclocked(true);
    overclockRef.current = true;
    setTimeout(() => {
      setIsOverclocked(false);
      overclockRef.current = false;
    }, 2800);
  }, []);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let isVisible = true;
    const width = container.clientWidth || 460;
    const height = container.clientHeight || 460;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.8);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    container.appendChild(renderer.domElement);

    // Stable Master Root (Clean fixed isometric perspective)
    const masterTesseract = new THREE.Group();
    masterTesseract.rotation.x = 0.32;
    masterTesseract.rotation.y = 0.42;
    scene.add(masterTesseract);

    // ==============================================================
    // 1. OUTER 4D HYPERCUBE (Glowing Primary Cage)
    // ==============================================================
    const outerGeo = new THREE.BoxGeometry(2.2, 2.2, 2.2);
    const outerMat = new THREE.MeshBasicMaterial({
      color: currentTheme.outer,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const outerCube = new THREE.Mesh(outerGeo, outerMat);
    masterTesseract.add(outerCube);

    // 8 Outer Corner Luminous Orbs
    const orbGeo = new THREE.SphereGeometry(0.065, 12, 12);
    const outerOrbMat = new THREE.MeshBasicMaterial({ color: currentTheme.outer });
    const outerCornerCoords = [
      [-1.1, -1.1, -1.1], [1.1, -1.1, -1.1],
      [1.1, 1.1, -1.1], [-1.1, 1.1, -1.1],
      [-1.1, -1.1, 1.1], [1.1, -1.1, 1.1],
      [1.1, 1.1, 1.1], [-1.1, 1.1, 1.1],
    ];

    outerCornerCoords.forEach(([x, y, z]) => {
      const orb = new THREE.Mesh(orbGeo, outerOrbMat);
      orb.position.set(x, y, z);
      outerCube.add(orb);
    });

    // ==============================================================
    // 2. MIDDLE HYPER-DIMENSIONAL PRISM (Contra-Spinning Layer)
    // ==============================================================
    const midGeo = new THREE.IcosahedronGeometry(1.4, 0);
    const midMat = new THREE.MeshBasicMaterial({
      color: currentTheme.mid,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const midPrism = new THREE.Mesh(midGeo, midMat);
    masterTesseract.add(midPrism);

    // ==============================================================
    // 3. INNER 4D HYPERCUBE (Core Harmonic Resonator)
    // ==============================================================
    const innerGeo = new THREE.BoxGeometry(1.15, 1.15, 1.15);
    const innerMat = new THREE.MeshBasicMaterial({
      color: currentTheme.inner,
      wireframe: true,
      transparent: true,
      opacity: 0.85,
    });
    const innerCube = new THREE.Mesh(innerGeo, innerMat);
    masterTesseract.add(innerCube);

    // 8 Inner Corner Luminous Orbs
    const innerOrbMat = new THREE.MeshBasicMaterial({ color: currentTheme.inner });
    const innerCornerCoords = [
      [-0.575, -0.575, -0.575], [0.575, -0.575, -0.575],
      [0.575, 0.575, -0.575], [-0.575, 0.575, -0.575],
      [-0.575, -0.575, 0.575], [0.575, -0.575, 0.575],
      [0.575, 0.575, 0.575], [-0.575, 0.575, 0.575],
    ];

    innerCornerCoords.forEach(([x, y, z]) => {
      const orb = new THREE.Mesh(orbGeo, innerOrbMat);
      orb.position.set(x, y, z);
      innerCube.add(orb);
    });

    // ==============================================================
    // 4. 8 4D DIAGONAL LASER RAYS (Hyper-dimensional vertex bridges)
    // ==============================================================
    const connectorGeo = new THREE.BufferGeometry();
    const rayPositions = new Float32Array(8 * 2 * 3);
    connectorGeo.setAttribute("position", new THREE.BufferAttribute(rayPositions, 3));

    const connectorMat = new THREE.LineBasicMaterial({
      color: currentTheme.connectors,
      transparent: true,
      opacity: 0.75,
    });
    const connectorLines = new THREE.LineSegments(connectorGeo, connectorMat);
    masterTesseract.add(connectorLines);

    // ==============================================================
    // 5. CENTRAL MULTI-FACETED QUANTUM SINGULARITY CORE
    // ==============================================================
    const coreGeo = new THREE.OctahedronGeometry(0.42, 0);
    const coreMat = new THREE.MeshStandardMaterial({
      color: currentTheme.core,
      emissive: currentTheme.core,
      emissiveIntensity: 0.95,
      roughness: 0.15,
      metalness: 0.95,
      flatShading: true,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    masterTesseract.add(coreMesh);

    // Core Point Light Surge
    const coreLight = new THREE.PointLight(currentTheme.core, 3.5, 8);
    masterTesseract.add(coreLight);

    // ==============================================================
    // 6. SHOCKWAVE EXPANSION PULSE RING (On Boost)
    // ==============================================================
    const shockwaveGeo = new THREE.RingGeometry(0.2, 0.35, 32);
    const shockwaveMat = new THREE.MeshBasicMaterial({
      color: currentTheme.shockwave,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0,
    });
    const shockwaveMesh = new THREE.Mesh(shockwaveGeo, shockwaveMat);
    shockwaveMesh.rotation.x = Math.PI / 2;
    masterTesseract.add(shockwaveMesh);

    // ==============================================================
    // 7. QUANTUM PARTICLE NEBULA (220 Glowing Orbiting Points)
    // ==============================================================
    const particleCount = 220;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    const particleData = [];

    for (let i = 0; i < particleCount; i++) {
      const r = 0.9 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;
      const speed = 0.006 + Math.random() * 0.015;

      particlePos[i * 3] = r * Math.cos(theta) * Math.cos(phi);
      particlePos[i * 3 + 1] = r * Math.sin(phi);
      particlePos[i * 3 + 2] = r * Math.sin(theta) * Math.cos(phi);

      particleData.push({ r, theta, phi, speed });
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: currentTheme.particles,
      size: 0.035,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    masterTesseract.add(particles);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.1);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.8);
    dirLight.position.set(4, 5, 5);
    scene.add(dirLight);

    // Observer
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // ==============================================================
    // MAIN ANIMATION LOOP (Stable, Crisp, High-Tech)
    // ==============================================================
    let animId;
    let clock = new THREE.Clock();
    let shockwaveScale = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const time = clock.getElapsedTime();
      const isBoost = overclockRef.current;
      const boostMult = isBoost ? 3.2 : 1.0;

      // Stable breathing floating motion (Zero wild movement)
      masterTesseract.position.y = Math.sin(time * 1.4) * 0.06;

      // 1. Tesseract 4D Contra-Rotations
      outerCube.rotation.x = time * 0.28 * boostMult;
      outerCube.rotation.y = time * 0.38 * boostMult;

      midPrism.rotation.y = -time * 0.2 * boostMult;
      midPrism.rotation.z = time * 0.25 * boostMult;

      innerCube.rotation.x = -time * 0.38 * boostMult;
      innerCube.rotation.y = -time * 0.48 * boostMult;

      // 2. Update 4D Diagonal Laser Rays
      const posArray = connectorLines.geometry.attributes.position.array;
      for (let i = 0; i < 8; i++) {
        const outV = new THREE.Vector3(...outerCornerCoords[i]).applyEuler(outerCube.rotation);
        const inV = new THREE.Vector3(...innerCornerCoords[i]).applyEuler(innerCube.rotation);

        const baseIdx = i * 6;
        posArray[baseIdx] = outV.x;
        posArray[baseIdx + 1] = outV.y;
        posArray[baseIdx + 2] = outV.z;

        posArray[baseIdx + 3] = inV.x;
        posArray[baseIdx + 4] = inV.y;
        posArray[baseIdx + 5] = inV.z;
      }
      connectorLines.geometry.attributes.position.needsUpdate = true;

      // 3. Central Core Pulsing & Energy Aura
      const corePulse = 1.0 + Math.sin(time * 3.5) * (isBoost ? 0.35 : 0.12);
      coreMesh.scale.set(corePulse, corePulse, corePulse);
      coreMesh.rotation.y += 0.03 * boostMult;
      coreMesh.rotation.z += 0.02 * boostMult;

      coreLight.intensity = isBoost ? 6.0 : 3.0 + Math.sin(time * 6.0) * 1.2;

      // 4. Shockwave Expansion
      if (isBoost) {
        shockwaveScale += 0.06;
        if (shockwaveScale > 3.8) shockwaveScale = 0.2;
        shockwaveMesh.scale.set(shockwaveScale, shockwaveScale, shockwaveScale);
        shockwaveMat.opacity = Math.max(0, 1.0 - shockwaveScale / 3.8);
      } else {
        shockwaveMat.opacity = 0;
        shockwaveScale = 0;
      }

      // 5. Particle Flow
      particles.rotation.y = time * 0.08 * boostMult;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // Live Telemetry Ticker
    const statsInterval = setInterval(() => {
      const th = (570 + Math.random() * 40).toFixed(1);
      const temp = (1.6 + Math.random() * 0.4).toFixed(1);
      setTelemetry((prev) => ({
        ...prev,
        throughput: `${th} Gbps`,
        coreTemp: `${temp} K`,
      }));
    }, 1800);

    return () => {
      clearInterval(statsInterval);
      observer.disconnect();
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);

      renderer.dispose();
      outerGeo.dispose();
      outerMat.dispose();
      midGeo.dispose();
      midMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      connectorGeo.dispose();
      connectorMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      orbGeo.dispose();
      outerOrbMat.dispose();
      innerOrbMat.dispose();
      shockwaveGeo.dispose();
      shockwaveMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, [theme]);

  return (
    <div className="relative w-full h-[480px] sm:h-[520px] flex items-center justify-center select-none overflow-hidden rounded-3xl glass-panel shadow-2xl border border-slate-200/80 dark:border-white/10 group">
      {/* Bioluminescent Cyber Glow Aura */}
      <div
        className={`absolute inset-0 bg-gradient-to-tr ${currentTheme.bgGlow} opacity-60 blur-3xl pointer-events-none transition-all duration-700`}
      />

      {/* Cyber Grid Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* 3D WebGL Canvas */}
      <div ref={mountRef} className="w-full h-full z-0" />

      {/* Top Left: HUD Status Badge */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <div className="backdrop-blur-xl bg-white/85 dark:bg-slate-950/85 border border-slate-200/80 dark:border-white/10 px-3.5 py-2 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-mono">
          <span className="relative flex h-2.5 w-2.5">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                isOverclocked ? "bg-red-500" : "bg-cyan-400"
              }`}
            ></span>
            <span
              className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                isOverclocked ? "bg-rose-500" : "bg-cyan-500"
              }`}
            ></span>
          </span>
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
              {isOverclocked ? "⚡ 4D HYPER-DRIVE ENGAGED" : "4D QUANTUM TESSERACT"}
            </span>
            <span className="text-slate-900 dark:text-slate-100 font-bold text-[11px] flex items-center gap-1.5">
              <span>{telemetry.throughput}</span>
              <span className="text-emerald-500 font-semibold">[{telemetry.compressionRatio}]</span>
            </span>
          </div>
        </div>
      </div>

      {/* Top Right: Theme Palette Switcher */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 backdrop-blur-xl bg-white/85 dark:bg-slate-950/85 border border-slate-200/80 dark:border-white/10 p-1.5 rounded-2xl shadow-xl">
        {[
          { id: "cyber", label: "Cyan", color: "bg-cyan-400" },
          { id: "void", label: "Void", color: "bg-pink-500" },
          { id: "matrix", label: "Matrix", color: "bg-emerald-400" },
          { id: "plasma", label: "Plasma", color: "bg-amber-400" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTheme(t.id)}
            title={`Switch to ${t.label} Theme`}
            className={`w-6 h-6 rounded-xl flex items-center justify-center transition-all ${
              theme === t.id
                ? "ring-2 ring-blue-500 scale-110 shadow-md"
                : "opacity-60 hover:opacity-100 hover:scale-105"
            }`}
          >
            <span className={`w-3.5 h-3.5 rounded-full ${t.color}`} />
          </button>
        ))}
      </div>

      {/* Bottom Left: Live Telemetry HUD */}
      <div className="absolute bottom-4 left-4 z-10 pointer-events-none hidden sm:flex items-center gap-2">
        <div className="backdrop-blur-xl bg-white/85 dark:bg-slate-950/85 border border-slate-200/80 dark:border-white/10 px-3 py-1.5 rounded-xl shadow-lg text-[11px] font-mono flex items-center gap-2 text-slate-700 dark:text-slate-300">
          <Cpu className="w-3.5 h-3.5 text-blue-500" />
          <span>Clock: <span className="font-bold text-blue-600 dark:text-cyan-300">{telemetry.frequency}</span></span>
        </div>
        <div className="backdrop-blur-xl bg-white/85 dark:bg-slate-950/85 border border-slate-200/80 dark:border-white/10 px-3 py-1.5 rounded-xl shadow-lg text-[11px] font-mono flex items-center gap-2 text-slate-700 dark:text-slate-300">
          <Activity className="w-3.5 h-3.5 text-purple-500" />
          <span>Core Temp: <span className="font-bold text-purple-600 dark:text-purple-300">{telemetry.coreTemp}</span></span>
        </div>
      </div>

      {/* Bottom Right: Interactive Overclock Core Button */}
      <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2">
        <button
          onClick={handleBoost}
          className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-mono font-bold uppercase tracking-wider backdrop-blur-xl shadow-xl transition-all active:scale-95 ${
            isOverclocked
              ? "bg-rose-600 text-white shadow-rose-500/50 scale-105 animate-pulse"
              : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-blue-500/30 hover:scale-105"
          }`}
        >
          <Flame className={`w-3.5 h-3.5 ${isOverclocked ? "animate-bounce text-yellow-300" : ""}`} />
          <span>{isOverclocked ? "Hyper-Drive Active!" : "Boost 4D Core"}</span>
        </button>
      </div>
    </div>
  );
};

export default Globe3DCanvas;
