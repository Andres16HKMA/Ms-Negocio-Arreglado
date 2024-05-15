import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Desplazamiento from './Desplazamiento'

export default class Fertro extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public peso: number

  @hasMany(() => Desplazamiento, {
    foreignKey: 'id_fertro'
  })
  public desplazamiento: HasMany<typeof Desplazamiento>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
