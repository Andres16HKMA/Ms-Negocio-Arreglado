import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PlanValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    plan_type: schema.enum(['basico', 'premium', 'hyper'] as const, [
      rules.required(),
    ]),
    cantidadbeneficiers:schema.enum(['10', '20', '40'] as const,[
      rules.required(),
    ])
  })
  public messages: CustomMessages = {}
}
