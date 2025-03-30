import React from "react";

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

export default function Button({
  onClick,
  disabled = false,
  className = "",
  children,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 bg-gray-200 rounded transition-colors ${
        disabled ? "opacity-50" : "hover:bg-gray-300"
      } ${className}`}
    >
      {children}
    </button>
  );
}
