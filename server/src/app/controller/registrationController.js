class RegistrationController {
  hasEmptyField(body) {
    for (const key in body) {
      if (!body[key]) return { key, error: 'is required' }
    }
    return body
  }

  async store(request, response) {
    const checkFields = this.hasEmptyField(request.body)

    if (checkFields.error) return response.status(400).json(checkFields)

    return response.json(checkFields)
  }
}

module.exports = new RegistrationController()
