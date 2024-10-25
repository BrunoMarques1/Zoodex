import { URL } from './url.js'

function login() {
    fetch(`${URL}/node_api/testeCriarCookie`, {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => console.log('Login realizado'))
    .catch(error => console.error('Erro no login:', error))
}

function logado() {
    fetch(`${URL}/node_api/testeVerCookie`, {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => response.text())
    .then(data => console.log('Resposta:', data))
    .catch(error => console.error('Erro:', error))
}

document.getElementById('loginButton').addEventListener('click', login)
document.getElementById('logadoButton').addEventListener('click', logado)
