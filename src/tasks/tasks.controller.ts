import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
//import {Task, TaskStatus} from './task.model';
import { threadId } from 'worker_threads';
import { createTaskDto } from './dto/create-task.dto';
import { getTasksFilterDto } from './dto/get-tasks-filter.dto';
import { taskStatusValidationPipe } from './pipes/task-status-vaidation.pipe';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService){}
    @Get()
        getTasks(@Query(ValidationPipe) filterDto: getTasksFilterDto):Promise<Task[]>{
            return this.tasksService.getTasks(filterDto);
        }
    
    @Get('/:id')
        getTaskById(@Param('id', ParseIntPipe) id:number):Promise<Task>{
            return this.tasksService.getTaskById(id);
        }
    
    @Delete('/:id')
        deleteTaskById(@Param('id', ParseIntPipe) id:number):Promise<void>{
            return this.tasksService.deleteTaskById(id);
        }

    @Post()
    @UsePipes(ValidationPipe)
        createTask(@Body() createTaskDto: createTaskDto):Promise<Task>{
            return this.tasksService.createTask(createTaskDto);
        }
    
    @Patch('/:id')
        updateTaskStatus(@Param('id')id:number, @Body('status', taskStatusValidationPipe)status:TaskStatus):Promise<Task>{
            return this.tasksService.updateTaskStatus(id,status);
        }
}
