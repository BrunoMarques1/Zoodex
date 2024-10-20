const express = require('express')
const router = express.Router()
const path = require('path')
const jwt = require('jsonwebtoken')



router.get('/node_api/teste', (req, res) => res.sendFile(path.join(__dirname, '../src/verCookie.html')))


router.get('/node_api/testeCriarCookie', async (req, res) => {
    res.cookie('Teste', 'teste123', { httpOnly: true, secure: false })
    console.log('Cookie criado') 
    res.send('Cookie definido.')
})


router.get('/node_api/testeVerCookie', async (req, res) => {
    const cookie = req.cookies.Teste
    if (cookie) {
        console.log(cookie)
        res.send(cookie)
    } else {
        console.log('Nenhum cookie encontrado')
        res.send('Nenhum cookie encontrado')
    }
})


router.get('/node_api/testeVerCookieBruno', async (req, res) => {
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