import type { ReactNode } from "react";
import { HeadingH2, TextLarge } from "./ui/typography";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  className?: string;
  title: ReactNode;
  titlePrimary: ReactNode;
  description?: ReactNode;
};

function SectionHeader({
  title,
  titlePrimary,
  description,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("text-center space-y-7", className)}>
      <HeadingH2 className="text-center">
        {title} <span className="text-primary">{titlePrimary}</span>
      </HeadingH2>
      {description && <TextLarge>{description}</TextLarge>}
    </div>
  );
}
export { SectionHeader };
