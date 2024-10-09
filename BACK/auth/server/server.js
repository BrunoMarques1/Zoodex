const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const path = require('path')
const app = express()
const bcrypt = require('bcrypt')
const knex = require('./database.js')
const saltRounds = 10

app.use(cors({
    origin: 'http://localhost:3030', // Endereço do front-end
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../src')))




app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../src/index.html')))
app.get('/cadastro', (req, res) => res.sendFile(path.join(__dirname, '../src/cadastro.html')))
app.get('/logar', (req, res) => res.sendFile(path.join(__dirname, '../src/login.html')))

app.get('/testeLogin', async (req, res) => {
    res.cookie('Teste', 'teste123', { httpOnly: true, secure: false }) // Cookie de teste
    res.send('Cookie definido.')
})

app.get('/testeLogado', async (req, res) => {
    const cookie = req.cookies.Teste
    if (cookie) {
        console.log(cookie)
        res.send('Cookie encontrado: ' + cookie)
    } else {
        console.log('Nenhum cookie encontrado')
        res.send('Nenhum cookie encontrado')
    }
})


app.post('/cadastrar', async (req,res) =>{
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


app.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    try {
        // Verifica se o usuário existe
        const usuario = await knex('usuarios').where({ email }).first();
        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        // Valida a senha
        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if (!senhaValida) {
            return res.status(401).json({ message: 'Senha incorreta.' });
        }

        // Armazena um cookie com o email do usuário (ou um token de sessão)
        res.cookie('email', email, { httpOnly: true, secure: false }); // Ajuste secure: true se estiver usando HTTPS
        return res.status(200).json({ message: 'Login bem-sucedido.' });

    } catch (error) {
        console.error('Erro no login:', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});

app.listen(3030, () => {
    console.log('Servidor online.')
})
