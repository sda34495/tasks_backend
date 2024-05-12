import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tasks'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('description', 1000).alter()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}