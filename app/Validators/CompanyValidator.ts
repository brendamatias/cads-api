import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CompanyValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({}, [
      rules.required(),
      rules.unique({ table: 'companies', column: 'name' }),
      rules.maxLength(128),
    ]),
    cnpj: schema.string({}, [
      rules.required(),
      rules.unique({ table: 'companies', column: 'cnpj' }),
      rules.maxLength(14),
      rules.minLength(14),
    ]),
  })

  public messages = {
    'name.string': 'Nome da empresa inválido',
    'name.required': 'Informe o nome da empresa',
    'name.unique': 'Empresa já cadastrada',
    'name.maxLength': 'Nome da empresa excedeu o limite de caracteres',

    'cnpj.string': 'Cnpj da empresa inválido',
    'cnpj.required': 'Informe o cnpj da empresa',
    'cnpj.unique': 'Empresa já cadastrada',
    'cnpj.maxLength': 'Cnpj da empresa deve conter 14 caracteres',
    'cnpj.minLength': 'Cnpj da empresa deve conter 14 caracteres',
  }
}
