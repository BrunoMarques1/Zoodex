const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const path = require('path')
const app = express()
const rotas_api = require('./routes_api.js')
const routes_pages = require('./routes_pages.js')
const URL = require('./url.js')
const authMiddleware = require('./authMiddleware.js')


app.use(cors({
    origin: URL,
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())


app.use('/node_api/public',express.static(path.join(__dirname, '../public')))
app.use('/node_api/private',authMiddleware,express.static(path.join(__dirname, '../private')))



app.use('/', rotas_api)
app.use('/', routes_pages)




app.listen(3030,'0.0.0.0', () => {
    console.log('Servidor online.')
});
