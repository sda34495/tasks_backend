import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tasks'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {

      table.boolean('is_deleted').defaultTo(false)
      table.integer('deleted_by').references('users.id').unsigned()


    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}