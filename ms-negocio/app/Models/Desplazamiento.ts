import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Conductor from './Conductor'
import Fertro from './Fertro'

export default class Desplazamiento extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public fecha: string

  @column()
  public id_aeropuerto: number

  @column()
  public name: string

  @column()
  public id_conductor: number

  @column()
  public id_fertro: number


  @belongsTo(() => Conductor, {
    foreignKey: 'id_conductor'
  })
  public conductor: BelongsTo<typeof Conductor>

  
  @belongsTo(() => Fertro, {
    foreignKey: 'id_fertro'
  })
  public fertro: BelongsTo<typeof Fertro>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
