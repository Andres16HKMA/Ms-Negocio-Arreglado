import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AdministratorValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    user_id:schema.string([rules.minLength(2),rules.unique({
      table: 'administrators',
      column: 'user_id',
      caseInsensitive: true,
    })]),
    document:schema.number([rules.range(1,99999999999)
    ]),
  })
  public messages: CustomMessages = {}
}
