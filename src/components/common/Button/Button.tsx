import React from "react";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  loadingText?: string;
  icon?: React.ComponentType<{ className?: string }>;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  loadingText,
  icon: Icon,
  iconPosition = "left",
  fullWidth = false,
  className = "",
  disabled,
  ...props
}) => {
  const baseClasses =
    "font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed";

  const variantClasses = {
    primary:
      "bg-primary-500 hover:bg-primary-600 disabled:bg-primary-300 text-white focus:ring-primary-500 shadow-sm hover:shadow-md",
    secondary:
      "bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 text-white focus:ring-gray-500 shadow-sm hover:shadow-md",
    outline:
      "border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white disabled:border-gray-300 disabled:text-gray-300 focus:ring-primary-500 shadow-sm hover:shadow-md",
    ghost:
      "text-primary-500 hover:bg-primary-50 disabled:text-gray-300 focus:ring-primary-500",
    danger:
      "bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white focus:ring-red-500 shadow-sm hover:shadow-md",
  };

  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3",
    lg: "px-6 py-4 text-lg",
  };

  const widthClass = fullWidth ? "w-full" : "";

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`;

  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={combinedClasses}
      aria-busy={isLoading}
    >
      {isLoading ? (
        <>
          <LoadingSpinner size="sm" color="white" />
          <span className="whitespace-nowrap">
            {loadingText || "Loading..."}
          </span>
        </>
      ) : (
        <>
          {Icon && iconPosition === "left" && (
            <Icon className="w-5 h-5 flex-shrink-0" />
          )}
          <span className="whitespace-nowrap">{children}</span>
          {Icon && iconPosition === "right" && (
            <Icon className="w-5 h-5 flex-shrink-0" />
          )}
        </>
      )}
    </button>
  );
};

export default Button;
