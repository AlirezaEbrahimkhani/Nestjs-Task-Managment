import { Injectable, NotFoundException } from '@nestjs/common';
// import { Task, TaskStatus } from './tasks.model';
import * as uuid from 'uuid/v1';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetFilterTaskDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { User } from 'src/auth/user.entity';
 
@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ) { }

    async getTasks(filterDto : GetFilterTaskDto , user : User) : Promise<Task[]> {
        return this.taskRepository.getTasks(filterDto , user);
    }

    async getTaskById(id : number) :Promise<Task> {
        const found = await this.taskRepository.findOne(id);

        if(!found){
            throw new NotFoundException(`Task with id "${id}" not found`);
        }

        return found;
    }

    async createTask(createTaskDto : CreateTaskDto , user : User) : Promise<Task>{
        return this.taskRepository.createTask(createTaskDto , user);
    }

    async deleteTask(id : number) :Promise<void> {

        const result = this.taskRepository.delete(id);

        if((await result).affected == 0){
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }
    }

    async updateTaskSatus(id : number , status : TaskStatus) : Promise<Task>{

        const task = this.getTaskById(id);
        (await task).status = status;
        (await task).save();

        return task;

    }

}
