import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Transfer from './Transfer'
import Cremation from './Cremation'
import Grave from './Grave'
import Comment from './Comment'
import Ejecution from './Ejecution'
import Planxservice from './Planxservice'

export default class Service extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public type_Services: string

  @column()
  public direction: string

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


  @hasOne(() => Comment, {
    foreignKey: 'services_id'
  })
  public comment: HasOne<typeof Comment>

  @hasMany(() => Ejecution, {
    foreignKey: 'services_id'
  })
  public ejecution: HasMany<typeof Ejecution>

  @hasMany(() => Planxservice, {
    foreignKey: 'services_id'
  })
  public planxservices: HasMany<typeof Planxservice>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}


