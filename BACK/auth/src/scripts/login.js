function logar(){
    const email = document.getElementById('email').value
    const senha = document.getElementById('senha').value

    fetch('http://localhost:3030/node_api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'email': email,
            'senha': senha,
        }),
        credentials: 'include'
    })
    .then(response => {
        if (response.redirected) {
            window.location.href = response.url
        } else {
            return response.json()
        }
    })
    .then(data => {
        if (data && data.msg) {
            document.getElementById('resultado').innerText = data.msg
        }
    })
}