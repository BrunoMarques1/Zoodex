import { URL } from './url.js'
function getInfo() {
    fetch(`${URL}/node_api/getZoodexInfo`, {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        data.analisados.forEach(element => {
            document.getElementById('analisado').innerHTML += element.nome + '<br>'
        });
        data.naoAnalisados.forEach(element => {
            document.getElementById('naoAnalisado').innerHTML += element.nome + '<br>'
        });
    })
    .catch(error => console.error('Erro:', error))
}



document.addEventListener('DOMContentLoaded', getInfo)
