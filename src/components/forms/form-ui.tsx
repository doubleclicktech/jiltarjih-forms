"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";
import { STEPS } from "./form-types";

// ─── Input helpers ────────────────────────────────────────────────────────────

const inputBase =
  "w-full bg-surface-container-high border rounded-xl px-4 py-3 text-right " +
  "outline-none transition-all placeholder:text-on-surface-variant/60 text-on-surface text-base";

const inputNormal = "border-outline focus:border-primary focus:ring-2 focus:ring-primary/30";
const inputError  = "border-error focus:border-error focus:ring-2 focus:ring-error/20 bg-error/5";

export function inputCls(hasError?: boolean) {
  return cn(inputBase, hasError ? inputError : inputNormal);
}

// ─── Atoms ────────────────────────────────────────────────────────────────────

export function FieldError({ error }: { error?: string }) {
  if (!error) return null;
  return (
    <p className="flex items-center gap-1.5 mt-1.5 text-xs text-error font-medium" role="alert">
      <span className="material-symbols-outlined text-sm flex-shrink-0" style={{ fontVariationSettings: '"FILL" 1' }}>
        error
      </span>
      {error}
    </p>
  );
}

export function Label({ children, htmlFor, required }: { children: React.ReactNode; htmlFor?: string; required?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-on-surface-variant mb-1.5 text-right">
      {children}
      {required && <span className="text-error mr-1" aria-hidden>*</span>}
    </label>
  );
}

export function Field({
  label, required, children, error,
}: {
  label: string; required?: boolean; children: React.ReactNode; error?: string;
}) {
  const id = useId();
  return (
    <div>
      <Label htmlFor={id} required={required}>{label}</Label>
      {/* Pass the id down via clone trick — children receive it if they spread props */}
      <div id={`${id}-wrap`}>{children}</div>
      <FieldError error={error} />
    </div>
  );
}

export function TextInput({
  value, onChange, placeholder, required, inputMode, type = "text", hasError, id,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  type?: string;
  hasError?: boolean;
  id?: string;
}) {
  return (
    <input
      id={id}
      type={type}
      className={inputCls(hasError)}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      inputMode={inputMode}
      aria-invalid={hasError ? true : undefined}
      dir="rtl"
    />
  );
}

export function Textarea({
  value, onChange, placeholder, rows = 3, hasError, id,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
  hasError?: boolean;
  id?: string;
}) {
  return (
    <textarea
      id={id}
      className={cn(inputCls(hasError), "resize-none leading-relaxed")}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      aria-invalid={hasError ? true : undefined}
      dir="rtl"
    />
  );
}

// ─── RadioCards — accessible with native <input type="radio"> ────────────────

export function RadioCards({
  options, value, onChange, hasError, legend,
}: {
  options: { value: string; label: string; sub?: string }[];
  value: string;
  onChange: (v: string) => void;
  hasError?: boolean;
  legend?: string;
}) {
  const name = useId();
  return (
    <fieldset
      className={cn(
        "flex flex-wrap gap-2 transition-all border-0 p-0 m-0",
        hasError && "p-2 rounded-xl ring-1 ring-error bg-error/5"
      )}
    >
      {legend && <legend className="sr-only">{legend}</legend>}
      {options.map(opt => (
        <label
          key={opt.value}
          className={cn(
            "flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm transition-all cursor-pointer text-right select-none",
            value === opt.value
              ? "border-2 border-primary bg-primary/10 text-primary font-semibold"
              : "border border-outline-variant hover:border-primary/60 hover:bg-primary/5 text-on-surface"
          )}
        >
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
            className="sr-only"
          />
          <span
            className={cn(
              "w-4 h-4 rounded-full border-2 flex-shrink-0 transition-all",
              value === opt.value ? "border-primary bg-primary" : "border-outline"
            )}
            aria-hidden
          />
          {opt.label}
          {opt.sub && <span className="text-xs text-on-surface-variant">({opt.sub})</span>}
        </label>
      ))}
    </fieldset>
  );
}

