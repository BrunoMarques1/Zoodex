const camera = document.getElementById("camera")
const photo = document.getElementById("photo")
const context = photo.getContext('2d');



async function startCamera(cameraMode) {
    const contraints = {video: {facinMode: {
        exact: 'environment'
      }}}
    const stream = await navigator.mediaDevices.getUserMedia({video:contraints})
    camera.srcObject = stream
}

function captureFoto(){
    context.drawImage(camera, 0, 0, photo.width, photo.height);
}