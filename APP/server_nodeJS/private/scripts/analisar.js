document.addEventListener('DOMContentLoaded', function () {
    const camera = document.getElementById("camera")
    const photo = document.getElementById("photo")
    const context = photo.getContext('2d')
    const resultDiv = document.getElementById("resultado")
    let stream
    
    
    async function startCamera(facingMode) {

        if (stream) {
            let tracks = stream.getTracks()
            tracks.forEach(track => track.stop())  // Para todas as trilhas de vídeo
        }
        const constraints = {
            video: {
                facingMode: {
                    exact: facingMode
                },
                width: {
                    min: 1280,
                    ideal: 1920,
                    max: 3000,
                },
                height: {
                    min: 720,
                    ideal: 1080,
                    max: 4000
                }  
            } 
        }
        stream = await navigator.mediaDevices.getUserMedia(constraints)
        camera.srcObject = stream

    }

    function captureTeste(imagePath) {
        const img = new Image()
        img.src = imagePath
        img.onload = function() {
            context.clearRect(0, 0, photo.width, photo.height) 
            context.drawImage(img, 0, 0, photo.width, photo.height)
        }
    }
    
    function captureFoto(){
        context.drawImage(camera, 0, 0, photo.width, photo.height)
    }

    async function uploadPhoto() {
        const formData = new FormData()
        photo.toBlob(blob => {
            formData.append('file', blob, 'photo.jpg')

            fetch('http://localhost:3030/node_api/detect/', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                resultDiv.innerHTML = '<h2>Animal detectado:</h2>'
                //if (data.labels && data.labels.length > 0) {
                //    data.labels.forEach(label => {
                //        resultDiv.innerHTML += `<p>- ${label.name}: ${label.confidence}%</p>`
                //    })

                resultDiv.innerHTML += `<p> Nome: ${data.nome}</p>`
                resultDiv.innerHTML += `<p> Descrição: ${data.descricao}</p>`
                console.log(data)
//                    } else {
//                        resultDiv.innerHTML += '<p>No elements detected in the image.</p>'
//                    }
            })
            .catch(error => {
                resultDiv.innerHTML = '<h2>Não foi possível detectar animais</h2>'
                //console.error('Error uploading the photo:', error)
            })
        }, 'image/jpeg')
    }

    

//    async function getDevices() {
//    const devices = await navigator.mediaDevices.enumerateDevices()
//    
//    // Limpa a lista de dispositivos antes de adicionar novos
//    document.getElementById("devices").innerHTML = ''
//
//    for (const device of devices) {
//        // Acessa o tipo de dispositivo e o nome
//        document.getElementById("devices").innerHTML += `<p>${device.kind}: ${device.label || 'Sem nome'} | ${device.deviceId}</p>`
//    }
//
//    console.log(devices)
//    }

    window.captureTeste = captureTeste
    window.startCamera = startCamera
    window.captureFoto = captureFoto
//  window.getDevices = getDevices
    window.uploadPhoto = uploadPhoto
})
