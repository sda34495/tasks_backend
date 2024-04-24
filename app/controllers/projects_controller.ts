import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProjectsController {

    async createProject({ session }: HttpContext) {
        // const project = await Project.create({ title: "Chatgpt", ownerId: 1 });
        // await project.save()

        // return project;
        const user = await User.query().where('id', 1).preload("projects");
        console.log(session)
        const payload = session.get('payload');
        return { user, payload };
    }
}