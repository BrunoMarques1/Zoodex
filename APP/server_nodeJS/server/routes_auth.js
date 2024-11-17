const express = require('express')
const knex = require('./database.js')
const router = express.Router()
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')
const secretKey = 'senha'


router.post('/node_api/cadastrar', async (req,res) =>{
    const {nome,email,senha} = req.body
    const hashSenha = await bcrypt.hash(senha,saltRounds)
    try{
        const usuario = await knex('usuarios').where({ email }).first()
        if(!usuario){
            knex('usuarios').insert({
                nome: nome,
                email: email,
                senha: hashSenha,
            }).then((dados) => {
                return res.redirect('/');
            })
        } else{
            return res.status(401).json({msg:'Usuário já cadastrado.'})
        }
    }catch (error) {
        res.status(500).json({ msg: 'Erro ao cadastrar.' });
    }
})


router.post('/node_api/login', async (req, res) => {
    const { email, senha } = req.body

    try{
        const usuario = await knex('usuarios').where({ email }).first()
        if(!usuario){return res.status(401).json({msg:'Usuário não cadastrado.'})}
        const senhaCorreta = await bcrypt.compare(senha, usuario.senha)
        if(!senhaCorreta){return res.status(401).json({msg:'Email e/ou senha incorretos.'})}

        const token = jwt.sign({id: usuario.id, nome: usuario.nome, email: usuario.email},secretKey,{expiresIn: '1h'})
        res.cookie('TokenAuth', token, { httpOnly: true, secure: false })
        return res.redirect('/');
    }
    catch (error) {
        res.status(500).json({ msg: 'Erro ao fazer login.' });
    }
})

module.exports = router