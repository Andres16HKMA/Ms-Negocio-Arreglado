import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PlanValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    plan_type: schema.enum(['basico', 'premium', 'hyper'] as const),
    cantidadbeneficiers:schema.enum(['10', '20', '40'] as const)
  })
  public messages: CustomMessages = {}
}
