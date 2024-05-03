import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Invitation extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare projectId: number

  @column()
  declare recipientId: number

  @column()
  declare inviter: number

  @column()
  declare token: string

  @column()
  declare status: string


  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}