const express = require('express')
const knex = require('./database.js')
const router = express.Router()
const path = require('path')
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')
const secretKey = 'senha'
const authMiddleware = require('./authMiddleware.js')


router.get('/node_api/cadastro', (req, res) => res.sendFile(path.join(__dirname, '../public/cadastro.html')))
router.get('/node_api/login', (req, res) => res.sendFile(path.join(__dirname, '../public/login.html')))
router.get('/node_api/', authMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, '../private/index.html'));
})


router.post('/node_api/cadastrar', async (req,res) =>{
    const {nome,email,senha} = req.body
    const hashSenha = await bcrypt.hash(senha,saltRounds)
    knex('usuarios').insert({
        nome: nome,
        email: email,
        senha: hashSenha,
    }).then((dados) => {
        res.send('Usuário cadastrado')
    })
})


router.post('/node_api/login', async (req, res) => {
    const { email, senha } = req.body

    try{
        const usuario = await knex('usuarios').where({ email }).first()
        if(!usuario){return res.status(401).json({msg:'Email e/ou senha incorretos.'})}
        const senhaCorreta = await bcrypt.compare(senha, usuario.senha)
        if(!senhaCorreta){return res.status(401).json({msg:'Email e/ou senha incorretos.'})}

        const token = jwt.sign({id: usuario.id, nome: usuario.nome, email: usuario.email},secretKey,{expiresIn: '1h'})
        res.cookie('TokenAuth', token, { httpOnly: true, secure: false })
        return res.redirect('/node_api/');
    }
    catch (error) {
        res.status(500).json({ msg: 'Erro ao fazer login.' });
    }
})


router.get('/node_api/getToken', async (req, res) => {
    const cookie = req.cookies.TokenAuth
    if (cookie) {
        const info = jwt.verify(cookie,secretKey)
        const usuario = await knex('usuarios').where({ id: info.id }).first()
        res.send(usuario)
    } else {
        console.log('Nenhum cookie encontrado')
        res.send('Nenhum cookie encontrado')
    }
})



module.exports = router