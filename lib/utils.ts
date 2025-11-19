import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...input: ClassValue[]) {
  return twMerge(clsx(input));
}

export { cn };
