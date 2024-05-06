import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'phases'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('color_code')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}