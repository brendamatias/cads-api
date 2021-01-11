import Company from 'App/Models/Company'
import responses from 'Config/httpResponses'

export default async ({ page = 1, limit = 20 }) => {
  const companies = await Company.query().paginate(page, limit)

  return responses.okPaginated(companies)
}
