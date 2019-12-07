import { Controller, Get, Post, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './tasks.model';

@Controller('tasks')
export class TasksController {

    constructor(private taskService : TasksService){}


    @Get()
    getAllTasks(): Task[]{
        return this.taskService.getAllTasks();        
    }

    @Post()
    createTask(
        @Body('title') title : string ,
        @Body('description') description : string
    ): Task{
        return this.taskService.createTask(title , description);
    }
}
