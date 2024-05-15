import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Client from './Client'
import Service from './Service'

export default class Ejecution extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public services_id: number

  @column()
  public client_id: number

  @column()
  public fecha: string

  @column()
  public duration: string
  
  @belongsTo(() => Service, {
    foreignKey: 'services_id'
  })
  public services : BelongsTo<typeof Service>

  @belongsTo(() => Client, {
    foreignKey: 'client_id'
  })
  public client : BelongsTo<typeof Client>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
