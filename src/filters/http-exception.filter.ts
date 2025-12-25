import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiErrorResponse } from '../modules/global/response.interface';

/**
 * Global Exception Filter
 * Catches all HTTP exceptions and formats them into a standardized error response
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        const exceptionResponse = exception.getResponse();

        // Extract error message from exception
        const message =
            typeof exceptionResponse === 'string'
                ? exceptionResponse
                : (exceptionResponse as any).message || 'An error occurred';

        const errorResponse: ApiErrorResponse = {
            success: false,
            message: Array.isArray(message) ? message[0] : message,
            error:
                typeof exceptionResponse === 'object'
                    ? (exceptionResponse as any).error
                    : undefined,
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
        };

        response.status(status).json(errorResponse);
    }
}

/**
 * Global Exception Filter for all errors
 * Catches any unhandled exceptions and formats them
 */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        const message =
            exception instanceof HttpException
                ? exception.message
                : 'Internal server error';

        const errorResponse: ApiErrorResponse = {
            success: false,
            message,
            error: exception instanceof Error ? exception.name : 'Error',
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
        };

        response.status(status).json(errorResponse);
    }
}
