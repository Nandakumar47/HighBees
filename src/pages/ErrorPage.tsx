import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button/Button";
// import { getStoredError, clearStoredError } from "../utils/errorHandler";

interface ErrorPageProps {
  error?: Error;
  resetError?: () => void;
  isNotFound?: boolean;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ isNotFound = true }) => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <div className="mx-auto h-24 w-24 text-red-500">
            <svg
              className="h-full w-full"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            {isNotFound ? "Page Not Found" : "Oops! Something went wrong"}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isNotFound
              ? "The page you're looking for doesn't exist."
              : "We encountered an unexpected error. Don't worry, our team has been notified."}
          </p>
        </div>

        <div className="space-y-4">
          <Button
            onClick={handleGoHome}
            variant="primary"
            size="lg"
            className="w-full"
          >
            Go to Home
          </Button>

          <Button
            onClick={handleRefresh}
            variant="secondary"
            size="lg"
            className="w-full"
          >
            Try Again
          </Button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Need help?{" "}
            <a
              href="/contact"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
