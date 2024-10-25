import { URL } from './url.js'

function entrar() {
    const email = document.getElementById('email').value
    const senha = document.getElementById('senha').value

    fetch(`${URL}/node_api/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'email': email,
            'senha': senha,
        }),
        credentials: 'include' 
    })
    .then(response => {
        if (response.redirected) {
            window.location.href = response.url 
        } else {
            return response.json() 
        }
    })
    .then(data => {
        if (data && data.msg) {
            alert('Erro ao tentar fazer login.')
            //document.getElementById('resultado').innerText = data.msg // Mostra mensagem de erro ou sucesso
        }
    })
    .catch(data => {
        if (data && data.msg) {
            alert('Erro ao tentar fazer login.')
            //document.getElementById('resultado').innerText = data.msg // Mostra mensagem de erro ou sucesso
        }
    })
}

document.getElementById('entrar').addEventListener('click', entrar)
