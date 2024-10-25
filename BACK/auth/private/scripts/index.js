import { URL } from './url.js'

function getToken() {
    fetch(`${URL}/node_api/getToken`, {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        document.getElementById('username').innerHTML = data.nome
    })
    .catch(error => console.error('Erro:', error))
}

document.addEventListener('DOMContentLoaded', getToken)
