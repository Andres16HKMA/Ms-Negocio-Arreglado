import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Administrador extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public document: number

  @column()
  public user_id: string

  @column()
  public name: string

  @column()
  public email: string
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
