// import type { HttpContext } from '@adonisjs/core/http'

import User from "#models/user";
import env from "#start/env";
import { HttpContext } from "@adonisjs/core/http";
import app from "@adonisjs/core/services/app";
import { randomUUID } from "crypto";
import bucket from "../utils/bucket.js";

export default class ProfilesController {
    async uploadProfilePicture({ request, response, session }: HttpContext) {
        console.log("Hitted..")

        const payload = await session.get("payload");
        const avatar = request.file('avatar')

        if (!avatar) return response.json({ status: 400, message: 'Failed..' });

        if (!avatar.isValid) {
            return response.send({
                status: 400,
                errors: avatar.errors[0]
            })
        }

        const user = await User.findBy('id', payload.userId);
        if (!user) return response.send({
            status: 400,
            message: 'No User Found.'
        })

        // const fileName = randomUUID() + avatar.clientName.replace(' ', '')


        // await avatar.move(app.makePath('uploads'), { name: fileName })
        // if (!avatar.filePath) return;

        // user.avatar = env.get('HOST_ADDR') + fileName;
        // await user.save()
        if (!avatar.tmpPath) return;

        const result = await bucket.uploader.upload(avatar.tmpPath, {
            folder: 'profile_pictures', // Optional folder in Cloudinary
            use_filename: true
        });

        // Update user avatar URL
        user.avatar = result.secure_url;
        await user.save()

        return response.send({ status: 200, message: 'Profile Uploaded Successfully.' })

    }


    async getProfile({ response, session }: HttpContext) {
        const payload = await session.get("payload");

        const user = await User.findBy('id', payload.userId);
        if (!user) return response.send({ status: 400, message: 'No User Found.' })

        return response.send({ status: 200, data: user })
    }

}