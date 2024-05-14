import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ConductorValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    user_id:schema.string([rules.minLength(2),rules.unique({
      table: 'administrators',
      column: 'user_id',
      caseInsensitive: true,
    }),
    rules.unique({
      table: 'clients',
      column: 'user_id',
      caseInsensitive: true,
    }), rules.unique({
      table: 'beneficiaries',
      column: 'user_id',
      caseInsensitive: true,
    }),
    rules.minLength(2),rules.unique({
      table: 'conductors',
      column: 'user_id',
      caseInsensitive: true,
    }),rules.required
  ]),
  document:schema.number([rules.range(1,99999999999)
  ])
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
