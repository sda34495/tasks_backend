import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string("first_name").defaultTo("")
      table.string("last_name").defaultTo("")
      table.string("email_address").notNullable()
      table.string("avatar")
      table.boolean("is_verified").defaultTo(false)
      table.boolean("is_completed_info").defaultTo(false)
      table.string("login_otp")

      table.dateTime('created_at')
      table.dateTime('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
