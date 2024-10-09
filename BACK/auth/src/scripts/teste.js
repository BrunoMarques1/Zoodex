function login() {
    fetch('http://localhost:3030/testeLogin', {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => console.log('Login realizado'))
    .catch(error => console.error('Erro no login:', error));
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
