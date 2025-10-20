import { AxiosError } from "axios";

export interface ApiErrorResponse {
  message?: string;
  error?: string;
  details?: string;
}

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    // Axios error
    if ("isAxiosError" in error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;

      // Network error
      if (!axiosError.response) {
        return "Unable to connect to the server. Please check your internet connection and try again.";
      }

      // Server responded with error status
      const status = axiosError.response.status;
      const responseData = axiosError.response.data;

      // Try to get error message from response
      if (responseData?.message) {
        return responseData.message;
      }

      if (responseData?.error) {
        return responseData.error;
      }

      if (responseData?.details) {
        return responseData.details;
      }

      // Fallback messages based on status codes
      switch (status) {
        case 400:
          return "Invalid request. Please check your input and try again.";
        case 401:
          return "You are not authorized to perform this action.";
        case 403:
          return "Access denied. You do not have permission to perform this action.";
        case 404:
          return "The requested resource was not found.";
        case 409:
          return "A conflict occurred. The resource may already exist.";
        case 422:
          return "Invalid data provided. Please check your input and try again.";
        case 429:
          return "Too many requests. Please wait a moment and try again.";
        case 500:
          return "Server error occurred. Please try again later.";
        case 502:
          return "Service temporarily unavailable. Please try again later.";
        case 503:
          return "Service is currently unavailable. Please try again later.";
        default:
          return "An unexpected error occurred. Please try again later.";
      }
    }

    // Generic error
    return (
      error.message || "An unexpected error occurred. Please try again later."
    );
  }

  // Unknown error type
  return "An unexpected error occurred. Please try again later.";
};

export const isNetworkError = (error: unknown): boolean => {
  if (error instanceof Error && "isAxiosError" in error) {
    const axiosError = error as AxiosError;
    return !axiosError.response;
  }
  return false;
};

export const isServerError = (error: unknown): boolean => {
  if (error instanceof Error && "isAxiosError" in error) {
    const axiosError = error as AxiosError;
    return axiosError.response?.status
      ? axiosError.response.status >= 500
      : false;
  }
  return false;
};

export const isClientError = (error: unknown): boolean => {
  if (error instanceof Error && "isAxiosError" in error) {
    const axiosError = error as AxiosError;
    return axiosError.response?.status
      ? axiosError.response.status >= 400 && axiosError.response.status < 500
      : false;
  }
  return false;
};
