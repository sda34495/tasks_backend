import Project from '#models/project';
import ProjectAssignee from '#models/project_assignee';
import User from '#models/user'
import { assignProjectValidator, createProjectValidator, deleteProjectValidator, editProjectValidator } from '#validators/project';
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

        const projects = await Project.query()
            .where('ownerId', userId) // Projects owned by the user
            .orWhereHas('collaborators', (builder) => {
                builder.where('id', userId); // Projects assigned to the user
            })
            .preload('owner')

        return response.send({ status: 200, data: projects, message: "" })



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

        const queryResponse = await Project.query().where('id', projectId).where('ownerId', userId).where('isDeleted', false);
        const project = queryResponse[0];

        if (!project) return response.send({ status: 400, message: "No Project found." })


        await project.merge({ ...body }).save()


        return response.json({ status: 200, message: "Details Saved Successfully", data: project })


    }



    async assignProject({ session, response, request }: HttpContext) {

        const payload = await session.get('payload');
        const { userId } = payload
        const data = request.body();
        const { projectId, collaboratorId } = await assignProjectValidator.validate(data);


        const queryResponse = await Project.query().where('id', projectId).where('ownerId', userId).where('isDeleted', false);
        const project = queryResponse[0];

        if (!project) return response.send({ status: 400, message: "No Project found." })

        const user = await User.findBy('id', collaboratorId);
        if (!user) return response.send({ status: 400, message: "No User found." })



        const queryResponseForCollaborator = await ProjectAssignee.query().where('assigneeId', collaboratorId).where('projectId', projectId)
        const collaborator = queryResponseForCollaborator[0];

        if (collaborator) return response.send({ status: 400, message: "Already Assigned." })


        const newCollaborator = await ProjectAssignee.create({ assigneeId: collaboratorId, projectId: projectId })
        await newCollaborator.save()

        return response.send({ status: 200, message: "User Have Been Assigned." })



    }


    async getProjectDetail({ response, session, request }: HttpContext) {

        const payload = await session.get("payload");
        const { userId } = payload;
        const { projectId } = request.qs()
        if (!projectId) return response.json({ status: 400, message: "Please Attach projectId as query String" })

        // const projects = await Project.query().where('ownerId', userId).preload('owner');
        const projects = await Project.query()
            .where('id', projectId) // Projects owned by the user
            .orWhereHas('collaborators', (builder) => {
                builder.where('id', userId); // Projects assigned to the user
            })
            .preload('owner')
            .preload('phases', (query) => {
                query.preload('tasks'); // Preload tasks within phases
            })

        return response.send({ status: 200, data: projects, message: "" })



    }








}