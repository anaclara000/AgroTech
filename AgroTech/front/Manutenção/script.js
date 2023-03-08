
var veiculo = []
var disponivel = [0, 0];
function listarVeiculo() {

    veiculo.forEach(veiculo => {
        if (veiculo.status == "Disponível") {
            disponivel[0]++
        } else {
            disponivel[1]++
        }


    })



}



function carregar() {
    const options2 = { method: 'GET' };
    fetch('http://localhost:3000/Manutencao', options2)
        .then(response => response.json())
        .then(resp => {
            manutencao = resp;
            listarManutencao();
        });

    const options4 = { method: 'GET' };
    fetch('http://localhost:3000/Veiculos', options4)
        .then(response => response.json())
        .then(resp => {
            veiculo = resp;
            listarVeiculo();
        });

}





const listManutencao = document.querySelector(".list_manitence");
const tbodyManutencao = document.querySelector(".tbody_list_manitence");
var manutencao = []

function listarManutencao() {
    const freqManMesCarga = contarManutencoesPorMes(manutencao, 'Carga')
    const freqManMesVendas = contarManutencoesPorMes(manutencao, 'Venda')
    const freqManMesVisita = contarManutencoesPorMes(manutencao, 'Visita')
    console.log(freqManMesVendas)

    manutencao.forEach(info => {

        var lista = listManutencao.cloneNode(true);
        lista.classList.remove('model')

        lista.querySelector('#id').innerHTML = info.id
        lista.querySelector("#dataI").innerHTML = info.data_inicio.slice(0, 10);
        if (info.data_fim == null) {
            lista.querySelector("#dataF").innerHTML = "-";
            lista.querySelector(".img_icon").src = "../../assets/Mvermelho.png"

        } else {
            lista.querySelector("#dataF").innerHTML = info.data_fim.slice(0, 10);
            lista.querySelector(".img_icon").src = "../../assets/Mverde.png"
        }

        lista.querySelector("#valor").innerHTML = "R$" + info.valor;
        lista.querySelector("#descricao").innerHTML = info.descricao;
        tbodyManutencao.appendChild(lista)

        var ctx = document.getElementById('myChart').getContext('2d');
        var chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
                datasets: [
                    {
                        label: 'Carga',
                        data: freqManMesCarga,
                        fill: false,
                        backgroundColor: 'rgba(255, 99, 132)',
                        borderColor: 'rgba(255, 99, 132)',
                        tension: 0.1
                    },
                    {
                        label: 'Vendas',
                        data: freqManMesVendas,
                        fill: false,
                        borderColor: 'rgba(255, 206, 86)',
                        backgroundColor: 'rgba(255, 206, 86)',
                        tension: 0.1
                    },
                    {
                        label: 'Visita',
                        data: freqManMesVisita,
                        fill: false,
                        borderColor: 'rgba(54, 162, 235)',
                        backgroundColor: 'rgba(54, 162, 235)',
                        tension: 0.1
                    }
                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });


        // Selecione o elemento canvas
    //     var ctx = document.getElementById('meuGraficoDoughnut').getContext('2d');

    //     // Crie um objeto de dados para o gráfico
    //     var data = {
    //         labels: ['Red', 'Blue', 'Yellow'],
    //         datasets: [{
    //             label: 'My First Dataset',
    //             data: [300, 50, 100],
    //             backgroundColor: [
    //                 'rgb(255, 99, 132)',
    //                 'rgb(54, 162, 235)',
    //                 'rgb(255, 205, 86)'
    //             ],
    //             hoverOffset: 4
    //         }]
    //     };

    //     // Crie as opções para o gráfico
    //     var options = {
    //         responsive: true,
    //         maintainAspectRatio: false,
    //         plugins: {
    //             legend: {
    //                 position: 'top',
    //             },
    //             title: {
    //                 display: true,
    //                 text: 'Exemplo de gráfico de Doughnut'
    //             }
    //         }
    //     };

    //     // Crie o gráfico
    //     var myChart = new Chart(ctx, {
    //         type: 'doughnut',
    //         data: data,
    //         options: options
    //     });


    })
}

function contarManutencoesPorMes(listaDeManutencoes, tipoDeVeiculo) {
    const manutencoesPorMes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    listaDeManutencoes.forEach(manutencao => {
        console.log(tipoDeVeiculo)
        if (manutencao.veiculos.tipo === tipoDeVeiculo) {
            const dataDaManutencao = new Date(manutencao.data_inicio);
            const mesDaManutencao = dataDaManutencao.getMonth();

            manutencoesPorMes[mesDaManutencao]++;
        }
    })


    return manutencoesPorMes
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

// GRAFICOS




// INFOS DO USUARIO 
const nome = document.querySelector(".nameUser");
var userinfo = JSON.parse(localStorage.getItem("info"));

nome.innerHTML = userinfo.name;
