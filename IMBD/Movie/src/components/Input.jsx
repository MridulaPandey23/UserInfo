import React from "react";

export const Input = ({ name, value, onChange, placeholder, className = "" }) => {
  return (
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 ${className}`}
    />
  );
};
