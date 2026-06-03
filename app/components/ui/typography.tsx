import { cn } from "@/lib/utils";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

function HeadingH1({ as: Tag = "h1", className, ...props }: HeadingProps) {
  return (
    <Tag
      className={cn(
        "text-[3.2rem] md:text-[4rem] font-bold tracking-[-0.03em] leading-14 md:leading-18",
        className
      )}
      {...props}
    />
  );
}

function HeadingH2({ as: Tag = "h2", className, ...props }: HeadingProps) {
  return (
    <Tag
      className={cn(
        "text-5xl font-bold tracking-[-0.03em] leading-14",
        className
      )}
      {...props}
    />
  );
}

function HeadingH3({ as: Tag = "h3", className, ...props }: HeadingProps) {
  return (
    <Tag
      className={cn(
        "text-[2.5rem] font-bold tracking-[-0.02em] leading-12",
        className
      )}
      {...props}
    />
  );
}

function HeadingH4({ as: Tag = "h4", className, ...props }: HeadingProps) {
  return (
    <Tag
      className={cn(
        "text-[2rem] font-bold tracking-[-0.03em] leading-10",
        className
      )}
      {...props}
    />
  );
}

function HeadingH5({ as: Tag = "h5", className, ...props }: HeadingProps) {
  return (
    <Tag
      className={cn(
        "text-2xl font-bold tracking-[-0.03em] leading-8",
        className
      )}
      {...props}
    />
  );
}

function HeadingH6({ as: Tag = "h6", className, ...props }: HeadingProps) {
  return (
    <Tag
      className={cn(
        "text-xl font-bold tracking-[-0.03em] leading-7",
        className
      )}
      {...props}
    />
  );
}

interface TextProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
}

function TextXsmall({ as: Tag = "p", className, ...props }: TextProps) {
  return (
    <Tag
      className={cn("text-xs font-medium tracking-normal leading-4", className)}
      {...props}
    />
  );
}

function TextSmall({ as: Tag = "p", className, ...props }: TextProps) {
  return (
    <Tag
      className={cn("text-sm font-medium tracking-normal leading-5", className)}
      {...props}
    />
  );
}
function TextDefault({ as: Tag = "p", className, ...props }: TextProps) {
  return (
    <Tag
      className={cn(
        "text-base font-medium tracking-normal leading-6",
        className
      )}
      {...props}
    />
  );
}
function TextMedium({ as: Tag = "p", className, ...props }: TextProps) {
  return (
    <Tag
      className={cn("text-lg font-medium tracking-normal leading-6", className)}
      {...props}
    />
  );
}

function TextLarge({ as: Tag = "p", className, ...props }: TextProps) {
  return (
    <Tag
      className={cn("text-xl font-medium tracking-normal leading-7", className)}
      {...props}
    />
  );
}

function TextXlarge({ as: Tag = "p", className, ...props }: TextProps) {
  return (
    <Tag
      className={cn(
        "text-2xl font-medium tracking-normal leading-8",
        className
      )}
      {...props}
    />
  );
}

export {
  HeadingH1,
  HeadingH2,
  HeadingH3,
  HeadingH4,
  HeadingH5,
  HeadingH6,
  TextXsmall,
  TextSmall,
  TextDefault,
  TextMedium,
  TextLarge,
  TextXlarge,
};
