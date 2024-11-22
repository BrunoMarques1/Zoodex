import { URL } from './url.js'
const carrosel = document.getElementById('carrosel')

function getInfo() {
    fetch(`${URL}/node_api/getZoodexInfo`, {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
        data.analisados.forEach((element,index) => {
            const isActive = index === 0 ? 'active' : ''; 
            carrosel.innerHTML += `
                <div class="carousel-item ${isActive}">
                    <div class="profile">
                        <div id="profile-pic-${element.id}" class="profile-pic"></div>
                        <p class="nome-animal">${element.nome}</p>
                        <p class="descricao">${element.descricao}</p>
                    </div>
                </div>`
            document.getElementById(`profile-pic-${element.id}`).style = `background-image: url('${element.foto}');`
        });
        data.naoAnalisados.forEach((element,index) => {
            const isActive = (data.analisados.length === 0 && index === 0) ? 'active' : ''; 
            carrosel.innerHTML += `
                <div class="carousel-item ${isActive}">
                    <div class="profile">
                        <div id="profile-pic-${element.id}" class="profile-pic"></div>
                        <p class="nome-animal">???</p>
                        <p class="descricao">Este animal ainda não foi analisado. Para obter mais informações, por favor, realize a análise.</p>
                    </div>
                </div>`
            document.getElementById(`profile-pic-${element.id}`).style = `background-image: url('${element.foto_silhueta}');`
        });
    })
    .catch(error => console.error('Erro:', error))
}

function voltarIndex(){
    window.location.href = ('/')

}

document.addEventListener('DOMContentLoaded', getInfo)
document.getElementById('botaoVoltar').addEventListener('click', voltarIndex)
