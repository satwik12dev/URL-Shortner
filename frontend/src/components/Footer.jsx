import React from "react";
import { Link } from "react-router-dom";
import {
  Link2,
  ShieldCheck,
  Zap,
  Heart,
} from "lucide-react";
import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-100/80 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-white/5 pt-16 pb-12 transition-colors duration-250">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-200 dark:border-slate-800/80">
          {/* Col 1: Brand */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-500 flex items-center justify-center text-white shadow-md shadow-blue-500/25">
                <Link2 className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                URL<span className="text-blue-600 dark:text-indigo-400">Shortener</span>
              </span>
            </Link>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed">
              The modern link management and analytics platform. Shorten URLs,
              track detailed audience insights, generate instant QR codes, and
              scale your digital presence.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-700 dark:text-emerald-400 font-medium bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 w-fit px-3 py-1 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>All Systems Operational (99.9% Uptime)</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 font-mono">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-blue-600 dark:hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-600 dark:hover:text-white transition-colors">
                  About Platform
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-blue-600 dark:hover:text-white transition-colors">
                  Analytics Dashboard
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-blue-600 dark:hover:text-white transition-colors">
                  Create Free Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Features */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 font-mono">
              Features
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-blue-600 dark:text-indigo-400" />
                <span>Instant Shortening</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-purple-400" />
                <span>High-Speed Redirects</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-sky-600 dark:text-pink-400" />
                <span>Recharts Visualizations</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>QR Code Generation</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} URL Shortener. Built for modern creators & teams.</p>
          <div className="flex items-center space-x-6">
            <a href="#" className="hover:text-blue-600 dark:hover:text-slate-300 transition-colors">
              <FaTwitter size={16} />
            </a>
            <a href="#" className="hover:text-blue-600 dark:hover:text-slate-300 transition-colors">
              <FaGithub size={16} />
            </a>
            <a href="#" className="hover:text-blue-600 dark:hover:text-slate-300 transition-colors">
              <FaLinkedin size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;