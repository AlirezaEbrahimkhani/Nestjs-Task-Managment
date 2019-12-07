import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';

@Injectable()
export class TasksService {

    private tasks : Task[] = [];

    getAllTasks(): Task[]{
        return this.tasks;
    }

    createTask(title : string , description : string){
        const task: Task = {
            id : "1",
            title,
            description,
            status : TaskStatus.OPEN
        }
    }

}
