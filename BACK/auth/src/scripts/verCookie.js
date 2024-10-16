function login() {
    fetch('https://zoodex.site/node_api/testeCriarCookie', {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => console.log('Login realizado'))
    .catch(error => console.error('Erro no login:', error));
}

function logado() {
    fetch('https://zoodex.site/node_api/testeVerCookie', {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => response.text())
    .then(data => console.log('Resposta:', data))
    .catch(error => console.error('Erro:', error));
}
