import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'project_assignees'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('assignee_id').references('users.id').unsigned()
      table.integer('project_id').references('projects.id').unsigned()

      table.dateTime('created_at')
      table.dateTime('updated_at')
    })
  }

  async down() {
    // this.schema.dropTable(this.tableName)
  }
}