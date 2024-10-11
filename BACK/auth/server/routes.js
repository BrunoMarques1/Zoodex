const express = require('express')
const knex = require('./database.js')
const router = express.Router()
const path = require('path')
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')
const secretKey = 'senha'

router.get('/', (req, res) => res.sendFile(path.join(__dirname, '../src/index.html')))
router.get('/cadastro', (req, res) => res.sendFile(path.join(__dirname, '../src/cadastro.html')))
router.get('/login', (req, res) => res.sendFile(path.join(__dirname, '../src/login.html')))
router.get('/index', (req, res) => res.sendFile(path.join(__dirname, '../src/index.html')))



router.post('/cadastrar', async (req,res) =>{
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
router.post('/login', async (req, res) => {
    const { email, senha } = req.body

    const usuario = await knex('usuarios').where({ email }).first()

    if(usuario){
        const auth = await bcrypt.compare(senha, usuario.senha)
        if(auth){
            const token = jwt.sign({id: usuario.id, email: usuario.email},secretKey,{expiresIn: '1h'})
            res.cookie('TokenAuth', token, { httpOnly: true, secure: false })
            return res.redirect('/index');
        }else{
            return res.send({msg: 'Senha incorreta'})
        }
    }else{
        return res.send({msg: 'Email incorreto ou usuário inexistente'})
    }

})





module.exports = router