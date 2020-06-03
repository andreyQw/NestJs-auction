
import { Task } from "./task.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository()
export class TaskRepository extends Repository<Task>{
  
}