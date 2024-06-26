import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Service from './Service'
import Message from './Message'

export default class Chat extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public cantidadmiembros: number
  
  @column()
  public  servies_id: number

  @belongsTo(() => Service, {
    foreignKey: 'services_id'
  })
  public services: BelongsTo<typeof Service>

  @hasMany(() => Message, {
    foreignKey: 'chat_id'
  })
  public message: HasMany<typeof Message>
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
