import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class EjecutionValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    client_id:schema.number([rules.range(1, 999)]),
    services_id:schema.number([rules.range(1, 999)]),
    fechaservices:schema.number([rules.unique({
      table: 'ejectuions',
      column: 'fechaservices',
      caseInsensitive: true,
    })
    ]),
    duration:schema.enum([1, 2, 4] as const)
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {}
}
