import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MessageValidator {
  constructor(protected ctx: HttpContextContract) {}


  public schema = schema.create({
    sender:schema.string([rules.minLength(5), rules.maxLength(30)
    ]),
    addressee:schema.string([rules.minLength(5), rules.maxLength(30)
    ]),
    body:schema.string([rules.minLength(5), rules.maxLength(150)
    ]),
    state:schema.enum(["enviando", "enviado" , "recibido"
    ] as const)
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
