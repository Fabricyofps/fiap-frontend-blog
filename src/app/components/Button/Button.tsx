"use client";

import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
  iconPosition?: "left" | "right";
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
  iconPosition = "left",
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
  relative
  disabled:opacity-60
  disabled:cursor-not-allowed
  rounded-lg
  transition-all
  flex items-center justify-center gap-2
  ${outline ? "bg-white hover:bg-gray-100" : "bg-rose-500 hover:bg-rose-600"}
  ${outline ? "border-gray-300" : "border-rose-500"}
  ${outline ? "text-gray-800" : "text-white"}
  ${
    small
      ? "py-1 px-3 text-sm font-light border"
      : "py-3 px-6 text-md font-semibold border-2"
  }
`}
    >
      {Icon && iconPosition === "left" && <Icon size={24} />}
      <span>{label}</span>
      {Icon && iconPosition === "right" && <Icon size={24} />}
    </button>
  );
};

export default Button;
