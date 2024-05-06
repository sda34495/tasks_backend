import Project from '#models/project';
import ProjectAssignee from '#models/project_assignee';
import User from '#models/user'
import { assignProjectValidator, createProjectValidator, deleteProjectValidator, editProjectValidator, inviteProjectValidator } from '#validators/project';
import type { HttpContext } from '@adonisjs/core/http'
import { generateAuthToken, verifyAuthToken } from '../utils/jwt.js';
import Invitation from '#models/invitation';
import env from '#start/env';
import { getInviteLinkContent } from '../utils/mailcontent.js';
import { sendEmail } from '../utils/Mailer.js';
import { InviteStatus } from '../interfaces/constants/InviteStatus.js';

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
            .where('ownerId', userId).where('isDeleted', false)// Projects owned by the user
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



        const { token } = request.qs()

        const decodePayload: any = await verifyAuthToken(token)

       
        if (decodePayload.userId != userId) return response.send({ status: 403, message: 'Unauthorized Access' })

        const invitationQueryResponse = await Invitation.query().where('token', token).where('status', InviteStatus.PENDING);

        const invitation = invitationQueryResponse[0]
        if (!invitation) return response.send({ status: 400, message: 'No Invite Found.' })








        const queryResponse = await Project.query().where('id', invitation.projectId).where('ownerId', invitation.inviterId).where('isDeleted', false);
        const project = queryResponse[0];

        if (!project) return response.send({ status: 400, message: "No Project found." })

        const user = await User.findBy('id', invitation.recipientId);
        if (!user) return response.send({ status: 400, message: "No User found." })



        const queryResponseForCollaborator = await ProjectAssignee.query().where('assigneeId', invitation.recipientId).where('projectId', invitation.projectId)
        const collaborator = queryResponseForCollaborator[0];

        if (collaborator) return response.send({ status: 400, message: "Already Assigned." })


        const newCollaborator = await ProjectAssignee.create({ assigneeId: invitation.recipientId, projectId: invitation.projectId })
        await newCollaborator.save()

        invitation.status = InviteStatus.ACCEPTED
        invitation.save()

        return response.send({ status: 200, message: "Project Assigned Successfully.", data: {} })



    }


    async getProjectDetail({ response, session, request }: HttpContext) {


        const payload = await session.get("payload");
        const { userId } = payload;
        const { project_id } = request.qs()
        if (!project_id) return response.json({ status: 400, message: "Please Attach project_id as query String" })

        const projects = await Project.query()
            .where('id', project_id) // Projects owned by the user
            .preload('owner')
            .preload('phases', (query) => {
                query.preload('tasks'); // Preload tasks within phases
            })

        return response.send({ status: 200, data: projects[0], message: "" })



    }


    async inviteToProject({ session, response, request }: HttpContext) {

        console.log("Up and Running..")
        const payload = await session.get('payload');
        const { userId } = payload
        const data = request.body();
        const { recipientEmailAddress, projectId } = await inviteProjectValidator.validate(data);

        const user = await User.findBy('emailAddress', recipientEmailAddress);
        if (!user) return response.json({ status: 400, message: "No User Found With this Email." })


        const token = await generateAuthToken(user.id, user.emailAddress);

        const newInvitee = await Invitation.create({ inviterId: userId, token: token, projectId: projectId, recipientId: user.id })
        await newInvitee.save()


        const inviteLink = `${env.get("CLIENT_ADDR")}/invite/${token}`;

        const content = getInviteLinkContent(inviteLink);
        await sendEmail({
            htmlContent: content,
            recipientEmail: user.emailAddress,
            subject: 'Project Invitation',
            recipientName: user.lastName,
            senderName: 'Task Sync'
        })



        return response.send({ status: 200, message: "Project Created Successfully.", data: { link: inviteLink } })




    }


    async getInvitationDetail({ response, request }: HttpContext) {

        const { token } = request.qs()

        const invitation = await Invitation.findBy('token', token);
        console.log(token)
        if (!invitation) return response.send({ status: 400, message: "Not found." })


        const queryResponse = await Project.query().where('id', invitation.projectId).preload('owner');

        const project = queryResponse[0]

        return response.send({ status: 200, message: "Detail Found", data: { projectTitle: project.title, inviterName: project.owner.firstName + project.owner.lastName } })


    }








}