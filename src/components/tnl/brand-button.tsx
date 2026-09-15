"use client";

import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost" | "white" | "dark";

const variants: Record<Variant, string> = {
  primary:
    "text-white bg-gradient-to-r from-royal via-[#3b6df0] to-sky shadow-glow hover:shadow-[0_22px_60px_-12px_rgba(56,102,243,0.6)] hover:-translate-y-0.5",
  outline:
    "text-royal border border-primary/30 bg-white/70 hover:bg-primary/5 hover:border-primary/50",
  ghost: "text-foreground hover:bg-accent",
  white:
    "text-royal bg-white hover:bg-white/90 shadow-soft hover:-translate-y-0.5",
  dark: "text-white bg-gradient-to-r from-navy to-royal hover:-translate-y-0.5 shadow-soft",
};

const sizes = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-13 px-8 text-base md:h-14",
};

type CommonProps = {
  variant?: Variant;
  size?: keyof typeof sizes;
  className?: string;
  children: React.ReactNode;
};

type ButtonProps = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

type AnchorProps = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children">;

export function BrandButton(props: ButtonProps | AnchorProps) {
  const {
    variant = "primary",
    size = "md",
    className,
    children,
    ...rest
  } = props as ButtonProps & AnchorProps;

  const isLink = (props as AnchorProps).href !== undefined;
  const Comp = isLink ? "a" : "button";

  return (
    <Comp
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2",
        sizes[size],
        variants[variant],
        className
      )}
      {...rest}
    >
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
      {variant === "primary" && (
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      )}
    </Comp>
  );
}
