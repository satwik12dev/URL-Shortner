import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useStoreContext } from "../contextApi/ContextApi";
import Card from "./Card";
import Button from "./ui/Button";
import Hero3DCanvas from "./3d/Hero3DCanvas";
import Background3DCanvas from "./3d/Background3DCanvas";
import Globe3DCanvas from "./3d/Globe3DCanvas";
import StatsSection from "./3d/StatsSection";
import Url3DCompressorDemo from "./3d/Url3DCompressorDemo";
import Tilt3DCard from "./3d/Tilt3DCard";
import {
  Link2,
  BarChart3,
  QrCode,
  ShieldCheck,
  Zap,
  ArrowRight,
  Sparkles,
  Copy,
  Check,
  Globe2,
  Activity,
} from "lucide-react";
import toast from "react-hot-toast";
import confetti from "canvas-confetti";
import api from "../api/api";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";

const sampleChartData = [
  { day: "Mon", clicks: 320 },
  { day: "Tue", clicks: 580 },
  { day: "Wed", clicks: 750 },
  { day: "Thu", clicks: 920 },
  { day: "Fri", clicks: 1280 },
  { day: "Sat", clicks: 1650 },
  { day: "Sun", clicks: 2100 },
];

const LandingPage = () => {
  const navigate = useNavigate();
  const { token } = useStoreContext();
  const [inputUrl, setInputUrl] = useState("");
  const [quickShortened, setQuickShortened] = useState(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleQuickShorten = async (e) => {
    e.preventDefault();
    if (!inputUrl.trim()) {
      toast.error("Please enter a URL");
      return;
    }

    if (!token) {
      toast("Please sign in or create an account to save & track your links!", {
        icon: "✨",
      });
      navigate("/register");
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.post(
        "/api/urls/shorten",
        { originalUrl: inputUrl },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      const frontendUrl =
        import.meta.env.VITE_REACT_FRONT_END_URL || window.location.origin;
      const fullShortUrl = `${frontendUrl}/s/${data.shortUrl}`;

      setQuickShortened(fullShortUrl);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#2563eb", "#38bdf8", "#6366f1"],
      });
      toast.success("URL Shortened Successfully!");
    } catch (err) {
      toast.error("Failed to shorten URL. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (quickShortened) {
      navigator.clipboard.writeText(quickShortened);
      setCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative overflow-hidden min-h-screen">
      {/* 3D Ambient Mesh */}
      <Background3DCanvas />

      {/* Atmospheric Underglows */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-blue-500/15 via-indigo-500/10 to-transparent blur-3xl pointer-events-none rounded-full" />

      {/* HERO SECTION */}
      <section className="relative pt-12 pb-16 lg:pt-20 lg:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">

          {/* Left Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-indigo-950/60 border border-blue-200 dark:border-indigo-500/30 text-blue-700 dark:text-indigo-300 text-xs sm:text-sm font-semibold shadow-sm backdrop-blur-md"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-indigo-400" />
              <span>Next-Gen URL Management & Telemetry</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1]"
            >
              Shorten Links. <br />
              <span className="gradient-text-accent">Analyze Global Reach.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed"
            >
              Transform lengthy destinations into high-speed, secure short links.
              Track global clicks in real-time, generate custom QR codes, and power up your marketing.
            </motion.p>

            {/* Quick Shortener Bar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="pt-2 max-w-xl mx-auto lg:mx-0"
            >
              <form
                onSubmit={handleQuickShorten}
                className="glass-panel p-2 sm:p-2.5 rounded-2xl shadow-xl flex flex-col sm:flex-row items-center gap-2.5 focus-within:border-blue-500 transition-colors"
              >
                <div className="flex-1 flex items-center gap-2.5 px-3.5 w-full">
                  <Link2 className="w-5 h-5 text-blue-600 dark:text-indigo-400 shrink-0" />
                  <input
                    type="url"
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                    placeholder="Paste your long URL here (https://...)"
                    className="w-full h-11 text-sm sm:text-base text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 bg-transparent focus:outline-none"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  variant="default"
                  size="default"
                  isLoading={loading}
                  className="w-full sm:w-auto shrink-0 font-bold text-sm px-6 h-11 rounded-xl"
                >
                  <span>Shorten Link</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </form>

              {/* Quick Result Preview */}
              {quickShortened && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-emerald-50 dark:bg-emerald-950/60 backdrop-blur-md border border-emerald-200 dark:border-emerald-500/30 rounded-2xl flex items-center justify-between gap-3 text-left shadow-lg"
                >
                  <div className="min-w-0">
                    <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">
                      Short Link Created:
                    </span>
                    <a
                      href={quickShortened}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm sm:text-base font-bold font-mono text-slate-900 dark:text-white truncate block hover:underline"
                    >
                      {quickShortened}
                    </a>
                  </div>
                  <button
                    onClick={handleCopy}
                    className="p-2.5 rounded-xl bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 hover:bg-slate-50 transition-colors shadow-sm shrink-0 flex items-center gap-1.5 text-xs font-semibold border border-emerald-200 dark:border-emerald-500/30"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </motion.div>
              )}
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2"
            >
              {token ? (
                <Link to="/dashboard">
                  <Button variant="default" size="lg" className="rounded-xl shadow-lg">
                    <BarChart3 className="w-5 h-5" />
                    <span>Go to Analytics Dashboard</span>
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/register">
                    <Button variant="default" size="lg" className="rounded-xl shadow-lg">
                      <span>Create Free Account</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link to="/about">
                    <Button variant="secondary" size="lg" className="rounded-xl">
                      <span>Explore Architecture</span>
                    </Button>
                  </Link>
                </>
              )}
            </motion.div>
          </div>

          {/* Right Column: 3D Holographic Core */}
          <div className="lg:col-span-5 relative">
            <Tilt3DCard className="w-full">
              <div className="rounded-3xl glass-panel p-2 sm:p-3 relative overflow-hidden">
                <Hero3DCanvas />
              </div>
            </Tilt3DCard>
          </div>
        </div>

        {/* Real-time Analytics Preview Strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 sm:mt-20"
        >
          <Tilt3DCard className="w-full">
            <div className="rounded-3xl p-6 sm:p-8 glass-panel text-slate-900 dark:text-white relative overflow-hidden">
              {/* Top Bar */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-200 dark:border-white/5">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block opacity-80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block opacity-80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block opacity-80" />
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400 ml-2">
                    urlshortener.app/telemetry/live
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/40 px-3 py-1 rounded-full">
                  <Activity className="w-3.5 h-3.5 animate-pulse" />
                  <span>+48.2% click traffic</span>
                </div>
              </div>

              {/* Chart & Stats Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-6 items-center">
                <div className="lg:col-span-2 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-blue-600 dark:text-indigo-400" />
                      <span>Live Telemetry Trend (7-Day Sample)</span>
                    </span>
                    <span className="font-mono text-blue-600 dark:text-indigo-300">2,100 Daily Peak</span>
                  </div>
                  <div className="h-44 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={sampleChartData}>
                        <defs>
                          <linearGradient id="heroGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.5} />
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                          </linearGradient>
                        </defs>
                        <XAxis
                          dataKey="day"
                          stroke="#94a3b8"
                          fontSize={11}
                          tickLine={false}
                          axisLine={false}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "var(--bg-surface-solid)",
                            borderColor: "var(--border-subtle)",
                            borderRadius: "12px",
                            fontSize: "12px",
                            color: "var(--text-main)",
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="clicks"
                          stroke="#3b82f6"
                          strokeWidth={2.5}
                          fillOpacity={1}
                          fill="url(#heroGradient)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Quick Metrics Column */}
                <div className="space-y-3">
                  <div className="bg-slate-50 dark:bg-slate-950/60 p-4 rounded-2xl border border-slate-200 dark:border-white/5">
                    <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono">Edge Redirection Speed</span>
                    <p className="text-2xl font-extrabold text-blue-600 dark:text-indigo-300 mt-1 font-mono">~8.4 ms</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-950/60 p-4 rounded-2xl border border-slate-200 dark:border-white/5">
                    <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono">Global Server Uptime</span>
                    <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1 font-mono">99.99%</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-950/60 p-4 rounded-2xl border border-slate-200 dark:border-white/5">
                    <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono">Output Formats</span>
                    <p className="text-2xl font-extrabold text-sky-600 dark:text-sky-400 mt-1 font-mono">Short URL + QR</p>
                  </div>
                </div>
              </div>
            </div>
          </Tilt3DCard>
        </motion.div>
      </section>

      {/* STATS SECTION */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 relative">
        <StatsSection />
      </section>

      {/* 3D INTERACTIVE PLAYGROUND */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 relative">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-indigo-400 bg-blue-50 dark:bg-indigo-950/60 px-3 py-1 rounded-full border border-blue-200 dark:border-indigo-800/60">
            Interactive 3D Engine
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Experience Sub-Millisecond Shortening
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            Test the tokenization algorithm live and watch the high-speed routing pipeline in action.
          </p>
        </div>

        <Url3DCompressorDemo />
      </section>

      {/* 4D TESSERACT HYPER-CORE */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 space-y-5">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-sky-400 bg-blue-50 dark:bg-sky-950/60 px-3 py-1 rounded-full border border-blue-200 dark:border-sky-800/60">
              ⚡ 4D Tesseract Engine
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Hyper-Dimensional <span className="gradient-text-cyan">4D Compression Core</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
              Powered by 4-dimensional hypercube cryptographic hashing. Long URL payloads are compressed through nested contra-rotating quantum frames, ensuring instantaneous redirection with sub-millisecond edge latency.
            </p>
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20 flex items-center justify-center font-mono font-bold text-xs">
                  01
                </div>
                <span>Nested Contra-Rotating 4D Hypercube Wireframes</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                <div className="w-7 h-7 rounded-lg bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-500/20 flex items-center justify-center font-mono font-bold text-xs">
                  02
                </div>
                <span>Dynamic Vertex Connector Rays & Quantum Nano-Core</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 flex items-center justify-center font-mono font-bold text-xs">
                  03
                </div>
                <span>512+ Gbps Real-Time Core Telemetry & Sub-Millisecond Speed</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <Globe3DCanvas />
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="py-20 border-t border-slate-200 dark:border-white/5 px-4 sm:px-6 lg:px-8 z-10 relative">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-indigo-400">
              High Performance Architecture
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Engineered for Speed, Reliability & Precision
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
              Everything you need to optimize links, engage audiences, and make data-driven decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card
              title="Lightning Fast"
              desc="Instant slug generation and ultra low latency HTTP redirects powered by optimized backend infrastructure."
              icon={<Zap className="w-5 h-5" />}
              badge="Speed"
            />
            <Card
              title="Interactive Telemetry"
              desc="Gain crystal-clear insights into click distributions over time with beautiful, interactive visualizations."
              icon={<BarChart3 className="w-5 h-5" />}
              badge="Analytics"
            />
            <Card
              title="Instant QR Codes"
              desc="Generate high-resolution PNG QR codes on the fly for printed marketing, business cards, and events."
              icon={<QrCode className="w-5 h-5" />}
              badge="QR Engine"
            />
            <Card
              title="Enterprise Security"
              desc="End-to-end token authenticated URL management ensuring your destination links remain secure and trustworthy."
              icon={<ShieldCheck className="w-5 h-5" />}
              badge="Protected"
            />
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto z-10 relative">
        <Tilt3DCard>
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 text-white rounded-3xl p-8 sm:p-14 text-center shadow-2xl relative overflow-hidden space-y-6">
            <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Ready to take full control of your links?
              </h2>
              <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
                Join creators and businesses using URL Shortener to shorten, manage, and analyze links with ease.
              </p>

              <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                <Link to="/register">
                  <Button
                    variant="dark"
                    size="lg"
                    className="bg-white text-blue-900 hover:bg-blue-50 font-bold rounded-xl shadow-xl px-8"
                  >
                    <span>Get Started Free</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Tilt3DCard>
      </section>
    </div>
  );
};

export default LandingPage;