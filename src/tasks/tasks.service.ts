import { Injectable } from '@nestjs/common';
import {Task, TaskStatus} from './task.model';
import { v1 as uuidv1 } from 'uuid';
import { createTaskDto } from './dto/create-task.dto';
import { getTasksFilterDto } from './dto/get-tasks-filter.dto';


@Injectable()
export class TasksService {
    private tasks:Task[] = [];


    getAllTasks():Task[]{
        return this.tasks;
    }

    getTaskById(id:string):Task{
        return this.tasks.find(task => task.id ===id); 
    }

    createTask(createTaskDto:createTaskDto): Task{
        const {title, description} = createTaskDto;
        const task:Task = {
            id: uuidv1(),
            title, //new update to pass function arguments same as the property, no need to write title:title
            description,
            status: TaskStatus.OPEN
        };
        this.tasks.push(task);
        return task; //good practice
    }

    deleteTaskById(id:string):void{
        this.tasks = this.tasks.filter(task => task.id!=id);
    }

    updateTaskStatus(id:string, status:TaskStatus):Task{
        const task = this.getTaskById(id);
        task.status = status;
        return task;
    }

    filterTasks(taskFilter: getTasksFilterDto):Task[]{
        const{status, search} = taskFilter;
        let tasks = this.getAllTasks();
        if(status){
            tasks = this.tasks.filter(task => task.status===status);
        }
        if(search){
            tasks = this.tasks.filter(task =>
                task.title.includes(search) ||
                task.description.includes(search));
        }
        return tasks;

    }
}
