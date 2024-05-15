import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DesplazamientoValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    fecha:schema.string([rules.minLength(5)]),
    id_aeropuerto:schema.enum([45, 9, 35, 141, 41, 142] as const),
    id_fertro:schema.number([rules.range(1,1000)]),
    id_conductor:schema.number([rules.range(1,1000)])

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
