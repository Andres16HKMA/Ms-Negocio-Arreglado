import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Suscription from './Suscription'

export default class Payment extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public valorpagar: number

  @column()
  public cuotas: number

  @column()
  public estado: string

  @column()
  public suscription_id: number

  @belongsTo(() => Suscription, {
    foreignKey: 'suscription_id'
  })
  public suscription: BelongsTo<typeof Suscription>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
