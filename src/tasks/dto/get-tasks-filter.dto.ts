import { TaskStatus } from "../tasks.model";

export class GetFilterTaskDto { 
    status : TaskStatus;
    search : string;
}