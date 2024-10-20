const express = require('express')
const knex = require('./database.js')
const router = express.Router()
const path = require('path')
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')
const secretKey = 'senha'
const authMiddleware = require('./authMiddleware.js')


router.get('/node_api/cadastro', (req, res) => res.sendFile(path.join(__dirname, '../src/cadastro.html')))
router.get('/node_api/login', (req, res) => res.sendFile(path.join(__dirname, '../src/login.html')))
router.get('/node_api/index', authMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, '../src/principal.html'));
})


router.post('/node_api/cadastrar', async (req,res) =>{
    const {email,senha,informacoes} = req.body
    const hashSenha = await bcrypt.hash(senha,saltRounds)
    knex('usuarios').insert({
        email: email,
        senha: hashSenha,
        informacoes: informacoes
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

        const token = jwt.sign({id: usuario.id, email: usuario.email},secretKey,{expiresIn: '1h'})
        res.cookie('TokenAuth', token, { httpOnly: true, secure: false })
        return res.redirect('/index');
    }
    catch (error) {
        res.status(500).json({ msg: 'Erro ao fazer login.' });
    }
})





module.exports = router