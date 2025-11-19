import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";
import Link from "next/link";
import { ComponentType, forwardRef, ReactNode } from "react";

const buttonVariants = cva(
  "inline-flex text-on-surface-variant group relative rounded-xl outline-none gap-x-2 items-center justify-center disabled:cursor-not-allowed cursor-pointer flex-shrink-0",
  {
    variants: {
      intent: {
        primary: "bg-primary hover:bg-surface-tint text-on-primary",
        neutralAccent: "bg-surface hover:bg-surface-hover",
        neutralAccentLight:
          "bg-surface-container hover:bg-surface-hover border border-outline",
      },
      size: {
        1: "text-12 font-medium px-2.5 py-2",
        2: "text-base font-semibold px-5 py-3",
        3: "font-semibold text-lg px-7 h-14",
        4: "rounded-5 font-medium text-16 px-12 py-3.5",
      },
      disabled: {
        true: "disabled:opacity-60 disabled:cursor-not-allowed",
      },
    },
    defaultVariants: {
      intent: "primary",
      size: 2,
    },
  }
);

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

interface BaseButtonProps extends Omit<ButtonVariantProps, "disabled"> {
  asChild?: boolean;
  iconStart?: ComponentType;
  iconEnd?: ComponentType;
  iconStartClassName?: string;
  iconEndClassName?: string;
  disabledAndLoading?: boolean;
  children?: ReactNode;
  disabled?: boolean;
}

interface StandardButtonProps
  extends BaseButtonProps,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: never;
  target?: never;
}

interface LinkButtonProps
  extends BaseButtonProps,
    React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  onClick?: never;
}

type ButtonProps = StandardButtonProps | LinkButtonProps;

const isLinkButton = (props: ButtonProps) => {
  return "href" in props && props.href !== undefined;
};

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (props, ref) => {
    const {
      asChild = false,
      iconStart: IconStart,
      iconEnd: IconEnd,
      disabled = false,
      intent,
      size,
      iconEndClassName,
      iconStartClassName,
      className,
      children,
      ...restProps
    } = props;

    const Comp = asChild ? Slot : "button";
    const iconSize = "size-4";

    if (isLinkButton(props)) {
      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={disabled ? "" : props.href}
          target={props.target}
          aria-disabled={disabled}
          tabIndex={disabled ? -1 : undefined}
          className={cn(
            buttonVariants({
              intent,
              size,
              disabled,
            }),
            className
          )}
        >
          {IconStart && (
            <span className={cn(iconSize, iconStartClassName)} aria-hidden>
              <IconStart />
            </span>
          )}
          {children}
          {IconEnd && (
            <span className={cn(iconSize, iconEndClassName)} aria-hidden>
              <IconEnd />
            </span>
          )}
        </Link>
      );
    }

    return (
      <Comp
        {...(restProps as StandardButtonProps)}
        ref={ref as React.Ref<HTMLButtonElement>}
        type={props.type || "button"}
        disabled={disabled}
        className={cn(
          buttonVariants({
            intent,
            size,
            disabled,
          }),
          className
        )}
      >
        {IconStart && (
          <span className={cn(iconSize, iconStartClassName)} aria-hidden>
            <IconStart />
          </span>
        )}
        {children}
        {IconEnd && (
          <span className={cn(iconSize, iconEndClassName)} aria-hidden>
            <IconEnd />
          </span>
        )}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button };
