import vine from '@vinejs/vine'

export const signUpValidator = vine.compile(
    vine.object({
        firstName: vine.string(),
        lastName: vine.string(),
        emailAddress: vine.string().email(),
    })
)

export const verifyOtpValidator = vine.compile(
    vine.object({
        emailAddress: vine.string().email(),
        otp: vine.string()
    })
)

export const resendOtpValidator = vine.compile(
    vine.object({
        emailAddress: vine.string().email(),
    })
)
