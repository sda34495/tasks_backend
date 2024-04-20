import vine from '@vinejs/vine'

export const signUpValidator = vine.compile(
    vine.object({
        emailAddress: vine.string().email(),
    })
)
