import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import { verifyAuthToken } from '../utils/jwt.js';

export default class AuthMiddleware {
  async handle({ request, response, session }: HttpContext, next: NextFn) {
    /**
     * Middleware logic goes here (before the next call)
     */

    
    const token = request.header('Authorization')?.replace('Bearer ', '');

    if (!token) return response.json({
      status: 402,
      message: "No Token Provided."
    });


    const payload = await verifyAuthToken(token)
    if (!payload) return response.json({
      status: 402,
      message: "Token has been Expired kindly login again."
    })



    // session.put('payload', payload);

    session.put("payload", payload)

    /**
     * Call next method in the pipeline and return its output
     */
    await next()


  }
}


