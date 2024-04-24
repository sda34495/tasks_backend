import vine from '@vinejs/vine'

export const createProjectValidator = vine.compile(
    vine.object({
        title: vine.string(),
        description: vine.string().optional(),
        startDate: vine.string().optional(),
        endDate: vine.string().optional(),
    })
)
