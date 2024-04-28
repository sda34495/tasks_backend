import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Phase from './phase.js'

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

  @column()
  declare isDeleted: boolean

  @hasMany(() => Phase, {
    foreignKey: 'projectId'
  })
  declare phases: HasMany<typeof Phase>


  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
