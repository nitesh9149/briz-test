import { cn } from "@/lib/utils";
import React, { forwardRef, HTMLAttributes } from "react";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "w-[90%] sm:w-[95%] xl:max-w-[1200px] 2xl:max-w-[1300px] mx-auto",
          className
        )}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = "Container";

export default Container;
