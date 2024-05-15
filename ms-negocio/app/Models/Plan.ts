import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany} from '@ioc:Adonis/Lucid/Orm'
import Ejecution from './Ejecution'

export default class Plan extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public plan_type: string

  @column()
  public cantidadbeneficiers: string


  @hasMany(() => Ejecution, {
    foreignKey: 'plan_id'
  })
  public ejecution: HasMany<typeof Ejecution>
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
