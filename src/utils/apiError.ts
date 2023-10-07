const ERROR_MESSAGES = {
  USER_NOT_FOUND: 'Usuário não encontrado.',
  WRONG_PASSWORD: 'Senha incorreta.',
  JWT_MISSING: 'Ocorreu um erro de autenticação. Por favor, tente novamente.',
  DEFAULT: 'Contate o desenvolvedor.',
}

const STATUS_CODE_TO_ERROR_MESSAGE_MAP: { [key: number]: string } = {
  404: ERROR_MESSAGES.USER_NOT_FOUND,
  401: ERROR_MESSAGES.WRONG_PASSWORD,
  500: ERROR_MESSAGES.JWT_MISSING,
}

export { STATUS_CODE_TO_ERROR_MESSAGE_MAP, ERROR_MESSAGES }
