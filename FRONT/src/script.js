        const startCameraButton = document.getElementById('startCamera');
        const captureButton = document.getElementById('capture');
        const uploadButton = document.getElementById('upload');
        const clearButton = document.getElementById('clear');
        const camera = document.getElementById('camera');
        const photo = document.getElementById('photo');
        const resultDiv = document.getElementById('result');
        const context = photo.getContext('2d');
        let imageDataUrl;

        async function startCamera() {
            try {
                const constraints = {
                    video: { facingMode: 'environment' } // Use 'environment' for the rear camera
                };
                const stream = await navigator.mediaDevices.getUserMedia({ video: constraints });
                camera.srcObject = stream;
                camera.style.display = 'block';
                startCameraButton.disabled = true;
                captureButton.disabled = false;
            } catch (err) {
                console.error('Error accessing the camera: ', err);
            }
        }

        function capturePhoto() {
            context.drawImage(camera, 0, 0, photo.width, photo.height);
            photo.style.display = 'block';
            captureButton.disabled = true;
            uploadButton.disabled = false;
        }

        async function uploadPhoto() {
            const formData = new FormData();
            photo.toBlob(blob => {
                formData.append('file', blob, 'photo.jpg');

                fetch('https://zoodex.site/detect/', {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    resultDiv.innerHTML = '<h2>Detected Elements:</h2>';
                    if (data.labels && data.labels.length > 0) {
                        data.labels.forEach(label => {
                            resultDiv.innerHTML += `<p>- ${label.name}: ${label.confidence}%</p>`;
                        });
                    } else {
                        resultDiv.innerHTML += '<p>No elements detected in the image.</p>';
                    }
                })
                .catch(error => {
                    console.error('Error uploading the photo:', error);
                });
            }, 'image/jpeg');
        }

        function clearPhoto() {
            context.clearRect(0, 0, photo.width, photo.height);
            photo.style.display = 'none';
            resultDiv.innerHTML = '';
            startCameraButton.disabled = false;
            captureButton.disabled = true;
            uploadButton.disabled = true;
        }

        startCameraButton.addEventListener('click', startCamera);
        captureButton.addEventListener('click', capturePhoto);
        uploadButton.addEventListener('click', uploadPhoto);
        clearButton.addEventListener('click', clearPhoto);