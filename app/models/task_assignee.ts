import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Task from './task.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'

export default class TaskAssignee extends BaseModel {

  @column({ isPrimary: true })
  declare projectId: number

  @column({ isPrimary: true })
  declare taskId: number


  @column({ isPrimary: true })
  declare userId: number

  @column()
  declare isAssigned: boolean


  @belongsTo(() => Task, {
    foreignKey: 'taskId'
  })
  declare task: BelongsTo<typeof Task>

  @belongsTo(() => User, {
    foreignKey: 'userId'
  })
  declare assignee: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}