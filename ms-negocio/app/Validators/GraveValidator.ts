import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class GraveValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({

      duration:schema.number([rules.range(30,180), rules.required
      ]),
      name:schema.string([rules.minLength(5),rules.maxLength(20), rules.required
      ]),
      services_id:schema.number([rules.required
      ]),
      direction:schema.string([rules.minLength(5), rules.maxLength(30), rules.required
      ]),
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
