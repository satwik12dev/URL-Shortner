import React, { useEffect, useRef, useState } from "react";
import { animate, createTimeline, stagger } from "animejs";
import {
  Layers,
  Database,
  Server,
  Globe,
  Shield,
  Zap,
  Play,
  RotateCcw,
  Sparkles,
  Cpu,
  CheckCircle2,
} from "lucide-react";
import Button from "../ui/Button";

const architectureLayers = [
  {
    id: "layer-client",
    title: "1. Global Client Layer",
    badge: "Origin",
    icon: Globe,
    tech: "Next.js / Vite / Mobile SDKs",
    desc: "Clients initiate sub-millisecond short URL queries with Anycast DNS resolution.",
    color: "from-sky-500 to-blue-600",
  },
  {
    id: "layer-edge",
    title: "2. Bharat Edge CDN Mesh",
    badge: "Edge POPs",
    icon: Server,
    tech: "NIXI Metro POPs (7 Hubs)",
    desc: "Replicates active short links at the edge with SSL termination in ~1.2ms.",
    color: "from-blue-600 to-indigo-600",
  },
  {
    id: "layer-app",
    title: "3. Reactive Microservices",
    badge: "Core Logic",
    icon: Cpu,
    tech: "Spring Boot 3.x + JWT Guard",
    desc: "High-throughput tokenization, Base62 encoding, and telemetry tracking engine.",
    color: "from-indigo-600 to-purple-600",
  },
  {
    id: "layer-data",
    title: "4. Multi-Tier Persistence",
    badge: "Zero-Latency Store",
    icon: Database,
    tech: "Redis Cache + JPA Sharding",
    desc: "Sub-millisecond key-value lookups with asynchronous write-behind click aggregation.",
    color: "from-purple-600 to-emerald-600",
  },
];

const AnimeArchitectureFlow = () => {
  const containerRef = useRef(null);
  const [activeLayer, setActiveLayer] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeMode, setActiveMode] = useState("normal");

  const runFlowAnimation = (mode = "normal") => {
    if (isSimulating) return;
    setIsSimulating(true);
    setActiveMode(mode);
    setActiveLayer(0);

    const tl = createTimeline({
      onComplete: () => {
        setIsSimulating(false);
        setActiveLayer(4);
      },
    });

    architectureLayers.forEach((layer, index) => {
      tl.add({
        targets: `#arch-card-${index}`,
        translateY: [-6, 0],
        scale: [0.98, 1.02, 1],
        duration: mode === "turbo" ? 220 : 400,
        ease: "easeOutQuad",
        begin: () => {
          setActiveLayer(index + 1);
        },
      });

      tl.add({
        targets: `#beam-${index}`,
        scaleY: [0, 1],
        opacity: [0, 1],
        duration: mode === "turbo" ? 150 : 250,
        ease: "easeInOutSine",
      }, "-=150");
    });
  };

  useEffect(() => {
    // Initial floating subtle ambient glow with Anime.js
    animate(".anime-arch-float", {
      translateY: [-2, 2],
      duration: 2400,
      ease: "easeInOutSine",
      alternate: true,
      loop: true,
      delay: stagger(180),
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="glass-panel p-6 sm:p-10 rounded-3xl relative overflow-hidden space-y-8"
    >
      {/* Top Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/5 pb-6">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-cyan-400 bg-blue-50 dark:bg-cyan-950/60 px-2.5 py-1 rounded-full border border-blue-200 dark:border-cyan-800/60">
            Anime.js Architecture Engine
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-2">
            Multi-Tier High Throughput Topology
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Simulate live packets traversing through every layer from Client to Multi-Tier Persistence.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start md:self-center">
          <Button
            variant="secondary"
            size="sm"
            disabled={isSimulating}
            onClick={() => runFlowAnimation("normal")}
            className="text-xs font-bold"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Trace Packet</span>
          </Button>

          <Button
            variant="default"
            size="sm"
            disabled={isSimulating}
            onClick={() => runFlowAnimation("turbo")}
            className="text-xs font-bold shadow-md shadow-blue-600/25"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Turbo Burst</span>
          </Button>
        </div>
      </div>

      {/* Vertical Interactive Flow Layers */}
      <div className="space-y-4 relative">
        {architectureLayers.map((layer, index) => {
          const Icon = layer.icon;
          const isPassed = activeLayer > index;
          const isCurrent = activeLayer === index + 1;

          return (
            <div key={layer.id} className="relative">
              {/* Connecting Kinetic Laser Beam */}
              {index < architectureLayers.length - 1 && (
                <div
                  id={`beam-${index}`}
                  className="absolute left-8 sm:left-10 top-full h-4 w-1 bg-gradient-to-b from-blue-600 to-cyan-400 z-0 origin-top rounded-full transition-opacity opacity-40"
                />
              )}

              {/* Layer Card */}
              <div
                id={`arch-card-${index}`}
                className={`anime-arch-float p-5 sm:p-6 rounded-2xl border transition-all duration-300 relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isCurrent
                    ? "bg-white dark:bg-slate-900 border-blue-500 dark:border-cyan-400 shadow-xl shadow-blue-500/15"
                    : isPassed
                    ? "bg-blue-50/70 dark:bg-slate-900/80 border-blue-200 dark:border-blue-800/60"
                    : "bg-slate-50/80 dark:bg-slate-950/70 border-slate-200 dark:border-slate-800/80"
                }`}
              >
                <div className="flex items-start sm:items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-md transition-colors ${
                      isCurrent || isPassed
                        ? "bg-gradient-to-tr " + layer.color + " text-white"
                        : "bg-slate-200 dark:bg-slate-800 text-slate-500"
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-bold text-slate-900 dark:text-white">
                        {layer.title}
                      </h4>
                      <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-blue-100 dark:bg-indigo-950/80 text-blue-700 dark:text-cyan-300 border border-blue-200 dark:border-indigo-800/60">
                        {layer.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {layer.desc}
                    </p>
                  </div>
                </div>

                <div className="sm:text-right shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200 dark:border-white/5">
                  <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 block">
                    Tech Stack
                  </span>
                  <span className="text-xs font-mono font-bold text-blue-600 dark:text-cyan-300">
                    {layer.tech}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Telemetry Verification Bar */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span>Zero-Downtime Replication Enabled</span>
        </div>
        <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400">
          <span>Concurrency: <strong className="text-blue-600 dark:text-cyan-300">100,000 req/s</strong></span>
          <span>NIXI Latency: <strong className="text-emerald-500">~3.2ms</strong></span>
        </div>
      </div>
    </div>
  );
};

export default AnimeArchitectureFlow;
