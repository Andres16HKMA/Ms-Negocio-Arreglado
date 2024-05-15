import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany} from '@ioc:Adonis/Lucid/Orm'
import Suscription from './Suscription'

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

  @hasMany(() => Suscription, {
    foreignKey: 'client_id'
  })
  public suscription: HasMany<typeof Suscription>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
