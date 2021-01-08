import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Company from 'App/Models/Company'

import { validateCnpj } from 'App/Services/Utils'

export default class CompaniesController {
  public async index({ request, response }: HttpContextContract) {
    const { page, limit } = request.only(['page', 'limit'])

    const companies = await Company.query().paginate(page, limit)

    return companies
  }

  public async store({ request, response }: HttpContextContract) {
    const { name, cnpj } = request.only(['name', 'cnpj'])

    await validateCnpj(cnpj)

    return
    const company = await Company.create({ name, cnpj })

    return response.status(201).send({ company })
  }
}
