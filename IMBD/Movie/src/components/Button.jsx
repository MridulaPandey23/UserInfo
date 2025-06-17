import React from "react";

export const Button = ({ children, onClick, className = "", size = "md", variant = "primary" }) => {
  const baseStyle =
    "rounded-md font-medium focus:outline-none transition duration-200";
  const sizeStyle = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg",
  }[size];

  const variantStyle = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700",
    danger: "bg-red-500 text-white hover:bg-red-600",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
  }[variant];

  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${sizeStyle} ${variantStyle} ${className}`}
    >
      {children}
    </button>
  );
};
