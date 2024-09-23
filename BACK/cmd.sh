amazon-linux-extras install nginx1
amazon-linux-extras install epel
yum install certbot
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/nginx-selfsigned.key -out /etc/ssl/certs/nginx-selfsigned.crt



server {
    listen 80;
    server_name 98.82.202.169;

    return 301 https://$host$request_uri;
}
server {
    listen 443 ssl;
    server_name 98.82.202.169;

    ssl_certificate /etc/ssl/certs/nginx-selfsigned.crt;
    ssl_certificate_key /etc/ssl/private/nginx-selfsigned.key;

    location / {
        root /usr/share/nginx/html;
        index index.html index.htm;
    }
}





    server {
       listen 80;
       listen [::]:80;
       server_name 3.81.141.248;  # Substitua pelo seu domínio ou IP

    # Redirecionar HTTP para HTTPS
       return 301 https://$host$request_uri;
    }

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name your-domain.com;  # Substitua pelo seu domínio ou IP

    ssl_certificate /etc/ssl/certs/nginx-selfsigned.crt;  # Caminho para seu certificado
    ssl_certificate_key /etc/ssl/private/nginx-selfsigned.key;  # Caminho para sua chave privada

    # Configurações recomendadas para SSL
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers 'TLS_AES_128_GCM_SHA256:TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384:ECDHE-RSA-AES256-GCM-SHA384';
    ssl_prefer_server_ciphers off;

    location / {
        proxy_pass http://localhost:8000;  # Porta onde o FastAPI está rodando
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
