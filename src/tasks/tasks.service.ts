import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
//import {Task, TaskStatus} from './task.model';
//import { v1 as uuidv1 } from 'uuid';
import { createTaskDto } from './dto/create-task.dto';
import { getTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';


@Injectable()
export class TasksService {
    constructor (
        @InjectRepository(TaskRepository)
        private taskRepository:TaskRepository,
        ){}

        getTasks(filterDto:getTasksFilterDto):Promise<Task[]>{
            return this.taskRepository.getTasks(filterDto);
        }
    // private tasks:Task[] = [];


    // getAllTasks():Task[]{
    //     return this.tasks;
    // }
        async getTaskById(id:number):Promise<Task>{
            const found = await this.taskRepository.findOne(id);

            if(!found){
                throw new NotFoundException(`not found`);
            }
            else{
                return found;
            }
        }
    // getTaskById(id:string):Task{
    //     const found = this.tasks.find(task => task.id ===id);
    //     if (!found){
    //         throw new NotFoundException(`not found`);
    //     }
    //     else{
    //         return found;
    //     }
    // }
       async createTask(createTaskDto: createTaskDto):Promise<Task>{
           return this.taskRepository.createTask(createTaskDto);
       }
    // createTask(createTaskDto:createTaskDto): Task{
    //     const {title, description} = createTaskDto;
    //     const task:Task = {
    //         id: uuidv1(),
    //         title, //new update to pass function arguments same as the property, no need to write title:title
    //         description,
    //         status: TaskStatus.OPEN
    //     };
    //     this.tasks.push(task);
    //     return task; //good practice
    // }

    async deleteTaskById(id:number):Promise<void>{
        const remove = await this.taskRepository.delete(id);
        if(remove.affected === 0){
            throw new NotFoundException(`not found`);
        }
    }
    async updateTaskStatus(id:number, status):Promise<Task>{
        const find = await this.taskRepository.findOne(id);
        find.status = status;
        await find.save();
        return find;
    }
    // updateTaskStatus(id:string, status:TaskStatus):Task{
    //     const task = this.getTaskById(id);
    //     task.status = status;
    //     return task;
    // }

    // filterTasks(taskFilter: getTasksFilterDto):Task[]{
    //     const{status, search} = taskFilter;
    //     let tasks = this.getAllTasks();
    //     if(status){
    //         tasks = this.tasks.filter(task => task.status===status);
    //     }
    //     if(search){
    //         tasks = this.tasks.filter(task =>
    //             task.title.includes(search) ||
    //             task.description.includes(search));
    //     }
    //     return tasks;

    // }
}
