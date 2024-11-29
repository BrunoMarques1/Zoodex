import { URL } from './url.js'

document.addEventListener('DOMContentLoaded', getToken)
document.getElementById('analise').addEventListener('click', () => analise('user'))
document.getElementById('zoodex').addEventListener('click', zoodex)
document.getElementById('mapazoo').addEventListener('click', mapazoo)


const menu = document.getElementById('menu')
const display = document.getElementById('display')
let stream = null 
let camera = null
let lastFacingMode = null
const resultDiv = document.getElementById("resultado")


function getToken() {
    fetch(`${URL}/node_api/getToken`, {
        method: 'GET',
        credentials: 'include'
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            document.getElementById('username').innerHTML = data.nome
            document.getElementById('profile-pic').style = `background-image: url(${data.foto_perfil})`
        })
        .catch(error => console.error('Erro:', error))
}

async function analise(facingMode) {
    lastFacingMode = facingMode
    display.innerHTML = `<video class="video-container mt-4" id="camera" width="640" height="480" autoplay></video>`
    putButtons()

    if (stream) {
        stream.getTracks().forEach(track => track.stop())
    }

    const constraints = {
        video: {
            facingMode: {
                exact: facingMode
            }
        }
    }

    try {
        stream = await navigator.mediaDevices.getUserMedia(constraints)
        camera = document.getElementById('camera')
        camera.srcObject = stream

    } catch (err) {
        console.error('Erro ao acessar a câmera:', err)
    }
}

async function uploadPhoto(photo) {
    const formData = new FormData()
    photo.toBlob(blob => {
        formData.append('file', blob, 'photo.jpg')

        fetch(`${URL}/node_api/detect/`, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            resultDiv.style.display = 'block';
            resultDiv.innerHTML = '<h2>Animal detectado:</h2>'
        //if (data.labels && data.labels.length > 0) {
            //    data.labels.forEach(label => {
            //        resultDiv.innerHTML += `<p>- ${label.name}: ${label.confidence}%</p>`
            //    })

            resultDiv.innerHTML += `<p> Nome: ${data.nome}</p>`
            resultDiv.innerHTML += `<p> Descrição: ${data.descricao}</p>`
            console.log(data)
//                   } else {
//                       resultDiv.innerHTML += '<p>No elements detected in the image.</p>'
//                   }
        })
        .catch(error => {
            resultDiv.innerHTML = '<h2>Não foi possível detectar animais</h2>'
            //console.error('Error uploading the photo:', error)
    })
    }, 'image/jpeg')
}

function tirarFoto(){
    display.innerHTML = `<canvas class="video-container mt-4" id="photo" width="640" height="480"></canvas>`
    const photo = document.getElementById('photo')
    const context = photo.getContext('2d')
    context.drawImage(camera, 0, 0, photo.width, photo.height)
    uploadPhoto(photo)
}

function inverterCamera(){
    if (lastFacingMode === 'user'){
        analise('environment')
    }else{
        analise('user')
    }
    
}

function zoodex() {
    window.location.href = '/zoodex'
}

function voltar() {
    window.location.href = '/'
}
function mapazoo() {
    window.location.href = '/mapazoo'
}

function putButtons() {
    menu.style.height = '30%'
    menu.innerHTML = `
        <button class="menu-btn" id="tirarFoto">TIRAR FOTO</button>
        <button class="menu-btn" id="inverterCamera">TROCAR CAMERA</button>
        <button class="menu-btn" id="voltar">VOLTAR</button>
    `

    document.getElementById('tirarFoto').addEventListener('click', tirarFoto)
    document.getElementById('voltar').addEventListener('click', voltar)
    document.getElementById('inverterCamera').addEventListener('click', inverterCamera)
}