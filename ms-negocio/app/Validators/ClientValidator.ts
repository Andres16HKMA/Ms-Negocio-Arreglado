import { schema, CustomMessages,rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ClientValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    user_id_security:schema.string([rules.minLength(2),rules.unique({
      table: 'clients',
      column: 'user_id_location',
      caseInsensitive: true,
    })]),
    name:schema.string([rules.minLength(1)]),
    celphone:schema.number([rules.minLength(10),rules.maxLength(10)]),
    document:schema.number([rules.range(10,11)]),
    lastname:schema.string.optional([rules.minLength(1)])
  })


  public messages: CustomMessages = {}
}
