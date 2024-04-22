import jwt from 'jsonwebtoken';
import env from '#start/env'
export async function generateAuthToken(userId: number, emailAddress: string) {
    const payload = {
        userId: userId,
        emailAddress: emailAddress
    };

    try {
        const token = jwt.sign(payload, env.get('JWT_PRIVATE_KEY'));

        return token;
    } catch (error) {
        console.error('Error generating auth token:', error);
        throw new Error('Failed to generate auth token');
    }
}

export async function verifyAuthToken(token: string) {
    try {
        const decoded = jwt.verify(token, env.get('JWT_PRIVATE_KEY'));

        return decoded;
    } catch (error) {
        console.error('Error verifying auth token:', error);
        return null;
    }
}