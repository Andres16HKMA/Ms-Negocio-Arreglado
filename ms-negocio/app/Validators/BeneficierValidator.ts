import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class BeneficierValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    user_id:schema.string([rules.minLength(2),rules.unique({
      table: 'clients',
      column: 'user_id',
      caseInsensitive: true,
    })]),
    document:schema.number([rules.range(1,9999999999)]),
    celphone:schema.number([rules.range(1,9999999999)]),
  })
  public messages: CustomMessages = {}
}
