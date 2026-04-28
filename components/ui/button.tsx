import { cn } from "@/lib/utils";
import { ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import * as React from "react";

export type ButtonVariant =
  | "default"
  | "outline"
  | "ghost"
  | "link"
  | "secondary";
export type ButtonSize = "default" | "sm" | "lg" | "icon";

export interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconPosition?: "start" | "end";
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
  href?: string;
}

export type ButtonAsButton = BaseButtonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps> & {
    href?: never;
  };

export type ButtonAsLink = BaseButtonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseButtonProps> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(
  (
    {
      className,
      variant = "default",
      size = "default",
      icon,
      iconPosition = "end",
      loading = false,
      disabled = false,
      href,
      children,
      ...props
    },
    ref,
  ) => {
    const isLink = typeof href === "string";
    const isDisabled = disabled || loading;

    const baseClasses =
      "group relative inline-flex items-center justify-center overflow-hidden whitespace-nowrap rounded-full font-semibold transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400";

    const variantClasses = {
      default:
        "bg-primary-600 text-white border-2 border-primary-600 shadow-md hover:shadow-lg",
      outline:
        "border-2 border-primary-600 text-primary-600 bg-transparent hover:shadow-lg",
      ghost: "bg-transparent text-primary-600 hover:bg-primary-50/50",
      secondary:
        "bg-secondary-200 text-primary-950 border-2 border-secondary-200 shadow-md hover:shadow-lg",
      link: "text-primary-600 underline-offset-4 hover:underline",
    };

    const sizeClasses = {
      default: "h-12 pl-7 pr-5 py-2 text-sm",
      sm: "h-10 pl-5 pr-3 text-xs",
      lg: "h-14 pl-9 pr-7 text-base",
      icon: "h-12 w-12",
    };

    const disabledClasses =
      "bg-neutral-200 text-neutral-400 border-2 border-neutral-200 cursor-not-allowed shadow-none";

    const irisColors = {
      default: "bg-black/15",
      outline: "bg-primary-600",
      ghost: "bg-primary-100/60",
      secondary: "bg-white/40",
      link: "hidden",
    };

    let renderIcon = icon;
    if (icon === undefined) {
      renderIcon = <ArrowRight className="w-4 h-4" />;
    }
    if (loading) {
      renderIcon = <Loader2 className="w-4 h-4 animate-spin" />;
    }

    const animCurve =
      "transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]";

    const content = (
      <>
        {!isDisabled && variant !== "link" && (
          <span className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden rounded-full">
            <span
              className={cn(
                "h-0 w-0 rounded-full transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:h-100 group-hover:w-100",
                irisColors[variant],
              )}
            />
          </span>
        )}

        <span
          className={cn(
            "relative z-10 flex items-center gap-2",
            variant === "outline" &&
              !isDisabled &&
              "group-hover:text-white transition-colors duration-500",
          )}
        >
          {iconPosition === "start" && renderIcon && (
            <span className="relative flex h-5 w-5 items-center justify-center overflow-hidden">
              <span
                className={cn(
                  "absolute flex items-center justify-center",
                  !isDisabled && `group-hover:translate-x-[-150%] ${animCurve}`,
                )}
              >
                {renderIcon}
              </span>
              <span
                className={cn(
                  "absolute flex items-center justify-center translate-x-[150%]",
                  !isDisabled && `group-hover:translate-x-0 ${animCurve}`,
                )}
              >
                {renderIcon}
              </span>
            </span>
          )}

          {children && (
            <span className="relative block overflow-hidden px-0.5">
              <span
                className={cn(
                  "block",
                  !isDisabled && `group-hover:translate-y-[-120%] ${animCurve}`,
                )}
              >
                {children}
              </span>
              <span
                className={cn(
                  "absolute left-0 top-0 block w-full text-center translate-y-[120%]",
                  !isDisabled && `group-hover:translate-y-0 ${animCurve}`,
                )}
              >
                {children}
              </span>
            </span>
          )}

          {iconPosition === "end" && renderIcon && (
            <span className="relative flex h-5 w-5 items-center justify-center overflow-hidden">
              <span
                className={cn(
                  "absolute flex items-center justify-center",
                  !isDisabled && `group-hover:translate-x-[150%] ${animCurve}`,
                )}
              >
                {renderIcon}
              </span>
              <span
                className={cn(
                  "absolute flex items-center justify-center translate-x-[-150%]",
                  !isDisabled && `group-hover:translate-x-0 ${animCurve}`,
                )}
              >
                {renderIcon}
              </span>
            </span>
          )}
        </span>
      </>
    );

    const mergedClasses = cn(
      baseClasses,
      isDisabled
        ? disabledClasses
        : `${variantClasses[variant]} active:scale-[0.96]`,
      sizeClasses[size],
      className,
    );

    if (isLink && !isDisabled) {
      return (
        <Link
          href={href as string}
          ref={ref as React.ForwardedRef<HTMLAnchorElement>}
          className={mergedClasses}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref as React.ForwardedRef<HTMLButtonElement>}
        className={mergedClasses}
        disabled={isDisabled}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {content}
      </button>
    );
  },
);
Button.displayName = "Button";

export { Button };
