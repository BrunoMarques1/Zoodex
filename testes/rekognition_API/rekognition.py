from typing import List
import boto3

def detect_labels(image_bytes: bytes) -> List[dict]:
    client = boto3.client('rekognition')
    
    response = client.detect_labels(
        Image={'Bytes': image_bytes},
        MaxLabels=20,  
        MinConfidence=40 
    )
    return response.get('Labels', [])