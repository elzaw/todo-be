import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from '../global/prismaService';


@Injectable()
export class TaskService {

  constructor(private prisma: PrismaService) { }

  create(createTaskDto: CreateTaskDto) {
    return this.prisma.task.create({ data: createTaskDto });
  }

  findAll() {
    return this.prisma.task.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async findOne(id: string) {
    const exists = await this.prisma.task.findUnique({ where: { id } });
    if (!exists) {
      throw new NotFoundException('Task not found');
    }
    return exists;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const exists = await this.prisma.task.findUnique({ where: { id } });
    if (!exists) {
      throw new NotFoundException('Task not found');
    }
    return this.prisma.task.update({ where: { id }, data: updateTaskDto });
  }

  async remove(id: string) {
    const exists = await this.prisma.task.findUnique({ where: { id } });
    if (!exists) {
      throw new NotFoundException('Task not found');
    }
    return this.prisma.task.delete({ where: { id } });
  }
}
