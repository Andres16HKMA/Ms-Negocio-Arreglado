import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Conductor extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public document: number

  @column()
  public name: string

  @column()
  public email: string

  @column()
  public user_id: string
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
