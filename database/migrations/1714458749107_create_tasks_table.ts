import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tasks'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title')
      table.string('description')
      table.string('status')
      table.string('priority')
      table.integer('owner_id').unsigned().references('users.id')
      table.integer('project_id').unsigned().references('projects.id')
      table.integer('phase_id').unsigned().references('phases.id')
      table.dateTime('due_date')

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
// declare status: string

// @column()
// declare priority: string


// @column()
// declare ownerId: number

// @column()
// declare projectId: number


// @column()
// declare dueDate: DateTime