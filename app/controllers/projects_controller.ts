import Project from '#models/project';
import User from '#models/user'
import { createProjectValidator, deleteProjectValidator, editProjectValidator } from '#validators/project';
import type { HttpContext } from '@adonisjs/core/http'

export default class ProjectsController {

    async createProject({ session, response, request }: HttpContext) {

        const payload = await session.get('payload');
        const { userId } = payload
        const data = request.body();
        const body: any = await createProjectValidator.validate(data);

        const newProject = await Project.create({ ownerId: userId, ...body });
        await newProject.save()
        return response.send({ status: 200, message: "Project Created Successfully.", data: newProject })




    }
    async getAllProjects({ response, session }: HttpContext) {

        const payload = await session.get("payload");
        const { userId } = payload;

        const projects = await Project.findManyBy({ ownerId: userId });

        return response.send({ status: 200, data: projects })



    }

    async deleteProject({ session, response, request }: HttpContext) {
        const payload = await session.get("payload");
        const { userId } = payload;

        const data = request.body();
        const { projectId } = await deleteProjectValidator.validate(data);



        const queryResponse = await Project.query().where('id', projectId).where('ownerId', userId).where('isDeleted', false);
        const project = queryResponse[0];

        if (!project) return response.send({ status: 400, message: "No Project found." })

        project.isDeleted = true;
        await project.save()

        return response.send({ status: 200, message: "Project deleted Successfully." });


    }


    async editProject({ session, response, request }: HttpContext) {

        const payload = await session.get('payload');
        const { userId } = payload;


        const data = request.body();
        const { projectId, ...body }: any = await editProjectValidator.validate(data);
        console.log(body)

        const queryResponse = await Project.query().where('id', projectId).where('ownerId', userId).where('isDeleted', false);
        const project = queryResponse[0];

        if (!project) return response.send({ status: 400, message: "No Project found." })


        await project.merge({ ...body }).save()


        return response.json({ status: 200, message: "Saved Successfully", data: project })


    }







}