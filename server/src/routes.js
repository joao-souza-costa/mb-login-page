const { Router } = require('express')
const registrationController = require('./app/controller/registrationController')

const routes = Router()

routes.get('/', (req, res) => res.redirect('/registration'))
routes.post('/registration', registrationController.store.bind(registrationController))

module.exports = routes
