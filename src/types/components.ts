import React from "react";
import { Enquiry, ContactMessage } from "./index";

export interface EnquiryModalProps {
  enquiry: Enquiry | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusUpdate: (id: number, newStatus: string) => void;
}

export interface MessageModalProps {
  message: ContactMessage | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusUpdate: (id: number, newStatus: string) => void;
}

export interface LoadingButtonProps {
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

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  loadingText?: string;
  icon?: React.ComponentType<{ className?: string }>;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ComponentType<{ className?: string }>;
  iconPosition?: "left" | "right";
  helperText?: string;
  endAdornment?: React.ReactNode;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  placeholder?: string;
}

export interface ParsedOption {
  value: string;
  label: string;
}


export interface PageLoaderProps {
  message?: string;
  fullScreen?: boolean;
}
