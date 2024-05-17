import Task from '#models/task';
import { createTaskValidator, deleteTaskValidator, editTaskPriorityValidator, editTaskStatusValidator, editTaskValidator, removeOrAddAsssigneeValidator } from '#validators/task';
import type { HttpContext } from '@adonisjs/core/http'
import { TaskStatus } from '../interfaces/constants/TaskStatus.js';
import TaskAssignee from '#models/task_assignee';

export default class TasksController {
    async createTask({ session, response, request }: HttpContext) {

        const payload = await session.get('payload');
        const { userId } = payload
        const data = request.body();
        const { phaseId, projectId, assignees, status, ...body } = await createTaskValidator.validate(data);
        const taskStatus = status ? status : TaskStatus.NOT_STARTED
        const task = await Task.create({ ownerId: userId, ...body, phaseId, projectId, status: taskStatus, dueDate: body.dueDate });
        await task.save()

        if (assignees && assignees?.length > 0) {
            const assignedTo = assignees.map((assigned: any) => ({ userId: assigned, taskId: task.id, projectId: projectId }))
            await TaskAssignee.createMany(assignedTo)
        }

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

    async editTask({ session, response, request }: HttpContext) {
        const payload = await session.get('payload');
        const { userId } = payload
        const data = request.body();
        const { projectId, taskId, ...body }: any = await editTaskValidator.validate(data);

        console.log(taskId, "taskId")
        const task = await Task.findBy('id', taskId);
        console.log(task)
        if (!task) return response.send({ status: 400, message: 'No Task Found.' })



        await task.merge(body).save()

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

        return response.send({ status: 200, message: 'Task Edited Successfully.' })



    }


    async getTaskDetail({ response, session, request }: HttpContext) {


        const payload = await session.get("payload");
        const { userId } = payload;
        const { task_id } = request.qs()
        if (!task_id) return response.json({ status: 400, message: "Please Attach project_id as query String" })

        const tasks = await Task.query()
            .where('id', task_id) // Projects owned by the user
            .preload('owner').preload('assignees', (query) => {
                query.preload('assignee').where('is_assigned', true)
            })

        return response.send({ status: 200, data: tasks[0], message: "Task Fetched Successfully." })



    }

    async addOrRemoveAssignee({ response, session, request }: HttpContext) {
        const payload = await session.get('payload');
        const { userId } = payload
        const data = request.body();
        const { status, assigneeId, taskId, projectId } = await removeOrAddAsssigneeValidator.validate(data);

        const queryResponse = await TaskAssignee.query().where('user_id', assigneeId).where('task_id', taskId);
        const taskAssignee = queryResponse[0]
        if (!taskAssignee) {

            const newAssignee = await TaskAssignee.create({ taskId: taskId, userId: assigneeId, projectId: projectId })
            await newAssignee.save()
            return response.send({ status: 200, message: 'Task Edited Successfully.' })
        }

        taskAssignee.isAssigned = status

        await taskAssignee.save()

        return response.send({ status: 200, message: 'Task Edited Successfully.' })
    }


    async deleteTask({ session, response, request }: HttpContext) {
        const payload = await session.get("payload");
        const { userId } = payload;

        const data = request.body();
        const { taskId } = await deleteTaskValidator.validate(data);



        const queryResponse = await Task.query().where('id', taskId).where('isDeleted', false);
        const task = queryResponse[0];

        if (!task) return response.send({ status: 400, message: "No Project found." })

        task.isDeleted = true;
        task.deletedBy = userId

        await task.save()

        return response.send({ status: 200, message: "Task deleted Successfully." });


    }


}