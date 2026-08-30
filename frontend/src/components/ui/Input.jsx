import React from "react";
import { cn } from "../../utils/cn";

export const Input = React.forwardRef(
  ({ className, type = "text", error, leftIcon, rightIcon, ...props }, ref) => {
    return (
      <div className="relative w-full">
        {leftIcon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none flex items-center justify-center">
            {leftIcon}
          </div>
        )}
        <input
          type={type}
          ref={ref}
          className={cn(
            "flex h-11 w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-2 text-sm text-slate-800 placeholder:text-slate-400 backdrop-blur-sm transition-all duration-200",
            "focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15 focus:bg-white",
            "disabled:cursor-not-allowed disabled:opacity-50",
            leftIcon && "pl-11",
            rightIcon && "pr-11",
            error && "border-rose-500 focus:border-rose-500 focus:ring-rose-500/15",
            className
          )}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 flex items-center justify-center">
            {rightIcon}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
