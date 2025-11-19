import { cn } from "@/lib/utils";
import React, { forwardRef } from "react";
import { FieldError } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { placeholder, type = "text", id, className, error, ...props },
    ref
  ) => {
    return (
      <>
        <input
          id={id}
          ref={ref}
          type={type}
          placeholder={placeholder}
          className={cn(
            "h-12 p-3 md:px-3 md:py-2.5 rounded-xl border border-outline text-base focus-within:border-primary outline-none bg-surface-bright placeholder:text-on-surface leading-6 tracking-wide",
            error && "border-red-400 focus-within:border-red-400",
            className
          )}
          {...props}
        />

        {error && (
          <span
            id={`error${id}`}
            className="text-red-400 text-base"
            role="alert"
          >
            {error.message}
          </span>
        )}
      </>
    );
  }
);

Input.displayName = "Input";

export { Input };
