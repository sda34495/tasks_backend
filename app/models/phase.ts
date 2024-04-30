import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Project from './project.js'
import Task from './task.js'

export default class Phase extends BaseModel {
  @column({ isPrimary: true })
  declare id: number



  @column({})
  declare title: string

  @column({})
  declare projectId: number

  @belongsTo(() => Project)
  declare project: BelongsTo<typeof Project>


  @hasMany(() => Task, {
    foreignKey: 'phaseId'
  })
  declare tasks: HasMany<typeof Task>




  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}