export const AUTH_SECTIONS = {
  EMAIL: 'EMAIL',
  PERSON: 'PERSON',
  COMPANY: 'COMPANY',
  PASSWORD: 'PASSWORD',
  REVIEW: 'REVIEW'
}

export const IDENTiFICATION_TYPE = {
  CNPJ: 'CNPJ',
  CPF: 'CPF'
}

export const PATTERN_EMAIL = '[^@\\s]+@[^@\\s]+\\.[^@\\s]+'

export const PATTERN_PASSWORD = '^\\d{8,}'

export const PATTERN_PHONE = '^\\d{10,11}'

export const PATTERN_CPF = '^\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}'

export const PATTERN_CNPJ = '^\\d{2}\\.\\d{3}\\.\\d{3}/\\d{4}-\\d{2}$'
