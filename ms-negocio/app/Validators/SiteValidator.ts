import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SiteValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    name:schema.string([rules.minLength(1)
    ]),
    direction:schema.string([rules.minLength(1)
    ])

  })

  public messages: CustomMessages = {}
}
