"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

export default function Select({
  label,
  options,
  value,
  onChange,
  placeholder = "Select...",
  error,
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const selected = options.find((option) => option.value === value);

  useEffect(() => {
    if (!open) return;
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div className="flex flex-col gap-1.5" ref={ref}>
      {label && (
        <label className="text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={`flex w-full items-center justify-between gap-2 rounded-control border bg-background px-4 py-2.5 text-left text-base text-foreground transition-colors duration-200 ${
            open
              ? "border-primary ring-4 ring-primary-tint"
              : error
                ? "border-red-400"
                : "border-border hover:border-primary/40"
          }`}
        >
          <span
            className={
              selected ? "text-foreground" : "text-muted-foreground"
            }
          >
            {selected ? selected.label : placeholder}
          </span>
          <ChevronDown
            size={18}
            className={`shrink-0 text-muted-foreground transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        {open && (
          <div className="absolute z-30 mt-2 max-h-64 w-full overflow-y-auto rounded-card border border-border bg-background p-1.5 shadow-lg shadow-foreground/10">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors duration-150 ${
                  option.value === value
                    ? "bg-primary-tint text-primary"
                    : "text-foreground hover:bg-primary-tint"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
