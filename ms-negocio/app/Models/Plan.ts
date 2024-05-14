import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column} from '@ioc:Adonis/Lucid/Orm'
import Client from './Client'

export default class Plan extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public plan_type: string

  @column()
  public cantidadbeneficiers: number

  @column()
  public client_id:number


  @belongsTo(() => Client, {
    foreignKey: 'client_id'
  })
  public client: BelongsTo<typeof Client>
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
