import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

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


  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}