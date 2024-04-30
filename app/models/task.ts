import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Phase from './phase.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Project from './project.js'

export default class Task extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare description: string

  @column()
  declare status: string

  @column()
  declare priority: string


  @column()
  declare ownerId: number

  @column()
  declare projectId: number

  @column()
  declare phaseId: number


  @column()
  declare dueDate: DateTime

  @belongsTo(() => Phase, {
    foreignKey: 'phaseId'
  })
  declare phase: BelongsTo<typeof Phase>

  @belongsTo(() => User, {
    foreignKey: 'ownerId'
  })
  declare owner: BelongsTo<typeof User>
  
  @belongsTo(() => Project, {
    foreignKey: 'projectId'
  })
  declare project: BelongsTo<typeof Project>



  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime



}