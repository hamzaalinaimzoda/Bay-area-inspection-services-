import { forwardRef, type ReactNode, type InputHTMLAttributes, type SelectHTMLAttributes, type TextareaHTMLAttributes } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { cn } from "@/lib/utils";

/** Form building blocks for the full booking page. Styling matches the booking modal. */

const control =
  "w-full rounded-lg border bg-white px-3.5 py-2.5 text-[15px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition";

export function FormSection({
  step,
  title,
  description,
  children,
}: {
  step: number;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <fieldset className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 min-w-0">
      <legend className="sr-only">{title}</legend>
      <div className="flex items-start gap-4 mb-6">
        <span
          aria-hidden="true"
          className="flex-shrink-0 w-9 h-9 rounded-full bg-primary text-white font-bold flex items-center justify-center tabular-nums"
        >
          {step}
        </span>
        <div>
          <h2 className="text-xl font-bold text-gray-900 leading-tight">{title}</h2>
          {description && <p className="text-sm text-gray-600 mt-1 leading-relaxed">{description}</p>}
        </div>
      </div>
      <div className="grid gap-5">{children}</div>
    </fieldset>
  );
}

export function Field({
  label,
  htmlFor,
  required,
  hint,
  error,
  children,
  className,
}: {
  label: string;
  htmlFor?: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("min-w-0", className)}>
      <label htmlFor={htmlFor} className="block text-sm font-semibold text-gray-800 mb-1.5">
        {label}
        {required ? (
          <span className="text-secondary ml-0.5" aria-hidden="true">*</span>
        ) : (
          <span className="font-normal text-gray-500 ml-1">(optional)</span>
        )}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-gray-500 mt-1.5">{hint}</p>}
      {error && (
        <p className="text-xs font-medium text-red-600 mt-1.5" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export const TextInput = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }>(
  function TextInput({ invalid, className, ...props }, ref) {
    return (
      <input
        ref={ref}
        aria-invalid={invalid || undefined}
        className={cn(control, invalid ? "border-red-400" : "border-gray-300", className)}
        {...props}
      />
    );
  },
);

export const SelectInput = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement> & { invalid?: boolean }>(
  function SelectInput({ invalid, className, children, ...props }, ref) {
    return (
      <select
        ref={ref}
        aria-invalid={invalid || undefined}
        className={cn(control, invalid ? "border-red-400" : "border-gray-300", className)}
        {...props}
      >
        {children}
      </select>
    );
  },
);

export const TextArea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  function TextArea({ className, ...props }, ref) {
    return <textarea ref={ref} className={cn(control, "border-gray-300 resize-y min-h-[96px]", className)} {...props} />;
  },
);

/**
 * A group of native radio buttons styled as selectable cards. Native inputs keep
 * keyboard navigation, focus-on-error and screen-reader semantics for free.
 */
export function ChoiceGroup({
  name,
  legend,
  options,
  register,
  value,
  required,
  error,
  columns = "sm:grid-cols-3",
}: {
  name: string;
  legend: string;
  options: readonly (string | { value: string; label: string; sub?: string })[];
  register: UseFormRegisterReturn;
  value: string | null | undefined;
  required?: boolean;
  error?: string;
  columns?: string;
}) {
  return (
    <div role="radiogroup" aria-labelledby={`${name}-legend`} className="min-w-0">
      <p id={`${name}-legend`} className="block text-sm font-semibold text-gray-800 mb-1.5">
        {legend}
        {required ? (
          <span className="text-secondary ml-0.5" aria-hidden="true">*</span>
        ) : (
          <span className="font-normal text-gray-500 ml-1">(optional)</span>
        )}
      </p>
      <div className={cn("grid grid-cols-2 gap-2", columns)}>
        {options.map((o) => {
          const v = typeof o === "string" ? o : o.value;
          const label = typeof o === "string" ? o : o.label;
          const sub = typeof o === "string" ? undefined : o.sub;
          const checked = value === v;
          return (
            <label
              key={v}
              className={cn(
                "relative flex flex-col justify-center rounded-lg border-2 px-3 py-2.5 text-sm cursor-pointer transition-colors",
                "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary/40",
                checked ? "border-primary bg-primary/5 text-primary" : "border-gray-200 text-gray-700 hover:border-gray-300",
              )}
            >
              <input type="radio" value={v} className="sr-only" {...register} />
              <span className="font-semibold leading-snug">{label}</span>
              {sub && <span className="text-xs opacity-75 mt-0.5">{sub}</span>}
            </label>
          );
        })}
      </div>
      {error && (
        <p className="text-xs font-medium text-red-600 mt-1.5" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
