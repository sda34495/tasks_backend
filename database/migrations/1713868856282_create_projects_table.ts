import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'projects'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title')
      table.string('description')
      table.string('status')
      table.date('start_date')
      table.date('end_date')
      table
      .integer('owner_id')
      .unsigned()
      .references('users.id')
      table.dateTime('created_at')
      table.dateTime('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

// @column()
// declare title: string

// @column()
// declare description: string

// @column()
// declare startDate: DateTime

// @column()
// declare endDate: DateTime

// @column()
// declare status: string 

// @column()
// declare ownerId: number 