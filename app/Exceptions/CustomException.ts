import { LogicalException } from '@adonisjs/generic-exceptions'

import ErrorList from 'Config/errors'

export default class CustomException extends LogicalException {
  constructor(code: string) {
    const { status, message } = ErrorList[`${code}`]

    super(message, status, code)
  }
}
