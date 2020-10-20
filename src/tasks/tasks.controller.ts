import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import {Task, TaskStatus} from './task.model';
import { threadId } from 'worker_threads';
import { createTaskDto } from './dto/create-task.dto';
import { getTasksFilterDto } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService){}
    @Get()
        getTasks(@Query() taskfilter: getTasksFilterDto):Task[]{
            if(Object.keys(taskfilter).length){
                return this.tasksService.filterTasks(taskfilter);
            }
            else{
            return this.tasksService.getAllTasks();
            }
        }
    
    @Get('/:id')
        getTaskById(@Param('id') id:string):Task{
            return this.tasksService.getTaskById(id);
        }
    
    @Delete('/:id')
        deleteTaskById(@Param('id')id:string):void{
            return this.tasksService.deleteTaskById(id);
        }

    @Post()
        createTask(@Body() createTaskDto: createTaskDto):Task{
            return this.tasksService.createTask(createTaskDto);
        }
    
    @Patch('/:id')
        updateTaskStatus(@Param('id')id:string, @Body('status')status:TaskStatus):Task{
            return this.tasksService.updateTaskStatus(id,status);
        }
}
