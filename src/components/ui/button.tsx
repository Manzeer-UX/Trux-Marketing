import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
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
