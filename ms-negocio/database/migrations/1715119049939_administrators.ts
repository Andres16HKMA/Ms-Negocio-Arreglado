import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'administrators'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      /*
      table.String('name', 100).notNullable
      table.String('lastname' 20)
      table.String('Fk sites', 20).notNullable
      table.String('Responsabilities', 100).notNullable
      */
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
