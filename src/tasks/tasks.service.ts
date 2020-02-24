import { Injectable, NotFoundException } from '@nestjs/common';
// import { Task, TaskStatus } from './tasks.model';
import * as uuid from 'uuid/v1';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetFilterTaskDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
 
@Injectable()
export class TasksService {

    //--------------------------------------------------- Start API with Database ---------------------------------------------------//

    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ) { }

    async getTaskById(id : number) :Promise<Task> {
        const found = await this.taskRepository.findOne(id);

        if(!found){
            throw new NotFoundException(`Task with id "${id}" not found`);
        }

        return found;
    }

    async createTask(createTaskDto : CreateTaskDto) : Promise<Task>{
        return this.taskRepository.createTask(createTaskDto);
    }

    async deleteTask(id : number) :Promise<void> {
        
        const result = this.taskRepository.delete(id);

        if((await result).affected == 0){
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }
    }
 

    //--------------------------------------------------- Finish API with Database ---------------------------------------------------//


    //--------------------------------------------------- Start API with array ---------------------------------------------------//

    // private tasks : Task[] = [];

    // getAllTasks(): Task[]{
    //     return this.tasks;
    // }

    // getTaskWithFilters(filterDto : GetFilterTaskDto): Task[]{
    //     const { status , search } = filterDto;
    //     let tasks = this.getAllTasks();
    //     if(status){
    //         tasks = tasks.filter((task) => task.status === status);
    //     }

    //     if(search){
    //         tasks = tasks.filter(task =>
    //             task.title.includes(search) || 
    //             task.description.includes(search)
    //         );
    //     }
    //     return tasks;
    // }

    // getTaskById(id : string):Task{
    //     const found =  this.tasks.find((task) => task.id === id);

        // if(!found){
        //     throw new NotFoundException(`Task with id "${id}" not found`);
        // }

    //     return found;
    // }

    // createTask(createTaskDto : CreateTaskDto) : Task{

    //     const {title , description} = createTaskDto;

    //     const task: Task = {
    //         id : uuid(),
    //         title,
    //         description,
    //         status : TaskStatus.OPEN
    //     }
    //     this.tasks.push(task);
    //     return task;
    // }

    // deleteTask(id : string): void{
    //     const found = this.getTaskById(id);
    //     this.tasks = this.tasks.filter((task) => task.id != found.id); 
    // } 

    // updateTask(id : string , taskStatus : TaskStatus): Task{
    //     const task = this.getTaskById(id);
    //     task.status = taskStatus;
    //     return task;
    // }

    //--------------------------------------------------- Finish API with array ---------------------------------------------------//

}
