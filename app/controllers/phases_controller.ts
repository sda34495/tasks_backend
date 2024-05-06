import type { HttpContext } from '@adonisjs/core/http'

import { createPhaseValidator } from "#validators/phase";
import Phase from '#models/phase';

export default class PhasesController {
    async createProjectPhase({ response, request }: HttpContext) {

        const data = request.body();
        const body = await createPhaseValidator.validate(data);


        const phase = await Phase.create({ title: body.title, projectId: body.projectId, colorCode: this.generateLightColorHash() })

        await phase.save()

        return response.send({ status: 200, message: "Project Phase Created Successfully.", data: phase })


    }

    private generateLightColorHash() {
        const red = Math.floor(Math.random() * 255);
        const green = Math.floor(Math.random() * 255);
        const blue = Math.floor(Math.random() * 255);
        const hexRed = red.toString(16).padStart(2, '0');
        const hexGreen = green.toString(16).padStart(2, '0');
        const hexBlue = blue.toString(16).padStart(2, '0');
        return `#${hexRed}${hexGreen}${hexBlue}`;
    }



}

