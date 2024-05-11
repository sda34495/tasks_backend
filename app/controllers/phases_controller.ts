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
        const baseValue = 180; // Adjust this value to control lightness (higher = lighter)
        const range = 75; // Adjust this value to control color variation (lower = lighter)
        const red = Math.floor(Math.random() * range) + baseValue;
        const green = Math.floor(Math.random() * range) + baseValue;
        const blue = Math.floor(Math.random() * range) + baseValue;
        const hexRed = red.toString(16).padStart(2, '0');
        const hexGreen = green.toString(16).padStart(2, '0');
        const hexBlue = blue.toString(16).padStart(2, '0');
        return `#${hexRed}${hexGreen}${hexBlue}`;
    }


}

