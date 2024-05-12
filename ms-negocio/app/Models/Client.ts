import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Beneficier from './Beneficier'

export default class Client extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public lastname: string

  @column()
  public document: number

  @column()
  public celphone: number

 // @column()
 // public id_user_security: string

  @hasMany(() => Beneficier, {
    foreignKey: 'theater_id'
  })
  public seats: HasMany<typeof Beneficier>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
