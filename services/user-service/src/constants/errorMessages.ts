export const ERROR_MESSAGES = {
  // Validation
  VALIDATION_FAILED: "Validation failed",
  INVALID_INPUT: "Invalid input data",
  
  // 400 Bad Request
  BAD_REQUEST: "Invalid request",
  INVALID_EMAIL: "Invalid email format",
  INVALID_DATE: "Invalid date format",
  
  // 401 Unauthorized
  UNAUTHORIZED: "Authentication required",
  INVALID_TOKEN: "Invalid authentication token",
  TOKEN_EXPIRED: "Session expired",
  
  // 403 Forbidden
  FORBIDDEN: "Permission denied",
  ADMIN_ONLY: "Admin access required",
  
  // 404 Not Found
  USER_NOT_FOUND: "User not found",
  RESOURCE_NOT_FOUND: "Resource not found",
  
  // 409 Conflict
  CONFLICT: "Data conflict occurred",
  DUPLICATE_EMAIL: "Email already exists",
  DUPLICATE_USERNAME: "Username already exists",
  DUPLICATE_PHONE_NUMBER: "Phone number already exists",
  
  // 500 Server Error
  SERVER_ERROR: "Internal server error",
  DB_ERROR: "Database operation failed"
} as const;