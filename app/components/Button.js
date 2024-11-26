import React from 'react';

export default function Button({
  onClick,
  children,
  className = "",
  type = "button",
  ...props
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition-all ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
