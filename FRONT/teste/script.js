const camera = document.getElementById("camera")
const photo = document.getElementById("photo")
const context = photo.getContext('2d');



async function startCamera() {
    const constraints = {
        video: { facingMode: 'environment' } // Usa 'environment' para a câmera traseira
    };
    const stream = await navigator.mediaDevices.getUserMedia({video:constraints})
    camera.srcObject = stream
}

function captureFoto(){
    context.drawImage(camera, 0, 0, photo.width, photo.height);
}