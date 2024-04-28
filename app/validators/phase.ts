import vine from "@vinejs/vine";

export const createPhaseValidator = vine.compile(
    vine.object({
        title: vine.string(),
        projectId: vine.number()
    })
)
