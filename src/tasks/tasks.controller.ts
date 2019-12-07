import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
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

    @Get('/:id')
    getTaskById(@Param('id') id : string) : Task{
        return this.taskService.getTaskById(id);
    }

    @Post()
    createTask(@Body() createTaskDto : CreateTaskDto): Task{
        return this.taskService.createTask(createTaskDto);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id : string): void{
        this.taskService.deleteTask(id);
    }
}
