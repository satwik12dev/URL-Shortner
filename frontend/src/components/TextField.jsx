import React from "react";
import { cn } from "../utils/cn";
import { AlertCircle } from "lucide-react";

const TextField = ({
  label,
  id,
  type = "text",
  errors,
  register,
  required,
  message,
  className,
  min,
  value,
  placeholder,
  leftIcon,
  rightIcon,
}) => {
  const errorMessage = errors?.[id]?.message;

  return (
    <div className="flex flex-col gap-1.5 w-full text-left">
      {label && (
        <label
          htmlFor={id}
          className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center justify-between font-mono"
        >
          <span>{label}</span>
          {required && <span className="text-rose-500 font-bold">*</span>}
        </label>
      )}

      <div className="relative w-full">
        {leftIcon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-400 pointer-events-none flex items-center justify-center">
            {leftIcon}
          </div>
        )}

        <input
          type={type}
          id={id}
          placeholder={placeholder}
          className={cn(
            "flex h-11 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950/80 px-4 py-2 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-sm backdrop-blur-sm transition-all duration-200",
            "focus:outline-none focus:border-blue-600 dark:focus:border-indigo-500 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-indigo-500/20 focus:bg-white dark:focus:bg-slate-900",
            "disabled:cursor-not-allowed disabled:opacity-50",
            leftIcon && "pl-11",
            rightIcon && "pr-11",
            errorMessage && "border-rose-500 focus:border-rose-500 focus:ring-rose-500/20 bg-rose-50/50 dark:bg-rose-950/20",
            className
          )}
          {...register(id, {
            required: { value: required, message },
            minLength: min
              ? { value: min, message: `Minimum ${min} characters required` }
              : null,
            pattern:
              type === "email"
                ? {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  }
                : type === "url"
                ? {
                    value:
                      /^(https?:\/\/)?(([a-zA-Z0-9\u00a1-\uffff-]+\.)+[a-zA-Z\u00a1-\uffff]{2,})(:\d{2,5})?(\/[^\s]*)?$/,
                    message: "Please enter a valid URL",
                  }
                : null,
          })}
        />

        {rightIcon && (
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 flex items-center justify-center">
            {rightIcon}
          </div>
        )}
      </div>

      {errorMessage && (
        <p className="flex items-center gap-1 text-xs font-medium text-rose-500 mt-0.5">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{errorMessage}</span>
        </p>
      )}
    </div>
  );
};

export default TextField;