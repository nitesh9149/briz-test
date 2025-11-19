import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { FieldError } from "react-hook-form";

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: FieldError;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ placeholder, id, className, error, ...props }, ref) => {
    return (
      <textarea
        id={id}
        ref={ref}
        placeholder={placeholder}
        className={cn(
          "p-3 min-h-[8rem] resize-none rounded-xl border border-outline focus-within:border-primary outline-none bg-surface-bright placeholder:text-on-surface leading-6",
          error && "border-red-400 focus-within:border-red-400",
          className
        )}
        {...props}
      />
    );
  }
);

TextArea.displayName = "TextArea";
