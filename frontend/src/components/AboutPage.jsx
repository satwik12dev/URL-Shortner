import React from "react";
import {
  Link2,
  BarChart3,
  QrCode,
  ShieldCheck,
  Zap,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import Button from "./ui/Button";
import Tilt3DCard from "./3d/Tilt3DCard";
import Background3DCanvas from "./3d/Background3DCanvas";
import Globe3DCanvas from "./3d/Globe3DCanvas";
import AnimeArchitectureFlow from "./anime/AnimeArchitectureFlow";

const AboutPage = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20 relative overflow-hidden">
      <Background3DCanvas />

      {/* Header section */}
      <div className="text-center max-w-3xl mx-auto space-y-4 relative z-10">
        <span className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-600 dark:text-indigo-400 bg-blue-50 dark:bg-indigo-950/60 px-3.5 py-1.5 rounded-full border border-blue-200 dark:border-indigo-800/60 shadow-sm">
          Platform Architecture
        </span>
        <h1 className="text-3xl sm:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          High-Speed Routing & <span className="gradient-text-accent">Global Telemetry</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
          URL Shortener is engineered to deliver microsecond-latency redirection and actionable, privacy-first analytics. Built for modern creators, marketing teams, and developers worldwide.
        </p>
      </div>

      {/* 4 Feature Deep Dives */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        {/* Card 1 */}
        <Tilt3DCard>
          <div className="glass-panel glass-panel-hover p-8 rounded-3xl space-y-4 h-full flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-indigo-500/10 text-blue-600 dark:text-indigo-400 border border-blue-200 dark:border-indigo-500/20 flex items-center justify-center shadow-lg">
                <Link2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Sub-Millisecond Hash Tokenizer
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Generate clean, concise short URLs in milliseconds. Transform lengthy, tracking-bloated links into high-speed aliases that are easy to remember, type, and share across any channel.
              </p>
            </div>
            <ul className="space-y-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 pt-4 border-t border-slate-100 dark:border-white/5">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Instant single-click copy with clipboard integration</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Custom short slug parameters and alias support</span>
              </li>
            </ul>
          </div>
        </Tilt3DCard>

        {/* Card 2 */}
        <Tilt3DCard>
          <div className="glass-panel glass-panel-hover p-8 rounded-3xl space-y-4 h-full flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-500/20 flex items-center justify-center shadow-lg">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Interactive Recharts Telemetry
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Monitor click trends, visitor traffic spikes, and referral engagement with dynamic Recharts visualizations. Switch between Area and Bar charts to gain exact insights into your audience behavior.
              </p>
            </div>
            <ul className="space-y-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 pt-4 border-t border-slate-100 dark:border-white/5">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Time range filters (7 Days, 30 Days, All-Time)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Dedicated per-link analytics breakdown and sorting</span>
              </li>
            </ul>
          </div>
        </Tilt3DCard>

        {/* Card 3 */}
        <Tilt3DCard>
          <div className="glass-panel glass-panel-hover p-8 rounded-3xl space-y-4 h-full flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-500/20 flex items-center justify-center shadow-lg">
                <QrCode className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                On-Demand QR Code Engine
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Every shortened link automatically includes a scannable QR Code that can be downloaded as a high-resolution PNG for flyers, merchandise, digital presentations, and print media.
              </p>
            </div>
            <ul className="space-y-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 pt-4 border-t border-slate-100 dark:border-white/5">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Crisp vector-based QR rendering</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Instant mobile camera scan compatibility</span>
              </li>
            </ul>
          </div>
        </Tilt3DCard>

        {/* Card 4 */}
        <Tilt3DCard>
          <div className="glass-panel glass-panel-hover p-8 rounded-3xl space-y-4 h-full flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-indigo-500/10 text-blue-600 dark:text-indigo-400 border border-blue-200 dark:border-indigo-500/20 flex items-center justify-center shadow-lg">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Enterprise Token Guard
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Secure JWT session storage, automatic rate-limiting protection, and persistent endpoint authentication prevent link tampering and shield your visitor traffic.
              </p>
            </div>
            <ul className="space-y-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 pt-4 border-t border-slate-100 dark:border-white/5">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Encrypted JWT bearer authorization headers</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Spam & malicious redirect protection</span>
              </li>
            </ul>
          </div>
        </Tilt3DCard>
      </div>

      {/* ANIME.JS TOPOLOGY ENGINE */}
      <div className="relative z-10 pt-4">
        <AnimeArchitectureFlow />
      </div>

      {/* 4D Tesseract Hyper-Core Preview */}
      <div className="relative z-10 pt-4">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            ⚡ 4D Tesseract Cryptographic Matrix
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Stable interactive 3D visualization featuring nested 4D hypercubes, dynamic connecting vertex rays, glowing quantum nano-core, and real-time network telemetry.
          </p>
        </div>
        <Globe3DCanvas />
      </div>

      {/* Bottom CTA */}
      <div className="relative z-10 text-center pt-4 pb-8">
        <Link to="/register">
          <Button variant="default" size="lg" className="rounded-xl shadow-xl px-8 font-bold">
            <span>Start Shortening Links Free</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default AboutPage;