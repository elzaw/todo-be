/**
 * Generic API Response Interface
 * Used to standardize all successful API responses
 */
export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
    timestamp: string;
}

/**
 * API Error Response Interface
 * Used to standardize all error responses
 */
export interface ApiErrorResponse {
    success: boolean;
    message: string;
    error?: string;
    statusCode: number;
    timestamp: string;
    path?: string;
}
