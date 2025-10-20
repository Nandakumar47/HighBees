# API Error Handling Implementation

## Overview

This document describes the comprehensive error handling system implemented for the High Bees Holidays application. The system provides user-friendly error messages through toast notifications for all API call failures.

## Components Added

### 1. Toast Notification System (`src/components/common/Toast/Toast.tsx`)

A React context-based toast notification system using Material-UI components:

- **ToastProvider**: Context provider that manages toast state
- **useToast**: Hook for displaying toast notifications
- **Features**:
  - Success, Error, Warning, and Info toast types
  - Auto-hide after 6 seconds
  - Positioned at top-right of screen
  - Filled variant for better visibility

### 2. API Error Handler (`src/utils/apiErrorHandler.ts`)

Utility functions for handling and formatting API errors:

- **getErrorMessage**: Converts various error types to user-friendly messages
- **isNetworkError**: Detects network connectivity issues
- **isServerError**: Identifies server-side errors (5xx status codes)
- **isClientError**: Identifies client-side errors (4xx status codes)

## Error Message Strategy

### Network Errors

- **Message**: "Unable to connect to the server. Please check your internet connection and try again."
- **When**: No response received from server

### HTTP Status Code Based Messages

| Status Code | User Message                                                        |
| ----------- | ------------------------------------------------------------------- |
| 400         | "Invalid request. Please check your input and try again."           |
| 401         | "You are not authorized to perform this action."                    |
| 403         | "Access denied. You do not have permission to perform this action." |
| 404         | "The requested resource was not found."                             |
| 409         | "A conflict occurred. The resource may already exist."              |
| 422         | "Invalid data provided. Please check your input and try again."     |
| 429         | "Too many requests. Please wait a moment and try again."            |
| 500         | "Server error occurred. Please try again later."                    |
| 502         | "Service temporarily unavailable. Please try again later."          |
| 503         | "Service is currently unavailable. Please try again later."         |

### Fallback Messages

- **Server Response**: Uses error message from API response if available
- **Generic Error**: "An unexpected error occurred. Please try again later."

## Implementation Details

### Files Modified

1. **App.tsx**

   - Added ToastProvider wrapper around the entire application
   - Ensures toast notifications are available globally

2. **Contact.tsx**

   - Added error handling for contact form submission
   - Shows success toast on successful submission
   - Shows error toast on API failure

3. **Enquiry.tsx**

   - Added error handling for travel enquiry submission
   - Added error handling for destination data loading (non-critical)
   - Shows success toast on successful enquiry submission
   - Shows error toast on API failure

4. **Destinations.tsx**

   - Added error handling for destination data loading
   - Shows error toast if destinations fail to load

5. **FeaturedDestinations.tsx**

   - Added error handling for featured destinations loading
   - Added error handling for reload functionality
   - Shows error toast on API failures

6. **DestinationDetail.tsx**

   - Added error handling for individual destination data loading
   - Shows error toast if destination details fail to load

7. **Newsletter.tsx**
   - Added error handling for newsletter subscription
   - Shows success/error toast based on subscription result

## Usage Examples

### Basic Toast Usage

```typescript
import { useToast } from "../components/common/Toast/Toast";

const MyComponent = () => {
  const { showSuccess, showError, showWarning, showInfo } = useToast();

  const handleApiCall = async () => {
    try {
      const response = await apiCall();
      showSuccess("Operation completed successfully!");
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      showError(errorMessage);
    }
  };
};
```

### Error Handling in API Calls

```typescript
import { getErrorMessage } from "../utils/apiErrorHandler";

const fetchData = async () => {
  try {
    const response = await axios.get("/api/data");
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    const userMessage = getErrorMessage(error);
    showError(userMessage);
    throw error; // Re-throw if needed for component state management
  }
};
```

## Benefits

1. **User Experience**: Users receive clear, actionable error messages instead of technical jargon
2. **Consistency**: All API errors are handled uniformly across the application
3. **Accessibility**: Toast notifications are properly announced to screen readers
4. **Maintainability**: Centralized error handling logic makes updates easier
5. **Debugging**: Original errors are still logged to console for developers

## Best Practices

1. **Always show user-friendly messages**: Never expose technical error details to users
2. **Log original errors**: Keep console.error() for debugging purposes
3. **Handle loading states**: Ensure loading indicators are properly cleared on errors
4. **Provide actionable messages**: Tell users what they can do to resolve the issue
5. **Use appropriate toast types**: Success for positive actions, Error for failures, Warning for potential issues

## Future Enhancements

1. **Retry functionality**: Add retry buttons for failed network requests
2. **Offline detection**: Show different messages when user is offline
3. **Error reporting**: Integrate with error tracking services
4. **Customizable timeouts**: Allow different auto-hide durations for different message types
5. **Queue management**: Handle multiple simultaneous toast notifications

## Testing

To test the error handling system:

1. **Network errors**: Disconnect internet and attempt API calls
2. **Server errors**: Use browser dev tools to simulate 5xx responses
3. **Client errors**: Submit invalid data to trigger 4xx responses
4. **Success cases**: Verify success toasts appear for successful operations

The error handling system ensures that users always receive appropriate feedback for their actions, improving the overall user experience of the High Bees Holidays application.
