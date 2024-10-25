import { URL } from './url.js'


function cadastrar(){
    const nome = document.getElementById('nome').value
    const email = document.getElementById('email').value
    const senha = document.getElementById('senha').value

    
    fetch(`${URL}/node_api/cadastrar`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'nome': nome,
            'email': email,
            'senha': senha
        })
    })
    .then(response => response.text())
    .then(data =>{
        console.log(data)
    })
}

document.getElementById('cadastrar').addEventListener('click', cadastrar)
