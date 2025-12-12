import React from 'react';

const Button = ({ children, onClick, variant = 'primary', isLoading, fullWidth }) => {
  const baseStyles = "py-2 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300",
    secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200",
    danger: "bg-red-50 text-red-600 hover:bg-red-100"
  };

  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''}`}
    >
      {isLoading ? <span className="animate-spin">⏳</span> : children}
    </button>
  );
};

export default Button;
