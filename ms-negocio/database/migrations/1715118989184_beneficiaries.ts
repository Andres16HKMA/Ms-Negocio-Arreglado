import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Beneficiaries extends BaseSchema {
  protected tableName = 'beneficiaries'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('document')
      table.integer('celphone')
      table.integer('client_id').unsigned().references('id').inTable('clients')
      table.timestamps(true, true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
