import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../modules/global/response.interface';

/**
 * Response Interceptor
 * Automatically formats all successful responses into a standardized structure
 */
@Injectable()
export class ResponseInterceptor<T>
    implements NestInterceptor<T, ApiResponse<T>> {
    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<ApiResponse<T>> {
        const request = context.switchToHttp().getRequest();
        const method = request.method;

        // Generate appropriate success message based on HTTP method
        const getMessage = (): string => {
            switch (method) {
                case 'POST':
                    return 'Resource created successfully';
                case 'PUT':
                case 'PATCH':
                    return 'Resource updated successfully';
                case 'DELETE':
                    return 'Resource deleted successfully';
                case 'GET':
                default:
                    return 'Request successful';
            }
        };

        return next.handle().pipe(
            map((data) => ({
                success: true,
                message: getMessage(),
                data,
                timestamp: new Date().toISOString(),
            })),
        );
    }
}
