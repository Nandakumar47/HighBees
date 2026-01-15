import React from "react";
import Button from "./common/Button/Button";

import { LoadingButtonProps } from "../types/components";

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
