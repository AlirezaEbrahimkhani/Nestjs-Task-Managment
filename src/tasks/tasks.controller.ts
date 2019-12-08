import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetFilterTaskDto } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {

    constructor(private taskService : TasksService){}


    @Get()
    getTasks(@Query() filterDto : GetFilterTaskDto): Task[]{
        if(Object.keys(filterDto).length){
            return this.taskService.getTaskWithFilters(filterDto);
        }else{
            return this.taskService.getAllTasks();
        }        
    }

    @Get('/:id')
    getTaskById(@Param('id') id : string) : Task{
        return this.taskService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto : CreateTaskDto): Task{
        return this.taskService.createTask(createTaskDto);
    }

    @Delete('/:id') 
    deleteTask(@Param('id') id : string): void{ 
        this.taskService.deleteTask(id); 
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id : string,
        @Body('status') status : TaskStatus 
    ): Task{
        return this.taskService.updateTask(id , status);
    }
}
