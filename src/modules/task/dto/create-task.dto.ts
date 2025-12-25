import { TaskStatus } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';


export class CreateTaskDto {

    @ApiProperty({ description: 'Task title', minLength: 3, example: 'Complete project documentation' })
    @IsString()
    @MinLength(3)
    @IsNotEmpty()
    title: string;

    @ApiPropertyOptional({ description: 'Task description', example: 'Write comprehensive API documentation' })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiPropertyOptional({ description: 'Task status', enum: TaskStatus, default: TaskStatus.TODO })
    @IsEnum(TaskStatus)
    @IsOptional()
    status?: TaskStatus;
}
