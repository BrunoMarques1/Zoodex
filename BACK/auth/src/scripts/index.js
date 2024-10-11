function logado() {
    fetch('http://localhost:3030/testeLogado', {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(error => console.error('Erro:', error));
}
