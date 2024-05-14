import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ChatValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    services_id:schema.number([rules.unique({
      table: 'chats',
      column: 'services_id',
      caseInsensitive: true,
    }),rules.required
  ]),
  cantidadmiembros:schema.enum([10, 25, 40] as const, [rules.required]
  )

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
