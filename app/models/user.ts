import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Project from './project.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: number


  @column()
  declare firstName: string

  @column()
  declare lastName: string

  @column()
  declare emailAddress: string


  @column({ serializeAs: null })
  declare isVerified: boolean

  @column()
  declare avatar: string


  @column({ serializeAs: null })
  declare isCompletedInfo: boolean

  @column({ serializeAs: null })
  declare loginOtp: string

  @hasMany(() => Project, {
    foreignKey: 'ownerId'
  })
  declare projects: HasMany<typeof Project>

  

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}