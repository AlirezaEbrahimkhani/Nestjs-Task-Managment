import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetFilterTaskDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/tasks-status-validation.pipe';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('tasks')
@UseGuards(AuthGuard()) 
export class TasksController {

    constructor(private taskService : TasksService){}

    @Get()
    getTasks(
        @Query(ValidationPipe) filterDto : GetFilterTaskDto,
        @GetUser() user : User
    ) : Promise<Task[]>{
       return this.taskService.getTasks(filterDto , user);     
    }

    @Get('/:id')
    getTaskById(@Param('id' , ParseIntPipe) id : number) : Promise<Task>{
        return this.taskService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(
        @Body() createTaskDto : CreateTaskDto,
        @GetUser() user : User
    ): Promise<Task>{
        return this.taskService.createTask(createTaskDto , user);
    }

    @Delete('/:id') 
    deleteTask(@Param('id' , ParseIntPipe) id : number): Promise<void>{ 
        return this.taskService.deleteTask(id); 
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id' , ParseIntPipe) id : number,
        @Body('status' , TaskStatusValidationPipe) status : TaskStatus 
    ): Promise<Task>{
        return this.taskService.updateTaskSatus(id , status);
    }
}
