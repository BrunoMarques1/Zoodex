const AWS = require('aws-sdk');
AWS.config.update({
    region: 'us-east-1' 
});
const rekognition = new AWS.Rekognition();

async function detectLabels(imageBuffer) {
    const params = {
        Image: {
            Bytes: imageBuffer
        },
        MaxLabels: 20, // Máximo de labels a serem retornadas
        MinConfidence: 40 // Confiança mínima para considerar os labels
    };

    try {
        const response = await rekognition.detectLabels(params).promise();
        return response.Labels || [];
    } catch (error) {
        console.error("Erro ao detectar labels:", error);
        throw new Error("Falha na detecção de labels.");
    }
}

module.exports = { detectLabels };
