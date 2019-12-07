import { Controller, Get, Post, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {

    constructor(private taskService : TasksService){}


    @Get()
    getAllTasks(): Task[]{
        return this.taskService.getAllTasks();        
    }

    @Post()
    createTask(@Body() createTaskDto : CreateTaskDto): Task{
        return this.taskService.createTask(createTaskDto);
    }
}
