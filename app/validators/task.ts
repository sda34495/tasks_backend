import vine from '@vinejs/vine';
import { TaskStatus } from '../interfaces/constants/TaskStatus.js';
import { TaskPriority } from '../interfaces/constants/TaskPriority.js';



export const createTaskValidator = vine.compile(
    vine.object({
        title: vine.string(),
        projectId: vine.number(),
        phaseId: vine.number(),
        description: vine.string().optional(),
        dueDate: vine.string().optional(),
    })
);


export const editTaskStatusValidator = vine.compile(
    vine.object({
        taskId: vine.number(),
        status: vine.enum(TaskStatus),
    })
);

export const editTaskPriorityValidator = vine.compile(
    vine.object({
        taskId: vine.number(),
        priority: vine.enum(TaskPriority),
    })
);
