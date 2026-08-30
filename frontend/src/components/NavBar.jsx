import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useStoreContext } from "../contextApi/ContextApi";
import Button from "./ui/Button";
import {
  Menu,
  X,
  LayoutDashboard,
  Info,
  Home,
  LogOut,
  ArrowRight,
  Zap,
  Sun,
  Moon,
} from "lucide-react";
import toast from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken, theme, toggleTheme } = useStoreContext();
  const location = useLocation();
  const path = location.pathname;
  const [navbarOpen, setNavbarOpen] = useState(false);

  const onLogOutHandler = () => {
    setToken(null);
    localStorage.removeItem("JWT_TOKEN");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const navLinks = [
    { name: "Home", path: "/", icon: <Home className="w-4 h-4" /> },
    { name: "Architecture", path: "/about", icon: <Info className="w-4 h-4" /> },
    ...(token
      ? [
          {
            name: "Dashboard",
            path: "/dashboard",
            icon: <LayoutDashboard className="w-4 h-4" />,
          },
        ]
      : []),
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 dark:bg-[#07090e]/80 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/5 text-slate-800 dark:text-slate-100 transition-all duration-250">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group focus:outline-none"
        >
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-500 border border-white/20 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <Zap className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-1">
              URL<span className="text-blue-600 dark:text-indigo-400">Shortener</span>
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100 dark:bg-slate-900/60 p-1.5 rounded-xl border border-slate-200/80 dark:border-white/5 shadow-inner">
          {navLinks.map((item) => {
            const isActive = path === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-white dark:bg-indigo-600/30 text-blue-600 dark:text-indigo-300 border border-slate-200/80 dark:border-indigo-500/30 shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/5"
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Actions & Theme Switcher */}
        <div className="hidden md:flex items-center gap-2.5">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 border border-slate-200/80 dark:border-white/5 transition-all duration-200"
            title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
            aria-label="Toggle theme mode"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-amber-400 animate-in spin-in-180 duration-300" />
            ) : (
              <Moon className="w-4 h-4 text-blue-600 animate-in spin-in-180 duration-300" />
            )}
          </button>

          {token ? (
            <div className="flex items-center gap-3">
              <Button
                variant="danger"
                size="sm"
                onClick={onLogOutHandler}
                className="rounded-xl font-semibold"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="ghost" size="sm" className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="default" size="sm">
                  <span>Get Started</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu and theme toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-blue-600" />
            )}
          </button>

          <button
            onClick={() => setNavbarOpen(!navbarOpen)}
            className="p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
            aria-label="Toggle navigation"
          >
            {navbarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {navbarOpen && (
        <div className="md:hidden bg-white/95 dark:bg-[#0a0e17]/95 backdrop-blur-2xl border-b border-slate-200 dark:border-white/10 px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-1">
            {navLinks.map((item) => {
              const isActive = path === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setNavbarOpen(false)}
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-blue-50 dark:bg-indigo-600/20 text-blue-600 dark:text-indigo-300 font-semibold border border-blue-200 dark:border-indigo-500/30"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5"
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-white/5 flex flex-col gap-2">
            {token ? (
              <Button
                variant="danger"
                onClick={() => {
                  setNavbarOpen(false);
                  onLogOutHandler();
                }}
                className="w-full justify-center"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </Button>
            ) : (
              <>
                <Link to="/login" onClick={() => setNavbarOpen(false)}>
                  <Button variant="secondary" className="w-full justify-center">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setNavbarOpen(false)}>
                  <Button variant="default" className="w-full justify-center">
                    <span>Get Started</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;