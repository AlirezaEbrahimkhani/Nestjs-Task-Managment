import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import * as uuid from 'uuid/v1';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetFilterTaskDto } from './dto/get-tasks-filter.dto';
 
@Injectable()
export class TasksService {

    private tasks : Task[] = [];

    getAllTasks(): Task[]{
        return this.tasks;
    }

    getTaskWithFilters(filterDto : GetFilterTaskDto): Task[]{
        const { status , search } = filterDto;
        let tasks = this.getAllTasks();
        if(status){
            tasks = tasks.filter((task) => task.status === status);
        }

        if(search){
            tasks = tasks.filter(task =>
                task.title.includes(search) || 
                task.description.includes(search)
            );
        }
        return tasks;
    }

    getTaskById(id : string):Task{
        return this.tasks.find((task) => task.id === id);
    }

    createTask(createTaskDto : CreateTaskDto) : Task{

        const {title , description} = createTaskDto;

        const task: Task = {
            id : uuid(),
            title,
            description,
            status : TaskStatus.OPEN
        }
        this.tasks.push(task);
        return task;
    }

    deleteTask(id : string): void{ 
        this.tasks = this.tasks.filter((task) => task.id != id); 
    } 

    updateTask(id : string , taskStatus : TaskStatus): Task{
        const task = this.getTaskById(id);
        task.status = taskStatus;
        return task;
    }

}
