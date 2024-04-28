import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'phases'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title')
      table
        .integer('project_id')
        .unsigned()
        .references('projects.id')
      table.dateTime('created_at')
      table.dateTime('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

