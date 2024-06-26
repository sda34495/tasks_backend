import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Phase from './phase.js'
import Task from './task.js'

export default class Project extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare title: string

  @column()
  declare description: string

  @column()
  declare startDate: DateTime

  @column()
  declare endDate: DateTime

  @column()
  declare status: string

  @column()
  declare ownerId: number

  @column({ serializeAs: null })
  declare isDeleted: boolean


  @manyToMany(() => User, {
    localKey: 'id',
    pivotForeignKey: 'project_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'assignee_id',
    pivotTable: 'project_assignees',
    pivotTimestamps: true
  })
  public collaborators!: ManyToMany<typeof User>


  @hasMany(() => Phase, {
    foreignKey: 'projectId'
  })
  declare phases: HasMany<typeof Phase>

  @hasMany(() => Task, {
    foreignKey: 'projectId'
  })
  declare tasks: HasMany<typeof Task>

  @belongsTo(() => User, {
    foreignKey: 'ownerId'
  })
  declare owner: BelongsTo<typeof User>



}
