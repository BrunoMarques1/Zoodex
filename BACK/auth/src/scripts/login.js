function logar(){
    const email = document.getElementById('email').value
    const senha = document.getElementById('senha').value

    fetch('http://localhost:3030/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'email': email,
            'senha': senha,
        }),
        credentials: 'include' // para garantir que os cookies sejam enviados
    })
    .then(response => {
        if (response.redirected) {
            window.location.href = response.url; // Redireciona para a URL do servidor
        } else {
            return response.json();
        }
    })
    .then(data => {
        if (data && data.msg) {
            document.getElementById('resultado').innerText = data.msg;
        }
    })
}


function logado() {
    fetch('http://localhost:3030/testeLogado', {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => response.text())
    .then(data => console.log('Resposta:', data))
    .catch(error => console.error('Erro:', error));
}
