/*
|--------------------------------------------------------------------------
| Http Exception Handler
|--------------------------------------------------------------------------
|
| AdonisJs will forward all exceptions occurred during an HTTP request to
| the following class. You can learn more about exception handling by
| reading docs.
|
| The exception handler extends a base `HttpExceptionHandler` which is not
| mandatory, however it can do lot of heavy lifting to handle the errors
| properly.
|
*/

import Logger from '@ioc:Adonis/Core/Logger'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'

interface IValidatorMessageError {
  rule: string
  field: string
  message: number
}

interface IError {
  code: string
  message: string
  status: number
  name: string
  messages: IValidatorMessageError
}

export default class ExceptionHandler extends HttpExceptionHandler {
  constructor() {
    super(Logger)
  }

  public async handle(error, { response }) {
    let { code, message, status, name, messages }: IError = error

    if (name === 'ValidationException') {
      return response.status(status).send(messages)
    }

    if (code === 'E_INVALID_JWT_TOKEN') {
      status = 403
      message = 'Malformed JWT'
    }

    if (!code) code = 'SOMETHING_WENT_WRONG'
    if (!message) message = 'Estamos com problema agora, tente novamente mais tarde'

    return response.status(status || 500).send({ error: { code, message } })
  }
}
