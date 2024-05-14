import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Transfer from './Transfer'
import Cremation from './Cremation'
import Grave from './Grave'
import Client from './Client'
import Chat from './Chat'
import Comment from './Comment'

export default class Service extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public type: string

  @column()
  public client_id: number
  
  @column()
  public date_service: string

  @hasOne(() => Transfer, {
    foreignKey: 'service_id'
  })
  public transfer: HasOne<typeof Transfer>

  @hasOne(() => Cremation, {
    foreignKey: 'services_id'
  })
  public cremation: HasOne<typeof Cremation>

  @hasOne(() => Grave, {
    foreignKey: 'services_id'
  })
  public grave: HasOne<typeof Grave>

  @hasOne(() => Chat, {
    foreignKey: 'services_id'
  })
  public chat: HasOne<typeof Chat>

  @hasOne(() => Comment, {
    foreignKey: 'services_id'
  })
  public comment: HasOne<typeof Comment>

  @belongsTo(() => Client, {
    foreignKey: 'client_id'
  })
  public client: BelongsTo<typeof Client>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}


