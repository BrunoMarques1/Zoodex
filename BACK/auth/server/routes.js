const express = require('express')
const knex = require('knex')
const router = express.Router()
const path = require('path')


router.get('/', (req, res) => res.sendFile(path.join(__dirname, '../src/index.html')))
router.get('/cadastro', (req, res) => res.sendFile(path.join(__dirname, '../src/cadastro.html')))
router.get('/login', (req, res) => res.sendFile(path.join(__dirname, '../src/login.html')))



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
    res.cookie('Email', 'emaasdasdasdail', { httpOnly: true, secure: false })
    return res.json({ message: 'Login bem-sucedido!' })
})





module.exports = router