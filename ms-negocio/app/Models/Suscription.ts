import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Client from './Client'
import Plan from './Plan'
import Payment from './Payment'

export default class Suscription extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public client_id: number
  
  @column()
  public plan_id: number

  @column()
  public state: string

  @belongsTo(() => Client, {
    foreignKey: 'client_id'
  })
  public client: BelongsTo<typeof Client>

  @belongsTo(() => Plan, {
    foreignKey: 'plan_id'
  })
  public plan: BelongsTo<typeof Plan>

  @hasMany(() => Payment, {
    foreignKey: 'suscription_id'
  })

  public payment: HasMany<typeof Payment>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
