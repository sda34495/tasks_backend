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
        priority: vine.enum(TaskPriority).optional(),
        assignees: vine.array(vine.number()).optional()
    })
);


export const editTaskStatusValidator = vine.compile(
    vine.object({
        taskId: vine.number(),
        status: vine.enum(TaskStatus),
    })
);
export const editTaskValidator = vine.compile(
    vine.object({
        taskId: vine.number(),
        projectId: vine.number(),
        title: vine.string().optional(),
        description: vine.string().optional(),
        dueDate: vine.string().optional(),
    })
);

export const editTaskPriorityValidator = vine.compile(
    vine.object({
        taskId: vine.number(),
        priority: vine.enum(TaskPriority),
    })
);

export const removeOrAddAsssigneeValidator = vine.compile(
    vine.object({
        taskId: vine.number(),
        projectId: vine.number(),
        assigneeId: vine.number(),
        status: vine.boolean()
    })
);

export const deleteTaskValidator = vine.compile(
    vine.object({
        taskId: vine.number(),
    })
);
