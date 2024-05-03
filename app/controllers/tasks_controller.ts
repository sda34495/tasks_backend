import Task from '#models/task';
import { createTaskValidator, editTaskPriorityValidator, editTaskStatusValidator } from '#validators/task';
import type { HttpContext } from '@adonisjs/core/http'
import { TaskStatus } from '../interfaces/constants/TaskStatus.js';

export default class TasksController {
    async createTask({ session, response, request }: HttpContext) {

        const payload = await session.get('payload');
        const { userId } = payload
        const data = request.body();
        const { phaseId, projectId, ...body }: any = await createTaskValidator.validate(data);

        const task = await Task.create({ ownerId: userId, ...body, phaseId, projectId, status: TaskStatus.NOT_STARTED, dueDate: body.dueDate });
        await task.save()
        return response.send({ status: 200, message: "Task Created Successfully.", data: task })




    }


    async editTaskStatus({ session, response, request }: HttpContext) {
        const payload = await session.get('payload');
        const { userId } = payload
        const data = request.body();
        const { status, taskId } = await editTaskStatusValidator.validate(data);

        const task = await Task.findBy('id', taskId);

        if (!task) return response.send({ status: 400, message: 'No Task Found.' })

        task.status = status;

        await task.save()

        return response.send({ status: 400, message: 'Task Edited Successfully.' })



    }

    async editTaskPriority({ session, response, request }: HttpContext) {
        const payload = await session.get('payload');
        const { userId } = payload
        const data = request.body();
        const { priority, taskId } = await editTaskPriorityValidator.validate(data);

        const task = await Task.findBy('id', taskId);

        if (!task) return response.send({ status: 400, message: 'No Task Found.' })

        task.priority = priority;

        await task.save()

        return response.send({ status: 400, message: 'Task Edited Successfully.' })



    }


}