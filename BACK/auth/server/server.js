const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const path = require('path')
const app = express()
const rotas = require('./routes.js')
const rotasTeste = require('./routes.teste.js')
const URL = require('./url.js')


app.use(cors({
    origin: URL,
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())
app.use('/node_api/',express.static(path.join(__dirname, '../src')))

app.use('/', rotas)
app.use('/', rotasTeste)




app.listen(3030, () => {
    console.log('Servidor online.')
})
