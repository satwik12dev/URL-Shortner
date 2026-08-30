import React, { useEffect, useRef } from "react";
import { animateCounter } from "../../utils/animeAnimations";
import Tilt3DCard from "./Tilt3DCard";
import { TrendingUp, Globe2, ShieldCheck, Zap } from "lucide-react";

const StatsSection = () => {
  const stat1Ref = useRef(null);
  const stat2Ref = useRef(null);
  const stat3Ref = useRef(null);
  const stat4Ref = useRef(null);

  useEffect(() => {
    animateCounter(stat1Ref.current, 12840000, 2500, "", "+");
    animateCounter(stat2Ref.current, 99.99, 2000, "", "%");
    animateCounter(stat3Ref.current, 8.4, 2200, "", "ms");
    animateCounter(stat4Ref.current, 195, 2000, "", " Countries");
  }, []);

  const stats = [
    {
      title: "Total Links Routed",
      ref: stat1Ref,
      initial: "12,840,000+",
      desc: "Worldwide redirects processed with edge caching",
      icon: <TrendingUp className="w-5 h-5 text-blue-600 dark:text-indigo-400" />,
      color: "from-blue-500/10 via-indigo-500/5 to-transparent",
    },
    {
      title: "Gateway Uptime",
      ref: stat2Ref,
      initial: "99.99%",
      desc: "High-availability geo-distributed infrastructure",
      icon: <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      color: "from-emerald-500/10 via-teal-500/5 to-transparent",
    },
    {
      title: "Redirect Latency",
      ref: stat3Ref,
      initial: "8.4ms",
      desc: "Sub-millisecond token lookup and zero overhead",
      icon: <Zap className="w-5 h-5 text-sky-600 dark:text-sky-400" />,
      color: "from-sky-500/10 via-blue-500/5 to-transparent",
    },
    {
      title: "Global Reach",
      ref: stat4Ref,
      initial: "195 Countries",
      desc: "Worldwide click telemetry and geolocation",
      icon: <Globe2 className="w-5 h-5 text-blue-600 dark:text-indigo-400" />,
      color: "from-blue-500/10 via-purple-500/5 to-transparent",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {stats.map((stat, i) => (
        <Tilt3DCard key={i}>
          <div className="h-full rounded-2xl p-6 glass-panel glass-panel-hover flex flex-col justify-between relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl ${stat.color} rounded-bl-full pointer-events-none`} />

            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {stat.title}
                </span>
                <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-white/5 text-slate-700 dark:text-slate-300">
                  {stat.icon}
                </div>
              </div>

              <div>
                <p
                  ref={stat.ref}
                  className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-mono tracking-tight"
                >
                  {stat.initial}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed font-normal">
                  {stat.desc}
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>Telemetry Live</span>
              </span>
              <span className="font-mono text-slate-400 dark:text-slate-500 text-[10px]">POPs #{100 + i * 12}</span>
            </div>
          </div>
        </Tilt3DCard>
      ))}
    </div>
  );
};

export default StatsSection;
