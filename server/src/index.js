const express = require('express')
const routes = require('./routes')
const path = require('path')

const app = express()

const staticPath = path.join(__dirname, '..', '..', 'dist')

app.use(express.json())
app.use('/registration', express.static(staticPath))
app.use(routes)
app.listen(3000, () => console.log('server running http://localhost:3000'))
