import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Service from './Service'

export default class Comment extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public services_id: number

  @column()
  public body: string

  @belongsTo(() => Service, {
    foreignKey: 'services_id'
  })
  public services: BelongsTo<typeof Service>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
