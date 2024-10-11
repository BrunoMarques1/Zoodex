const express = require('express')
const knex = require('knex')
const router = express.Router()
const path = require('path')
const jwt = require('jsonwebtoken')



router.get('/teste', (req, res) => res.sendFile(path.join(__dirname, '../src/teste.html')))


router.get('/testeLogin', async (req, res) => {
    res.cookie('Teste', 'teste123', { httpOnly: true, secure: false }) 
    res.send('Cookie definido.')
})


router.get('/testeLogado', async (req, res) => {
    const cookie = req.cookies.TokenAuth
    if (cookie) {
        console.log(cookie)
        res.send(jwt.verify(cookie,'senha'))
    } else {
        console.log('Nenhum cookie encontrado')
        res.send('Nenhum cookie encontrado')
    }
})






module.exports = router