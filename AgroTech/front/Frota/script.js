
function carregar() {
    const options2 = { method: 'GET' };
    fetch('http://localhost:3000/Veiculos', options2)
        .then(response => response.json())
        .then(resp => {
            veiculo = resp;
            listarVeiculos();
        });


    // var ctx = document.getElementById('myGrafic').getContext('2d');
    // var myDoughnutChart = new Chart(ctx, {
    //     type: 'doughnut',
    //     data: {
    //         labels: ['Disponível', 'Indisponível'],
    //         datasets: [{
    //             data: disponivel,
    //             backgroundColor: [
    //                 'rgb(255, 99, 132)',
    //                 'rgb(54, 162, 235)'

    //             ]
    //         }]
    //     },
    //     options: {
    //         cutoutPercentage: 50
    //     }
    // });
}



const listVeiculo = document.querySelector(".list_veiculos");
const tbodyVeiculos = document.querySelector(".tbody_list_veiculos");
var veiculo = []
var disponivel = [0, 0];
soma = 0
function listarVeiculos() {
    veiculo.forEach(v => {
        soma += 1
        var lista = listVeiculo.cloneNode(true);
        lista.classList.remove('model')
        lista.querySelector('#id').innerHTML = v.id;
        lista.querySelector('#placa').innerHTML = v.placa;
        lista.querySelector('#modelo').innerHTML = v.modelo;
        lista.querySelector('#marca').innerHTML = v.marca;
        lista.querySelector('#tipo').innerHTML = v.tipo;
        if (v.status == 'Indisponível') {
            lista.querySelector('.img_icon').src = '../../assets/Cvermelho.png'
        } else {
            lista.querySelector('.img_icon').src = '../../assets/Cverde.png'
        }

        tbodyVeiculos.appendChild(lista)

        if (v.status == "Disponível") {
            disponivel[0]++
            console.log(disponivel)
        } else {
            disponivel[1]++
        }
    })

    document.querySelector('.qtd_veiculo').innerHTML = soma
}


function abrirModalCreate() {
    var modalCreate = document.querySelector('.painel')
    modalCreate.classList.toggle('model')


}

function cad() {
    let inputPlaca = document.querySelector('#placaCad').value
    let inputModelo = document.querySelector('#modeloCad').value
    let inputMarca = document.querySelector('#marcaCad').value

    var select_tipo = document.querySelector(".tipoCad")
    let seleStatus = select_tipo.options[select_tipo.selectedIndex].value;

    if (seleStatus == 'select_infos') { var tipo = 'Vazio' }
    if (seleStatus == 'carga') { var tipo = 'Carga' }
    if (seleStatus == 'visita') { var tipo = 'Visita' }
    if (seleStatus == 'venda') { var tipo = 'Venda' }

    let info = JSON.stringify({
        "placa": inputPlaca,
        "modelo": inputModelo,
        "marca": inputMarca,
        "tipo": tipo,
        "status": "Disponível"
    })

    if (tipo == 'Vazio') {
        var modalMsg = document.querySelector('.msg')
        modalMsg.classList.remove('model')
    } else {
        console.log(info)
        fetch('http://localhost:3000/Veiculos', {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": info
        })
            .then(response => response.json())
            .then(resp => {
                window.location.reload()

            })
    }


}


var search_btn = document.querySelector('#btn-filter')
const INPUT_BUSCA = document.querySelector('.search')
const TABELA_CLIENTES = document.querySelector('.table')

search_btn.addEventListener('click', () => {

    let expressao = INPUT_BUSCA.value

    let linhas = TABELA_CLIENTES.getElementsByTagName('tr')

    for (let posicao in linhas) {
        if (true === isNaN(posicao)) {
            continue
        }
        let conteudoDaLinha = linhas[posicao].innerHTML
        conteudoDaLinha.toUpperCase()
        if (true === conteudoDaLinha.includes(expressao)) {
            linhas[posicao].style.display = ''
        } else {
            linhas[posicao].style.display = 'none'
        }
    }
})
// INFOS DO USUARIO 
const nome = document.querySelector(".nameUser");
var userinfo = JSON.parse(localStorage.getItem("info"));

nome.innerHTML = userinfo.name;
