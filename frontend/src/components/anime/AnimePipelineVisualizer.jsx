import React, { useEffect, useRef, useState } from "react";
import { animate, createTimeline, stagger } from "animejs";
import {
  Zap,
  Globe2,
  Cpu,
  ArrowRight,
  ShieldCheck,
  Activity,
  Play,
  RotateCcw,
  Sparkles,
  Server,
  Layers,
} from "lucide-react";
import Button from "../ui/Button";

const stages = [
  {
    id: "stage-1",
    title: "1. Anycast DNS",
    desc: "NIXI Peering Edge",
    latency: "0.6 ms",
    icon: Globe2,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "stage-2",
    title: "2. Bharat Edge POP",
    desc: "Nearest Metro Cache",
    latency: "1.2 ms",
    icon: Server,
    color: "from-cyan-500 to-blue-600",
  },
  {
    id: "stage-3",
    title: "3. Tokenizer Hash",
    desc: "Base62 In-Memory Guard",
    latency: "0.8 ms",
    icon: Cpu,
    color: "from-indigo-500 to-purple-600",
  },
  {
    id: "stage-4",
    title: "4. SSL 302 Redirect",
    desc: "Direct Optical Handoff",
    latency: "0.6 ms",
    icon: Zap,
    color: "from-purple-500 to-emerald-500",
  },
];

const AnimePipelineVisualizer = () => {
  const containerRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [packetCount, setPacketCount] = useState(1);
  const [totalLatency, setTotalLatency] = useState(3.2);

  const runSimulation = () => {
    if (!containerRef.current || isRunning) return;
    setIsRunning(true);
    setActiveStep(0);

    const tl = createTimeline({
      onComplete: () => {
        setIsRunning(false);
        setActiveStep(4);
        setPacketCount((p) => p + 1);
        setTotalLatency((Math.random() * 0.8 + 2.8).toFixed(1));
      },
    });

    // Animate the kinetic photon packet traveling across stages
    stages.forEach((stage, index) => {
      tl.add({
        targets: `#packet-dot`,
        translateX: index * 240,
        duration: 350,
        ease: "easeOutQuad",
        begin: () => {
          setActiveStep(index + 1);
        },
      });

      tl.add({
        targets: `#node-${index}`,
        scale: [1, 1.08, 1],
        duration: 250,
        ease: "easeInOutQuad",
      }, "-=200");
    });
  };

  useEffect(() => {
    // Initial floating subtle ambient glow with Anime.js
    animate(".anime-ambient-node", {
      translateY: [-2, 2],
      duration: 2000,
      ease: "easeInOutSine",
      alternate: true,
      loop: true,
      delay: stagger(200),
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="glass-panel p-6 sm:p-8 rounded-3xl relative overflow-hidden space-y-6"
    >
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/5 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-cyan-400 bg-blue-50 dark:bg-cyan-950/60 px-2.5 py-1 rounded-full border border-blue-200 dark:border-cyan-800/60 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              <span>Anime.js Kinetic Engine</span>
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1.5">
            Sub-Millisecond Request Lifecycle
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Interactive visualization of real-time packet traversal across the Bharat Edge pipeline.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-center">
          <Button
            variant="default"
            size="sm"
            disabled={isRunning}
            onClick={runSimulation}
            className="font-bold shadow-md shadow-blue-600/30"
          >
            {isRunning ? (
              <>
                <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                <span>Routing Packet...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Simulate Click Routing</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Interactive Stages Pipeline */}
      <div className="relative py-4 overflow-x-auto">
        <div className="min-w-[760px] relative flex items-center justify-between px-6">

          {/* Background Connecting Optical Cable */}
          <div className="absolute left-12 right-12 top-1/2 -translate-y-1/2 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full z-0 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-emerald-400 transition-all duration-300 rounded-full"
              style={{
                width: `${(Math.min(activeStep, 4) / 4) * 100}%`,
              }}
            />
          </div>

          {/* Animated Kinetic Packet Photon */}
          <div
            id="packet-dot"
            className={`absolute left-10 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white border-2 border-cyan-400 shadow-lg shadow-cyan-400/80 z-20 pointer-events-none transition-opacity ${isRunning ? "opacity-100 scale-125" : "opacity-0"
              }`}
          />

          {/* Pipeline Node Cards */}
          {stages.map((stage, index) => {
            const Icon = stage.icon;
            const isPassed = activeStep > index;
            const isCurrent = activeStep === index + 1;

            return (
              <div
                key={stage.id}
                id={`node-${index}`}
                className={`anime-ambient-node relative z-10 flex flex-col items-center text-center w-40 p-4 rounded-2xl transition-all duration-300 border ${isCurrent
                    ? "bg-white dark:bg-slate-900 border-blue-500 dark:border-cyan-400 shadow-xl shadow-blue-500/20 scale-105"
                    : isPassed
                      ? "bg-blue-50/80 dark:bg-slate-900/90 border-blue-300 dark:border-blue-700/60"
                      : "bg-white/80 dark:bg-slate-950/80 border-slate-200 dark:border-slate-800 opacity-80"
                  }`}
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center mb-2 shadow-md transition-colors ${isCurrent || isPassed
                      ? "bg-gradient-to-tr " + stage.color + " text-white"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                    }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate w-full">
                  {stage.title}
                </h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate w-full">
                  {stage.desc}
                </p>
                <span className="mt-2 text-[10px] font-mono font-extrabold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-cyan-300 border border-blue-200 dark:border-cyan-800/40">
                  {stage.latency}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Telemetry Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs font-mono">
        <div className="bg-slate-50 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
          <span className="text-slate-500 dark:text-slate-400 text-[11px]">Total Packet Hop:</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-bold text-sm">~{totalLatency} ms</span>
        </div>
        <div className="bg-slate-50 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
          <span className="text-slate-500 dark:text-slate-400 text-[11px]">Optical Protocol:</span>
          <span className="text-blue-600 dark:text-blue-400 font-bold text-sm">HTTP/3 QUIC</span>
        </div>
        <div className="bg-slate-50 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
          <span className="text-slate-500 dark:text-slate-400 text-[11px]">Throughput:</span>
          <span className="text-purple-600 dark:text-purple-400 font-bold text-sm">120K req/sec</span>
        </div>
        <div className="bg-slate-50 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
          <span className="text-slate-500 dark:text-slate-400 text-[11px]">Packets Routed:</span>
          <span className="text-cyan-600 dark:text-cyan-400 font-bold text-sm">#{packetCount}</span>
        </div>
      </div>
    </div>
  );
};

export default AnimePipelineVisualizer;
