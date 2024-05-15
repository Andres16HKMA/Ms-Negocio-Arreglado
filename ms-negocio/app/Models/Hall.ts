import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Site from './Site'

export default class Hall extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public sites_id: number

  @column()
  public capacity: number

  @belongsTo(() => Site, {
    foreignKey: 'sites_id'
  })
  public site: BelongsTo<typeof Site>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
