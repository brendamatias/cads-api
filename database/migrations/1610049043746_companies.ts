import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Companies extends BaseSchema {
  protected tableName = 'companies'

  public async up() {
    await this.db.knexRawQuery('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')

    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.knexRawQuery('uuid_generate_v4()'))
      table.string('name', 128).notNullable().unique()
      table.string('cnpj', 14).notNullable().unique()
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
