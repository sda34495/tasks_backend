import Task from '#models/task';
import { createTaskValidator } from '#validators/project';
import type { HttpContext } from '@adonisjs/core/http'

export default class TasksController {
    async createTask({ session, response, request }: HttpContext) {

        const payload = await session.get('payload');
        const { userId } = payload
        const data = request.body();
        const { phaseId, projectId, ...body }: any = await createTaskValidator.validate(data);

        const task = await Task.create({ ownerId: userId, ...body, phaseId, projectId });
        await task.save()
        return response.send({ status: 200, message: "Task Created Successfully.", data: task })




    }
}