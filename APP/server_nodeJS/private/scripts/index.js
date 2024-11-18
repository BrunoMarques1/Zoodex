import { URL } from './url.js'
const cam = document.getElementById('cam');

function getToken() {
    fetch(`${URL}/node_api/getToken`, {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        document.getElementById('username').innerHTML = data.nome
        document.getElementById('profile-pic').style = `background-image: url(${data.foto_perfil});`
    })
    .catch(error => console.error('Erro:', error))
}

async function analise(){
    cam.innerHTML += `<video id="camera" width="640" height="480" autoplay></video>`
    try {
        const constraints = {
            video: { facingMode: 'user' } 
        };
        const stream = await navigator.mediaDevices.getUserMedia({ video: constraints });
        camera.srcObject = stream;
    } catch (err) {
        console.error('Error accessing the camera: ', err);
    }
}

function zoodex(){
    window.location.href = ('/zoodex')
}
function analisar(){
    window.location.href = ('/analisar')
}

document.addEventListener('DOMContentLoaded', getToken)
document.getElementById('analise').addEventListener('click', analisar)
document.getElementById('zoodex').addEventListener('click', zoodex)
