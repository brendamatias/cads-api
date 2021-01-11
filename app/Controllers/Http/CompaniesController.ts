import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { validateCnpj } from 'App/Services/Utils'
import CompanyValidator from 'App/Validators/CompanyValidator'
import Company from 'App/Models/Company'

export default class CompaniesController {
  public async index({ request, response }: HttpContextContract) {
    const { page, limit } = request.only(['page', 'limit'])

    const companies = await Company.query().paginate(page, limit)

    return companies
  }

  public async store({ request, response }: HttpContextContract) {
    const data = await request.validate(CompanyValidator)

    await validateCnpj(data.cnpj)

    const company = await Company.create(data)

    return response.status(201).send({ data: company })
  }
}
