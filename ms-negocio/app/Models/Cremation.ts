import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Cremation extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public duration: number

  @column()
  public assistants: number

  @column()
  public name: string
  

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
