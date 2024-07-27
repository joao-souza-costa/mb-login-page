export function parseToBrazilianFormat(date) {
  const value = date instanceof Date ? date : new Date(date)
  return value.toLocaleDateString('pt-BR')
}

export function parseToISO8601(date) {
  const value = date instanceof Date ? date : new Date(date)
  return value.toISOString().split('T')[0]
}
