function cadastrar(){
    const email = document.getElementById('email').value
    const senha = document.getElementById('senha').value
    const informacoes = document.getElementById('informacoes').value

    
    fetch('http://localhost:3030/cadastrar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'email': email,
            'senha': senha,
            'informacoes': informacoes
        })
    })
    .then(response => response.text())
    .then(data =>{
        console.log(data)
    })
}