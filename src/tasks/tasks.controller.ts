import { Controller, Get, Post, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService){}

  // @Get()
  // getAllTasks(): Task[] {
  //   return this.tasksService.getAllTasks();
  // }

  // @Post()
  // createTask(
  //   @Body() title: string,
  //   @Body() description: string
  // ){
  //   console.log('title', title);
  //   console.log('description', description);
  // }
}
