import React, { useState, useRef } from "react";
import { animate } from "animejs";
import { Link2, Zap, Check, Sparkles, Copy, Globe2 } from "lucide-react";
import Tilt3DCard from "./Tilt3DCard";
import confetti from "canvas-confetti";
import toast from "react-hot-toast";

const Url3DCompressorDemo = () => {
  const [demoInput, setDemoInput] = useState("https://my-brand-campaign.com/products/summer-sale?utm_source=social&utm_campaign=launch_2026");
  const [shortenedResult, setShortenedResult] = useState("urlshortener.app/s/launch26");
  const [isCompressing, setIsCompressing] = useState(false);
  const [copied, setCopied] = useState(false);

  const beamRef = useRef(null);
  const coreRef = useRef(null);
  const resultCardRef = useRef(null);

  const run3DCompression = () => {
    setIsCompressing(true);

    if (beamRef.current) {
      animate(beamRef.current, {
        scaleX: [0, 1],
        opacity: [0, 1, 0.8],
        duration: 500,
        ease: "outQuad",
      });
    }

    if (coreRef.current) {
      animate(coreRef.current, {
        rotateZ: "+=360deg",
        scale: [1, 1.2, 1],
        duration: 700,
        ease: "outElastic(1, .5)",
      });
    }

    const randomCode = Math.random().toString(36).substring(2, 8);

    setTimeout(() => {
      setShortenedResult(`urlshortener.app/s/${randomCode}`);
      setIsCompressing(false);

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#2563eb", "#38bdf8", "#6366f1"],
      });

      if (resultCardRef.current) {
        animate(resultCardRef.current, {
          scale: [0.9, 1],
          opacity: [0, 1],
          duration: 400,
          ease: "outBack",
        });
      }
    }, 550);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://${shortenedResult}`);
    setCopied(true);
    toast.success("Short URL copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Tilt3DCard className="w-full">
      <div className="glass-panel rounded-3xl p-6 sm:p-8 text-slate-900 dark:text-white relative overflow-hidden">
        {/* Subtle ambient underglow */}
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-blue-500/10 blur-3xl pointer-events-none rounded-full" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-indigo-500/10 border border-blue-200 dark:border-indigo-500/30 text-blue-600 dark:text-indigo-400 flex items-center justify-center shadow-lg">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                <span>Interactive Token Engine</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-blue-100 dark:bg-indigo-500/15 text-blue-700 dark:text-indigo-300 border border-blue-200 dark:border-indigo-500/30">
                  REALTIME
                </span>
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">Experience sub-millisecond URL tokenization</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono bg-slate-100 dark:bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-slate-600 dark:text-slate-300">EFFICIENCY: <span className="text-emerald-600 dark:text-emerald-400 font-bold">88.4%</span></span>
          </div>
        </div>

        {/* Compression Pipeline */}
        <div className="mt-7 space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 flex items-center gap-2">
              <Link2 className="w-3.5 h-3.5 text-blue-600 dark:text-indigo-400" />
              <span>Target Destination URL</span>
            </label>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <input
                type="text"
                value={demoInput}
                onChange={(e) => setDemoInput(e.target.value)}
                placeholder="Paste URL..."
                className="w-full bg-white dark:bg-slate-950/70 border border-slate-300 dark:border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm font-mono text-slate-800 dark:text-slate-200 focus:outline-none focus:border-blue-500 transition-colors shadow-sm"
              />
              <button
                onClick={run3DCompression}
                disabled={isCompressing}
                className="w-full sm:w-auto shrink-0 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-500/20 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 border border-white/15"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isCompressing ? "Shortening..." : "Simulate Shorten"}</span>
              </button>
            </div>
          </div>

          {/* Laser Processing Beam */}
          <div className="relative flex items-center justify-center py-1">
            <div
              ref={beamRef}
              className="absolute h-0.5 w-full bg-gradient-to-r from-blue-500 via-sky-400 to-indigo-500 rounded-full opacity-30 origin-left"
            />
            <div
              ref={coreRef}
              className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 border border-white/20 shadow-xl shadow-blue-500/30 flex items-center justify-center text-white relative z-10"
            >
              <Zap className="w-5 h-5" />
            </div>
          </div>

          {/* Result Card */}
          <div
            ref={resultCardRef}
            className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-blue-200 dark:border-indigo-500/30 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3 w-full sm:w-auto min-w-0">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-indigo-500/10 border border-blue-200 dark:border-indigo-500/30 text-blue-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                <Globe2 className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-700 dark:text-indigo-300 bg-blue-100 dark:bg-indigo-950/80 px-2 py-0.5 rounded-md border border-blue-300 dark:border-indigo-800/60">
                    Active Link
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">⚡ 100% Hash Match</span>
                </div>
                <p className="text-base sm:text-lg font-mono font-bold text-slate-900 dark:text-white truncate mt-1">
                  https://{shortenedResult}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                onClick={handleCopy}
                className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 text-blue-700 dark:text-indigo-300 border border-slate-200 dark:border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Tilt3DCard>
  );
};

export default Url3DCompressorDemo;
