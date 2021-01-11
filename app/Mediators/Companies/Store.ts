import responses from 'Config/httpResponses'
import Company from 'App/Models/Company'
import CompanyValidator from 'App/Validators/CompanyValidator'
import { validateCnpj } from 'App/Services/Utils'

export default async (request) => {
  const data = await request.validate(CompanyValidator)

  await validateCnpj(data.cnpj)

  const company = await Company.create(data)

  return responses.created(company)
}
