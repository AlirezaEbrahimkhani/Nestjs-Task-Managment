import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetFilterTaskDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/tasks-status-validation.pipe';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {

    constructor(private taskService : TasksService){}


    // @Get()
    // getTasks(@Query(ValidationPipe) filterDto : GetFilterTaskDto): Task[]{
    //     if(Object.keys(filterDto).length){
    //         return this.taskService.getTaskWithFilters(filterDto);
    //     }else{
    //         return this.taskService.getAllTasks();
    //     }        
    // }

    @Get('/:id')
    getTaskById(@Param('id' , ParseIntPipe) id : number) : Promise<Task>{
        return this.taskService.getTaskById(id);
    }

    // @Post()
    // @UsePipes(ValidationPipe)
    // createTask(@Body() createTaskDto : CreateTaskDto): Task{
    //     return this.taskService.createTask(createTaskDto);
    // }

    // @Delete('/:id') 
    // deleteTask(@Param('id') id : string): void{ 
    //     this.taskService.deleteTask(id); 
    // }

    // @Patch('/:id/status')
    // updateTaskStatus(
    //     @Param('id') id : string,
    //     @Body('status' , TaskStatusValidationPipe) status : TaskStatus 
    // ): Task{
    //     return this.taskService.updateTask(id , status);
    // }
}
