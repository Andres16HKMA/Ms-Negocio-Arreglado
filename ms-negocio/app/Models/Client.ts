import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, HasOne, hasOne} from '@ioc:Adonis/Lucid/Orm'
import Plan from './Plan'
import Beneficier from './Beneficier'
import Service from './Service'

export default class Client extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public document: number

  @column()
  public celphone: number

  @column()
  public user_id: string

  @column()
  public paymethod: string

  @column()
  public name: string

  @column()
  public email: string

  @hasMany(() => Beneficier, {
    foreignKey: 'client_id'
  })
  public beneficier: HasMany<typeof Beneficier>
  
  @hasOne(() => Plan, {
    foreignKey: 'client_id'
  })
  public plan: HasOne<typeof Plan>

  @hasMany(() => Service, {
    foreignKey: 'client_id'
  })
  public service: HasMany<typeof Service>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
