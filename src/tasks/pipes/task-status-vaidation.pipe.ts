import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from "../task-status.enum";


export class taskStatusValidationPipe implements PipeTransform{
    readonly allowedStatus = [
        TaskStatus.DONE,
        TaskStatus.IN_PROGRESS,
        TaskStatus.OPEN
    ]
    transform(value: any) {
        value = value.toUpperCase();
        if(!this.isValidStatus(value)){
            throw new BadRequestException(`Try a valid status`);
        }

        return value;
    }

    private isValidStatus(status:any){
        const index = this.allowedStatus.indexOf(status);
        return index !== -1;
    }
}
