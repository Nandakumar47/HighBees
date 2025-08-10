import React from "react";
import Button from "./common/Button/Button";

interface LoadingButtonProps {
  children: React.ReactNode;
  isLoading?: boolean;
  loadingText?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  children,
  isLoading = false,
  loadingText,
  variant = "primary",
  size = "md",
  className = "",
  icon,
  iconPosition = "left",
  fullWidth = false,
  ...props
}) => {
  return (
    <Button
      variant={variant}
      size={size}
      isLoading={isLoading}
      loadingText={loadingText}
      className={className}
      icon={icon}
      iconPosition={iconPosition}
      fullWidth={fullWidth}
      {...props}
    >
      {children}
    </Button>
  );
};

export default LoadingButton;
