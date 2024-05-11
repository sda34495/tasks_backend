import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'task_assignees'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('project_id').unsigned().references('projects.id').primary()
      table.integer('task_id').unsigned().references('tasks.id').primary()
      table.integer('user_id').unsigned().references('users.id').primary()
      table.boolean('is_assigned').defaultTo(true)
      table.dateTime('created_at')
      table.dateTime('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