// ─── CheckboxChips — accessible with native <input type="checkbox"> ──────────

export function CheckboxChips({
  options, value, onChange, otherValue, onOtherChange,
}: {
  options: string[];
  value: string[];
  onChange: (v: string[]) => void;
  otherValue?: string;
  onOtherChange?: (v: string) => void;
}) {
  const baseId = useId();
  const toggle = (opt: string) =>
    onChange(value.includes(opt) ? value.filter(x => x !== opt) : [...value, opt]);

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt, idx) => {
        const checked = value.includes(opt);
        return (
          <label
            key={opt}
            htmlFor={`${baseId}-${idx}`}
            className={cn(
              "flex items-center gap-1.5 px-3 py-2 rounded-full border text-sm transition-all cursor-pointer select-none",
              checked
                ? "border-2 border-primary bg-primary/10 text-primary font-medium"
                : "border border-outline-variant hover:border-primary/50 hover:bg-primary/5 text-on-surface"
            )}
          >
            <input
              type="checkbox"
              id={`${baseId}-${idx}`}
              checked={checked}
              onChange={() => toggle(opt)}
              className="sr-only"
            />
            {checked && (
              <span
                className="material-symbols-outlined text-sm"
                style={{ fontVariationSettings: '"FILL" 1, "wght" 600' }}
                aria-hidden
              >
                check
              </span>
            )}
            {opt}
          </label>
        );
      })}
      {onOtherChange !== undefined && (
        <input
          type="text"
          className="px-3 py-2 rounded-full border border-dashed border-outline bg-surface-container-high text-on-surface text-sm outline-none focus:border-primary transition-all placeholder:text-on-surface-variant/60 text-right min-w-[120px]"
          placeholder="أخرى..."
          value={otherValue ?? ""}
          onChange={e => onOtherChange(e.target.value)}
          dir="rtl"
        />
      )}
    </div>
  );
}

// ─── Layout helpers ───────────────────────────────────────────────────────────

export function SectionTitle({ icon, title, sub }: { icon?: string; title: string; sub?: string }) {
  return (
    <div className="flex items-center gap-3 mb-6 text-right">
      {icon && (
        <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center flex-shrink-0">
          <span
            className="material-symbols-outlined text-primary text-xl"
            style={{ fontVariationSettings: '"FILL" 1' }}
          >
            {icon}
          </span>
        </div>
      )}
      <div>
        <h3 className="font-h3 text-lg text-on-surface">{title}</h3>
        {sub && <p className="text-sm text-on-surface-variant mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

export function Divider({ label }: { label?: string }) {
  if (!label) return <hr className="border-outline-variant my-6" />;
  return (
    <div className="flex items-center gap-3 my-6">
      <hr className="flex-1 border-outline-variant" />
      <span className="text-xs text-on-surface-variant px-2 bg-surface-container-lowest">{label}</span>
      <hr className="flex-1 border-outline-variant" />
    </div>
  );
}

// ─── Step Progress ────────────────────────────────────────────────────────────

export function StepProgress({ current, steps = STEPS }: { current: number; steps?: typeof STEPS }) {
  return (
    <nav aria-label="مراحل الاستمارة" className="mb-8">
      <ol className="flex items-center justify-between gap-1">
        {steps.map(step => {
          const done   = step.id < current;
          const active = step.id === current;
          return (
            <li key={step.id} className="flex flex-col items-center gap-1 flex-1 min-w-0">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 text-xs font-bold",
                  done   ? "bg-primary border-primary text-on-primary"
                  : active ? "bg-primary/10 border-primary text-primary"
                  :          "bg-surface-container border-outline-variant text-on-surface-variant"
                )}
                aria-current={active ? "step" : undefined}
              >
                {done
                  ? <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: '"FILL" 1' }} aria-hidden>check</span>
                  : step.id}
              </div>
              <span className={cn(
                "text-[10px] text-center leading-tight hidden sm:block truncate w-full px-1",
                active ? "text-primary font-semibold" : "text-on-surface-variant"
              )}>
                {step.title}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
