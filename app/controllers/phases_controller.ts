import type { HttpContext } from '@adonisjs/core/http'

import { createPhaseValidator } from "#validators/phase";
import Phase from '#models/phase';

export default class PhasesController {
    async createProjectPhase({ response, request }: HttpContext) {

        const data = request.body();
        const body = await createPhaseValidator.validate(data);


        const phase = await Phase.create({ title: body.title, projectId: body.projectId })

        await phase.save()

        return response.send({ status: 200, message: "Project Phase Created Successfully.", data: phase })


    }
}