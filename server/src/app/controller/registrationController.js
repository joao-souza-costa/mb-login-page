class RegistrationController {
  async store(request, response) {
    console.log(request.body, 'teste')

    /*  const { name } = request.body
    if (!name) {
      return response.status(400).json({ error: 'Is required' })
    }

    const category = await repositories.create({ name })
*/
    return response.json({ status: 200 })
  }
}

module.exports = new RegistrationController()
