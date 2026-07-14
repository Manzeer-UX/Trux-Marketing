import { cva, type VariantProps } from "class-variance-authority";
import Link, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        amber: "bg-amber text-midnight hover:bg-amber/90",
        blue: "bg-trux-blue text-white hover:bg-trux-blue/90",
        ghost: "bg-transparent text-off-white hover:bg-white/10",
      },
      size: {
        sm: "px-4 text-sm",
        md: "px-5 text-sm",
        lg: "px-6 text-base",
      },
    },
    defaultVariants: { variant: "amber", size: "md" },
  },
);

export interface ButtonProps
  extends
    ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export interface ButtonLinkProps<RouteType>
  extends
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">,
    VariantProps<typeof buttonVariants> {
  href: LinkProps<RouteType>["href"];
}

export function Button({
  className,
  variant,
  size,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export function ButtonLink<RouteType>({
  className,
  variant,
  size,
  href,
  ...props
}: ButtonLinkProps<RouteType>) {
  return (
    <Link
      href={href}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
