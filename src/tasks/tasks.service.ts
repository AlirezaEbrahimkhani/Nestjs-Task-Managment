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

    async getTaskById(id : number , user : User) :Promise<Task> {

        const found = await this.taskRepository.findOne({ where : { id , userId: user.id } });

        if(!found){
            throw new NotFoundException(`Task with id "${id}" not found`);
        }

        return found;
    }

    async createTask(createTaskDto : CreateTaskDto , user : User) : Promise<Task>{
        return this.taskRepository.createTask(createTaskDto , user);
    }

    async deleteTask(id : number , user : User) :Promise<void> {

        const result = this.taskRepository.delete({ id , userId : user.id });

        if((await result).affected == 0){
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }
    }

    async updateTaskSatus(id : number , status : TaskStatus , user : User) : Promise<Task>{

        const task = this.getTaskById(id , user);
        (await task).status = status;
        (await task).save();

        return task;

    }

}
