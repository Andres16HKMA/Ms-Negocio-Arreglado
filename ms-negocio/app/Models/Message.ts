import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Chat from './Chat'

export default class Message extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public sender: string
  
  @column()
  public addressee: string
  
  @column()
  public body: string

  @column()
  public state: string

  @column()
  public chat_id: string

  @belongsTo(() => Chat, {
    foreignKey: 'chat_id'
  })
  public chat: BelongsTo<typeof Chat>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
