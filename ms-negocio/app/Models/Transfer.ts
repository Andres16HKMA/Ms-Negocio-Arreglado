import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Transfer extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public plate: string

  @column()
  public destiny: string
  
  @column()
  public origin: string
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
