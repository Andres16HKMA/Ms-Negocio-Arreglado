import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SuscriptionValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    state:schema.enum(["vigente", "No_vigente"] as const),
    client_id:schema.number([rules.range(1,1000)]),
    plan_id:schema.number([rules.range(1,1000)])

  })
  public messages: CustomMessages = {}
}
