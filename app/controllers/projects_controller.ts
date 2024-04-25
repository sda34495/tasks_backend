import Project from '#models/project';
import User from '#models/user'
import { createProjectValidator } from '#validators/project';
import type { HttpContext } from '@adonisjs/core/http'

export default class ProjectsController {

    async createProject({ session, response, request }: HttpContext) {

        const payload: any = await session.get('payload');
        const { userId } = payload
        const data = request.body();
        const body: any = await createProjectValidator.validate(data);

        const newProject = await Project.create({ ownerId: userId, ...body });
        await newProject.save()
        return response.send({ status: 200, message: "Project Created Successfully.", data: newProject })




    }
}