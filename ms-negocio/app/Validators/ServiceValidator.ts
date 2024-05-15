import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ServiceValidator {



  
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    type_Services:schema.string([rules.minLength(5)
    ]),
    direction:schema.string([rules.maxLength(100)
    ])
    

  })
  public messages: CustomMessages = {}
}
