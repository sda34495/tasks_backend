import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class ProjectAssignee extends BaseModel {
  @column({ isPrimary: true })
  declare id: number


  @column({})
  declare assigneeId: number

  @column({})
  declare projectId: number



  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}