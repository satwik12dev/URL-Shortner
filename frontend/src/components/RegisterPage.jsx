import React, { useState } from "react";
import { useForm } from "react-hook-form";
import TextField from "./TextField";
import Button from "./ui/Button";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import toast from "react-hot-toast";
import Background3DCanvas from "./3d/Background3DCanvas";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
  TrendingUp,
  Globe2,
  Sparkles,
  LockKeyhole,
} from "lucide-react";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  const registerHandler = async (data) => {
    setLoader(true);
    try {
      await api.post("/api/auth/public/register", data);
      
      // Trigger smooth verification sequence
      setIsSuccess(true);
      setLoader(false);
      reset();

      setTimeout(() => {
        navigate("/login");
      }, 1600);
    } catch (error) {
      console.error(error);
      const msg =
        error?.response?.data?.message ||
        "Registration failed. Please check your details and try again.";
      toast.error(msg);
      setLoader(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] w-full flex items-stretch relative overflow-hidden bg-slate-50 dark:bg-[#07090e] transition-colors duration-300">
      <Background3DCanvas />

      {/* Atmospheric Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/10 dark:bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-sky-500/10 dark:bg-purple-600/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-64px)] z-10 relative">
        
        {/* LEFT COLUMN: Feature Showcase & Value Props */}
        <div className="hidden lg:flex lg:col-span-7 flex-col justify-between p-12 xl:p-16 relative">
          <div className="space-y-8 max-w-xl">
            {/* Live Indicator Badge */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-indigo-950/70 border border-blue-200 dark:border-indigo-500/30 text-blue-700 dark:text-indigo-300 text-xs font-semibold shadow-sm backdrop-blur-md"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-indigo-400" />
              <span>Join 10,000+ Creators & Marketing Teams</span>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-3"
            >
              <h1 className="text-4xl xl:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]">
                Start Shortening & Scaling with <span className="gradient-text-accent">Zero Friction</span>
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
                Create branded short links, download instant vector QR codes, and monitor audience traffic with sub-millisecond precision.
              </p>
            </motion.div>

            {/* Interactive Stat Cards Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-2 gap-4 pt-2"
            >
              <div className="glass-panel p-5 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Links Shortened
                  </span>
                  <TrendingUp className="w-4 h-4 text-blue-600 dark:text-indigo-400" />
                </div>
                <p className="text-2xl font-extrabold font-mono text-slate-900 dark:text-white">12.8M+</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Processed worldwide</p>
              </div>

              <div className="glass-panel p-5 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Bharat Edge CDN
                  </span>
                  <Globe2 className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                </div>
                <p className="text-2xl font-extrabold font-mono text-slate-900 dark:text-white">Pan-India</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">NIXI Direct Optical Peering</p>
              </div>
            </motion.div>

            {/* Benefit Bullets */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-3 pt-2"
            >
              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Unlimited free short link generation</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Deep click telemetry analytics with exportable charts</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Zero advertisements and no credit card required</span>
              </div>
            </motion.div>
          </div>

          {/* Bottom Security Guarantee */}
          <div className="pt-8 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-white/5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>256-Bit SSL Encrypted Session • 100% Free Forever</span>
          </div>
        </div>

        {/* RIGHT COLUMN: Modern Register Form / Smooth Verification State */}
        <div className="lg:col-span-5 flex items-center justify-center p-6 sm:p-10 lg:p-12">
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.div
                key="register-form"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, y: -15 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-md glass-panel p-8 sm:p-10 rounded-3xl shadow-2xl space-y-6 relative"
              >
                {/* Header */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/25">
                      <Zap className="w-5 h-5" />
                    </div>
                    <span className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-1">
                      URL<span className="text-blue-600 dark:text-indigo-400">Shortener</span>
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    Create an Account
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                    Sign up in seconds to start generating trackable links.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(registerHandler)} className="space-y-4">
                  <TextField
                    label="Username"
                    required
                    id="username"
                    type="text"
                    message="Username is required"
                    placeholder="Choose a username"
                    leftIcon={<User className="w-4 h-4" />}
                    register={register}
                    errors={errors}
                  />

                  <TextField
                    label="Email"
                    required
                    id="email"
                    type="email"
                    message="Valid email address is required"
                    placeholder="name@example.com"
                    leftIcon={<Mail className="w-4 h-4" />}
                    register={register}
                    errors={errors}
                  />

                  <div className="relative">
                    <TextField
                      label="Password"
                      required
                      id="password"
                      type={showPassword ? "text" : "password"}
                      message="Password is required (min 6 characters)"
                      placeholder="••••••••"
                      leftIcon={<Lock className="w-4 h-4" />}
                      register={register}
                      min={6}
                      errors={errors}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-[38px] text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors p-1"
                      title={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <div className="pt-2">
                    <Button
                      disabled={loader}
                      isLoading={loader}
                      type="submit"
                      variant="default"
                      className="w-full h-11 text-sm font-bold rounded-xl shadow-lg shadow-blue-600/25"
                    >
                      <span>Create Free Account</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </form>

                {/* Bottom Login Switch */}
                <div className="pt-4 border-t border-slate-200 dark:border-white/5 text-center space-y-2">
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="font-bold text-blue-600 dark:text-indigo-400 hover:underline underline-offset-4"
                    >
                      Sign In
                    </Link>
                  </p>
                </div>
              </motion.div>
            ) : (
              /* Smooth Apple-style Morphing Success Sequence */
              <motion.div
                key="register-success"
                initial={{ opacity: 0, scale: 0.92, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-md glass-panel p-8 sm:p-10 rounded-3xl shadow-2xl space-y-6 text-center border border-blue-500/30 dark:border-emerald-500/30 relative overflow-hidden"
              >
                {/* Soft Radiant Aura */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-40 bg-emerald-500/20 dark:bg-emerald-400/15 rounded-full blur-3xl pointer-events-none" />

                {/* Animated Draw Checkmark */}
                <div className="relative mx-auto w-20 h-20 flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="w-20 h-20 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border-2 border-emerald-500/60 flex items-center justify-center shadow-xl shadow-emerald-500/20"
                  >
                    <svg
                      className="w-10 h-10 text-emerald-600 dark:text-emerald-400"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <motion.path
                        d="M20 6L9 17l-5-5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
                      />
                    </svg>
                  </motion.div>
                </div>

                {/* Status Texts */}
                <div className="space-y-1.5">
                  <motion.h3
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.4 }}
                    className="text-2xl font-extrabold text-slate-900 dark:text-white"
                  >
                    Account Created!
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.35, duration: 0.4 }}
                    className="text-xs sm:text-sm text-slate-600 dark:text-slate-400"
                  >
                    Your profile is ready. Redirecting you to sign in...
                  </motion.p>
                </div>

                {/* Step Indicators */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                  className="bg-slate-50/80 dark:bg-slate-900/80 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 space-y-2.5 text-left text-xs text-slate-700 dark:text-slate-300 font-mono"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <LockKeyhole className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Security Credentials</span>
                    </span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">Stored ✓</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Globe2 className="w-3.5 h-3.5 text-blue-500" />
                      <span>Workspace Ready</span>
                    </span>
                    <span className="text-blue-600 dark:text-blue-400 font-bold">Active ✓</span>
                  </div>
                </motion.div>

                {/* Progress Bar Animation */}
                <div className="w-full bg-slate-200/80 dark:bg-slate-800/80 rounded-full h-1.5 overflow-hidden">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.4, ease: "easeInOut" }}
                    className="h-full bg-gradient-to-r from-blue-600 via-emerald-500 to-teal-400 rounded-full"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default RegisterPage;