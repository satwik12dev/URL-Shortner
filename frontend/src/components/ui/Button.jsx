import React from "react";
import { cn } from "../../utils/cn";
import { Loader2 } from "lucide-react";
import { triggerAnimeRipple } from "../../utils/animeAnimations";

export const Button = React.forwardRef(
  (
    {
      className,
      variant = "default",
      size = "default",
      isLoading = false,
      children,
      disabled,
      type = "button",
      onClick,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "relative overflow-hidden inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#07090e] disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]";

    const variants = {
      default:
        "bg-gradient-to-r from-indigo-600 via-indigo-500 to-sky-500 text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/35 hover:brightness-110 border border-white/15 focus:ring-indigo-500",
      secondary:
        "bg-slate-800/80 text-slate-200 hover:bg-slate-700/80 hover:text-white border border-slate-700/60 shadow-sm focus:ring-slate-500 backdrop-blur-md",
      outline:
        "bg-transparent border border-indigo-500/50 text-indigo-300 hover:bg-indigo-500/10 hover:border-indigo-400 focus:ring-indigo-500",
      ghost:
        "bg-transparent text-slate-300 hover:text-white hover:bg-white/5 focus:ring-slate-500",
      danger:
        "bg-gradient-to-r from-rose-600 to-rose-700 text-white shadow-md shadow-rose-900/30 hover:brightness-110 border border-rose-500/20 focus:ring-rose-500",
      dark: "bg-white text-slate-950 hover:bg-slate-100 shadow-lg shadow-white/5 font-bold focus:ring-slate-300",
    };

    const sizes = {
      sm: "h-9 px-3.5 text-xs gap-1.5",
      default: "h-11 px-5 text-sm gap-2",
      lg: "h-12 px-6 text-sm sm:text-base font-bold gap-2.5",
      icon: "h-10 w-10 p-0",
    };

    const handleClick = (e) => {
      triggerAnimeRipple(
        e,
        variant === "secondary" || variant === "ghost"
          ? "rgba(255, 255, 255, 0.15)"
          : "rgba(255, 255, 255, 0.35)"
      );
      if (onClick) {
        onClick(e);
      }
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        onClick={handleClick}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-current" />
            <span>{children}</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
