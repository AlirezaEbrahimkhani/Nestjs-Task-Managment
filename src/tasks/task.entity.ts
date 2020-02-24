import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { TaskStatus } from "./tasks.model";

@Entity()
export class Task extends BaseEntity {

    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    title : string;

    @Column()
    description : string

    @Column()
    status : TaskStatus
}