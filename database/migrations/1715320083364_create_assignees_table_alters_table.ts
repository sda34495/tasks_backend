import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'task_assignees'

  async up() {
    // Drop foreign key constraints
    this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign(['project_id'])
      table.dropForeign(['task_id'])
      table.dropForeign(['user_id'])
    })

    // Remove primary key constraints
    this.schema.alterTable(this.tableName, (table) => {
      table.dropPrimary('project_id')
      table.dropPrimary('user_id')
      table.dropPrimary('task_id')

    })
  }

  async down() {
    // Add back the primary key constraints
    this.schema.alterTable(this.tableName, (table) => {
      table.primary(['project_id', 'task_id', 'user_id'])
    })

    // Add back foreign key constraints
    this.schema.alterTable(this.tableName, (table) => {
      table.foreign('project_id').references('projects.id').alter()
      table.foreign('task_id').references('tasks.id').alter()
      table.foreign('user_id').references('users.id').alter()
    })
  }
}
