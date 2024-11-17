import { URL } from './url.js'

function login() {
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
            alert(data.msg)
            //document.getElementById('resultado').innerText = data.msg 
        }
    })
}

function signin(){
    window.location.href = ('./cadastro')
}

document.getElementById('login').addEventListener('click', login)
document.getElementById('signin').addEventListener('click', signin)
