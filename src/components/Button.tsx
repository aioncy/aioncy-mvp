import React from "react";

type ButtonVariant = "primary" | "secondary" | "dark" | "purple" | "disabled";
type ButtonSize = "default" | "small" | "full";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-utility-yellow text-neutral-black hover:bg-[#F2F250] active:scale-[0.97] shadow-md hover:shadow-lg",
  secondary:
    "bg-white text-neutral-black hover:bg-neutral-offwhite active:scale-[0.97] shadow-md hover:shadow-lg",
  dark: "bg-neutral-black text-white hover:bg-neutral-darkgrey active:scale-[0.97]",
  purple:
    "bg-aioncy text-white hover:bg-utility-bluishpurple active:scale-[0.98] shadow-md shadow-aioncy/10",
  disabled: "bg-neutral-offwhite text-[#8C8C8C] cursor-not-allowed",
};

const sizeStyles: Record<ButtonSize, string> = {
  default: "h-12 px-5",
  small: "h-10 px-4.5",
  full: "w-full h-12",
};

export default function Button({
  variant = "primary",
  size = "default",
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const isDisabled = variant === "disabled" || disabled;

  return (
    <button
      disabled={isDisabled}
      className={`
        inline-flex items-center justify-center gap-2.5
        rounded-md css-misc--button
        transition-all duration-200
        ${isDisabled ? "cursor-not-allowed" : "cursor-pointer"}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
