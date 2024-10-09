function logar(){
    const email = document.getElementById('email').value
    const senha = document.getElementById('senha').value
    const resultado = document.getElementById('resultado')

    
    fetch('http://localhost:3030/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'email': email,
            'senha': senha,
        })
    })
    .then(response => response.json())
    .then(data =>{
        resultado.innerHTML = `<p>${data.informacoes}</p>` 
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
