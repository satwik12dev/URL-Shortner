import React from "react";
import { cn } from "../../utils/cn";

export const Badge = ({
  className,
  variant = "default",
  children,
  ...props
}) => {
  const variants = {
    default: "bg-indigo-50 text-indigo-700 border-indigo-200/80",
    success: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
    warning: "bg-amber-50 text-amber-700 border-amber-200/80",
    danger: "bg-rose-50 text-rose-700 border-rose-200/80",
    neutral: "bg-slate-100 text-slate-700 border-slate-200",
    gradient: "bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 text-indigo-700 border-indigo-200/60",
    dark: "bg-slate-800 text-slate-200 border-slate-700",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border transition-colors",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
