import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Beneficiaries extends BaseSchema {
  protected tableName = 'beneficiaries'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('document')
      table.integer('celphone')
      table.string('name', 20)
      table.string('email', 20)
      table.integer('titular_id').unsigned().references('id').inTable('titulars')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
 