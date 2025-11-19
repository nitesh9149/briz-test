import { cn } from "@/lib/utils";
import React from "react";

export interface FormGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  className?: string;
}

export default function FormGroup({
  as: Tag = "div",
  className,
  ...props
}: FormGroupProps) {
  return <Tag className={cn("flex flex-col gap-y-1.5", className)} {...props} />;
}
