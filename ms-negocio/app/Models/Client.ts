import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany} from '@ioc:Adonis/Lucid/Orm'
import Beneficier from './Beneficier'

export default class Client extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public document: number

  @column()
  public celphone: number

  @column()
  public user_id: string


  @hasMany(() => Beneficier, {
    foreignKey: 'theater_id'
  })
  public beneficier: HasMany<typeof Beneficier>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
