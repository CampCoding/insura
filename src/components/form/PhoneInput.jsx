"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { COUNTRIES, COUNTRY_BY_ISO } from "@/lib/countries";

const MAX_VISIBLE = 60;

function parseValue(value, defaultCountry) {
  if (!value) return { iso: defaultCountry, digits: "" };
  const raw = value.replace(/^\+/, "");
  const match = COUNTRIES
    .filter((c) => raw.startsWith(c.dialCode))
    .sort((a, b) => b.dialCode.length - a.dialCode.length)[0];
  if (!match) return { iso: defaultCountry, digits: raw };
  return { iso: match.iso, digits: raw.slice(match.dialCode.length) };
}

export default function PhoneInput({
  label,
  value,
  onChange,
  error,
  defaultCountry = "EG",
  placeholder = "Phone number",
}) {
  const [iso, setIso] = useState(
    () => parseValue(value, defaultCountry).iso
  );
  const [digits, setDigits] = useState(
    () => parseValue(value, defaultCountry).digits
  );
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef(null);

  const country = COUNTRY_BY_ISO[iso] ?? COUNTRY_BY_ISO.EG;

  useEffect(() => {
    if (!open) return;
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
        setSearch("");
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return COUNTRIES;
    return COUNTRIES.filter(
      (c) => c.name.toLowerCase().includes(q) || c.dialCode.includes(q)
    );
  }, [search]);

  const visibleCountries = useMemo(
    () => filtered.slice(0, MAX_VISIBLE),
    [filtered]
  );

  const emit = (nextIso, nextDigits) => {
    if (!onChange) return;
    const dialCode = COUNTRY_BY_ISO[nextIso]?.dialCode;
    onChange(nextDigits ? `+${dialCode}${nextDigits}` : "");
  };

  const selectCountry = (c) => {
    setIso(c.iso);
    setOpen(false);
    setSearch("");
    emit(c.iso, digits);
  };

  const handleDigitsChange = (e) => {
    const next = e.target.value.replace(/\D/g, "");
    setDigits(next);
    emit(iso, next);
  };

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <div
        ref={ref}
        className={`relative flex items-center rounded-control border bg-background transition-colors duration-200 ${
          open
            ? "border-primary ring-4 ring-primary-tint"
            : error
              ? "border-red-400"
              : "border-border hover:border-primary/40"
        }`}
      >
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex shrink-0 items-center gap-1.5 py-2.5 pr-2 pl-4 text-base text-foreground"
        >
          <span className={`fi fi-${country.iso.toLowerCase()} text-lg rounded-xs`} />
          <span className="text-sm text-muted-foreground">
            +{country.dialCode}
          </span>
          <ChevronDown
            size={14}
            className={`text-muted-foreground transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        <span className="h-5 w-px bg-border" />

        <input
          type="tel"
          inputMode="numeric"
          value={digits}
          onChange={handleDigitsChange}
          placeholder={placeholder}
          className="w-full min-w-0 flex-1 bg-transparent px-3 py-2.5 text-base text-foreground outline-none placeholder:text-muted-foreground"
        />

        {open && (
          <div className="absolute top-full left-0 z-30 mt-2 w-72 overflow-hidden rounded-card border border-border bg-background shadow-lg shadow-foreground/10">
            <div className="flex items-center gap-2 border-b border-border px-3 py-2">
              <Search size={15} className="shrink-0 text-muted-foreground" />
              <input
                autoFocus
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search country"
                className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
            </div>
            <div className="max-h-60 overflow-y-auto p-1.5">
              {visibleCountries.map((c) => (
                <button
                  key={c.iso}
                  type="button"
                  onClick={() => selectCountry(c)}
                  className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-colors duration-150 ${
                    c.iso === iso
                      ? "bg-primary-tint text-primary"
                      : "text-foreground hover:bg-primary-tint"
                  }`}
                >
                  <span className={`fi fi-${c.iso.toLowerCase()} text-base rounded-xs`} />
                  <span className="flex-1 truncate">{c.name}</span>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    +{c.dialCode}
                  </span>
                </button>
              ))}
              {filtered.length === 0 && (
                <p className="px-3 py-4 text-center text-sm text-muted-foreground">
                  No matches
                </p>
              )}
              {filtered.length > MAX_VISIBLE && (
                <p className="px-3 pt-1 pb-0.5 text-center text-xs text-muted-foreground">
                  Showing {MAX_VISIBLE} of {filtered.length}, keep typing to narrow down
                </p>
              )}
            </div>
          </div>
        )}
      </div>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
