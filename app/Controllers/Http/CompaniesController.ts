import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import mediator from 'App/Mediators/Companies'

export default class CompaniesController {
  public async index({ request, response }: HttpContextContract) {
    const { status, data } = await mediator.List(request.only(['page', 'limit']))

    return response.status(status).send(data)
  }

  public async store({ request, response }: HttpContextContract) {
    const { status, data } = await mediator.Store(request)

    return response.status(status).send(data)
  }
}
