import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '@prisma/client';

/**
 * Task Entity Response DTO
 * Represents a single task in API responses
 */
export class TaskDto {
    @ApiProperty({
        description: 'Unique identifier for the task',
        example: '550e8400-e29b-41d4-a716-446655440000',
    })
    id: string;

    @ApiProperty({
        description: 'Title of the task',
        example: 'Complete project documentation',
    })
    title: string;

    @ApiProperty({
        description: 'Detailed description of the task',
        example: 'Write comprehensive documentation for the API endpoints',
        required: false,
        nullable: true,
    })
    description: string | null;

    @ApiProperty({
        description: 'Current status of the task',
        enum: TaskStatus,
        example: TaskStatus.TODO,
    })
    status: TaskStatus;

    @ApiProperty({
        description: 'Task creation timestamp',
        example: '2025-12-25T15:00:00.000Z',
    })
    createdAt: Date;

    @ApiProperty({
        description: 'Task last update timestamp',
        example: '2025-12-25T16:00:00.000Z',
    })
    updatedAt: Date;
}

/**
 * Single Task Response DTO
 * Wrapper for single task responses
 */
export class TaskResponseDto {
    @ApiProperty({ example: true })
    success: boolean;

    @ApiProperty({ example: 'Request successful' })
    message: string;

    @ApiProperty({ type: TaskDto })
    data: TaskDto;

    @ApiProperty({ example: '2025-12-25T17:00:00.000Z' })
    timestamp: string;
}

/**
 * Task List Response DTO
 * Wrapper for multiple tasks responses
 */
export class TaskListResponseDto {
    @ApiProperty({ example: true })
    success: boolean;

    @ApiProperty({ example: 'Request successful' })
    message: string;

    @ApiProperty({ type: [TaskDto] })
    data: TaskDto[];

    @ApiProperty({ example: '2025-12-25T17:00:00.000Z' })
    timestamp: string;
}

/**
 * Delete Task Response DTO
 * Response for task deletion
 */
export class DeleteTaskResponseDto {
    @ApiProperty({ example: true })
    success: boolean;

    @ApiProperty({ example: 'Resource deleted successfully' })
    message: string;

    @ApiProperty({ type: TaskDto })
    data: TaskDto;

    @ApiProperty({ example: '2025-12-25T17:00:00.000Z' })
    timestamp: string;
}
