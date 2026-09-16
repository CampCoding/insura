"use client";

import { useId, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function Input({
  label,
  id,
  type = "text",
  error,
  className = "",
  ...props
}) {
  const generatedId = useId();
  const inputId = id || generatedId;
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const resolvedType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-foreground"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={inputId}
          type={resolvedType}
          className={`w-full rounded-control border bg-background px-4 py-2.5 text-base text-foreground outline-none transition-colors duration-200 placeholder:text-muted-foreground hover:border-primary/40 focus:border-primary focus:ring-4 focus:ring-primary-tint disabled:cursor-not-allowed disabled:opacity-50 ${
            isPassword ? "pr-11" : ""
          } ${
            error
              ? "border-red-400 focus:border-red-400 focus:ring-red-500/15"
              : "border-border"
          } ${className}`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            tabIndex={-1}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-primary"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
