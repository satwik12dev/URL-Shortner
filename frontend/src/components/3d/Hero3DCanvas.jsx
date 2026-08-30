import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const Hero3DCanvas = () => {
  const mountRef = useRef(null);
  const [interactiveStats, setInteractiveStats] = useState({
    activeBeams: 18,
    nodeStatus: "ONLINE",
    packets: 1420,
  });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let isVisible = true;
    const width = container.clientWidth || 450;
    const height = container.clientHeight || 450;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 6.2;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25));
    container.appendChild(renderer.domElement);

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // --- 1. Core Wireframe ---
    const coreGeo = new THREE.IcosahedronGeometry(1.5, 1);
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const coreWireframe = new THREE.Mesh(coreGeo, wireframeMat);
    mainGroup.add(coreWireframe);

    // Inner Glowing Core
    const innerGeo = new THREE.IcosahedronGeometry(0.85, 1);
    const innerMat = new THREE.MeshLambertMaterial({
      color: 0x38bdf8,
      emissive: 0x312e81,
      transparent: true,
      opacity: 0.85,
    });
    const innerCore = new THREE.Mesh(innerGeo, innerMat);
    mainGroup.add(innerCore);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x38bdf8, 1.5);
    dirLight.position.set(4, 4, 4);
    scene.add(dirLight);

    // --- 2. Orbiting Cyber Rings ---
    const createRing = (radius, tiltX, tiltY, color) => {
      const ringGeo = new THREE.TorusGeometry(radius, 0.018, 8, 48);
      const ringMat = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.5,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = tiltX;
      ringMesh.rotation.y = tiltY;
      return ringMesh;
    };

    const ring1 = createRing(2.3, Math.PI / 3, Math.PI / 6, 0x38bdf8);
    const ring2 = createRing(2.7, -Math.PI / 4, Math.PI / 4, 0x6366f1);
    mainGroup.add(ring1, ring2);

    // --- 3. Satellite Link Nodes ---
    const satelliteCount = 4;
    const satellites = [];
    const satGeo = new THREE.SphereGeometry(0.09, 12, 12);
    const satMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });

    for (let i = 0; i < satelliteCount; i++) {
      const satMesh = new THREE.Mesh(satGeo, satMat);
      const angle = (i / satelliteCount) * Math.PI * 2;
      const radius = 2.4;
      satMesh.position.set(Math.cos(angle) * radius, Math.sin(angle * 1.5) * 0.5, Math.sin(angle) * radius);
      mainGroup.add(satMesh);
      satellites.push({ mesh: satMesh, angle: angle, speed: 0.012 + i * 0.003, radius: radius });
    }

    // Dynamic Connection Lines
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: 0.3,
    });
    const lineGeo = new THREE.BufferGeometry();
    const linePositions = new Float32Array(satelliteCount * 2 * 3);
    lineGeo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    const linesMesh = new THREE.LineSegments(lineGeo, lineMat);
    mainGroup.add(linesMesh);

    // --- 4. Particles ---
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      particlePos[i * 3] = (Math.random() - 0.5) * 12;
      particlePos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      particlePos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x818cf8,
      size: 0.05,
      transparent: true,
      opacity: 0.6,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Mouse Interaction
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let boostSpeed = 1;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouse.targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 1.5;
      mouse.targetY = -((e.clientY - rect.top) / rect.height - 0.5) * 1.5;
    };

    const handleClick = () => {
      boostSpeed = 3;
      setInteractiveStats((prev) => ({
        ...prev,
        packets: prev.packets + 10,
      }));
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("click", handleClick);

    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsedTime = clock.getElapsedTime();

      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      boostSpeed += (1 - boostSpeed) * 0.05;

      mainGroup.rotation.y = elapsedTime * 0.2 * boostSpeed + mouse.x * 0.4;
      mainGroup.rotation.x = mouse.y * 0.3;

      coreWireframe.rotation.y = elapsedTime * 0.3 * boostSpeed;
      innerCore.rotation.y = -elapsedTime * 0.4 * boostSpeed;

      ring1.rotation.z += 0.008 * boostSpeed;
      ring2.rotation.z -= 0.006 * boostSpeed;

      const posArray = lineGeo.attributes.position.array;
      satellites.forEach((sat, idx) => {
        sat.angle += sat.speed * boostSpeed;
        const x = Math.cos(sat.angle) * sat.radius;
        const y = Math.sin(sat.angle * 1.5) * 0.5;
        const z = Math.sin(sat.angle) * sat.radius;
        sat.mesh.position.set(x, y, z);

        const baseIdx = idx * 6;
        posArray[baseIdx] = 0;
        posArray[baseIdx + 1] = 0;
        posArray[baseIdx + 2] = 0;
        posArray[baseIdx + 3] = x;
        posArray[baseIdx + 4] = y;
        posArray[baseIdx + 5] = z;
      });
      lineGeo.attributes.position.needsUpdate = true;

      particles.rotation.y = elapsedTime * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      observer.disconnect();
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("click", handleClick);
        if (renderer.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      }
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      coreGeo.dispose();
      wireframeMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      satGeo.dispose();
      satMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[360px] sm:h-[440px] lg:h-[480px] flex items-center justify-center select-none">
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating HUD Badges */}
      <div className="absolute top-4 left-4 pointer-events-none">
        <div className="backdrop-blur-md bg-slate-900/80 border border-indigo-500/25 text-white px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-2 text-xs font-mono">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-slate-300">NODE: <span className="text-emerald-400 font-bold">{interactiveStats.nodeStatus}</span></span>
        </div>
      </div>

      <div className="absolute top-4 right-4 pointer-events-none">
        <div className="backdrop-blur-md bg-slate-900/80 border border-sky-500/25 text-white px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-2 text-xs font-mono">
          <span className="text-sky-400">⚡ LATENCY:</span>
          <span className="font-bold text-slate-100">8.4ms</span>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 pointer-events-none">
        <div className="backdrop-blur-md bg-indigo-600/80 text-white px-3 py-1.5 rounded-xl shadow-lg text-xs font-semibold flex items-center gap-1.5 border border-indigo-400/30">
          <span>✨ Click to boost pulse</span>
        </div>
      </div>
    </div>
  );
};

export default Hero3DCanvas;
