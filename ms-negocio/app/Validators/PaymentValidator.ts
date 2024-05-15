import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PaymentValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    valorpagar:schema.number([rules.range(1, 1000000)
    ]),
    cuotas:schema.enum([1, 2, 3, 5, 10] as const),
    estado:schema.enum(["Pendiente","Completo","Atrasado"] as const),
    suscription_id:schema.number([rules.range(1,1000)]),

    
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
