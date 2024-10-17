function login() {
    fetch('https://44.206.218.5/node_api/testeCriarCookie', {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => console.log('Login realizado'))
    .catch(error => console.error('Erro no login:', error));
}

function logado() {
    fetch('http://44.206.218.5:3030/node_api/testeVerCookie', {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => response.text())
    .then(data => console.log('Resposta:', data))
    .catch(error => console.error('Erro:', error));
}
