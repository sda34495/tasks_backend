import vine from '@vinejs/vine'

export const createProjectValidator = vine.compile(
    vine.object({
        title: vine.string(),
        description: vine.string().optional(),
        startDate: vine.string().optional(),
        endDate: vine.string().optional(),
    })
)

export const editProjectValidator = vine.compile(
    vine.object({
        title: vine.string().optional(),
        description: vine.string().optional(),
        startDate: vine.date().optional(),
        endDate: vine.date().optional(),
        projectId: vine.number(),

    })
)


export const deleteProjectValidator = vine.compile(
    vine.object({
        projectId: vine.number()
    })
)

export const assignProjectValidator = vine.compile(
    vine.object({
        projectId: vine.number(),
        collaboratorId: vine.number(),

    })
)

export const inviteProjectValidator = vine.compile(
    vine.object({
        projectId: vine.number(),
        recipientEmailAddress: vine.string().email()

    })
)


