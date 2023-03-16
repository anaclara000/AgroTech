function carregar() {
    const options2 = { method: 'GET' };
    fetch('http://localhost:3000/Manutencao', options2)
        .then(response => response.json())
        .then(resp => {
            manutencao = resp;
            listarManutencao();
            var ctx = document.getElementById('myGrafic').getContext('2d');
            console.log(resultado);
            var myDoughnutChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Cancelado', 'Finalizado', 'Em manutenção'],
                    datasets: [{
                        data: resultado,
                        backgroundColor: [
                            'rgb(215, 17, 17)',
                            'rgb(0, 128, 0)',
                            'rgb(255, 226, 0)'
                        ]
                    }]
                },
                options: {
                    cutoutPercentage: 50
                }
            });

        });



    const options3 = { method: 'GET' };
    fetch('http://localhost:3000/Veiculos', options3)
        .then(response => response.json())
        .then(resp => {
            veiculo = resp;
            listarVeiculos();
            var ctx = document.getElementById('myGraficFrota').getContext('2d');
            var myDoughnutChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Disponível', 'Indisponível'],
                    datasets: [{
                        data: disponivel,
                        backgroundColor: [
                            'rgb(255, 99, 132)',
                            'rgb(54, 162, 235)'

                        ]
                    }]
                },
                options: {
                    cutoutPercentage: 50
                }
            });
        });

    const options4 = { method: 'GET' };
    fetch('http://localhost:3000/Operacao', options4)
        .then(response => response.json())
        .then(resp => {
            operacao = resp;
            listarOperacao();
            console.log(resultado2)
            var ctx = document.getElementById('myGraficOp').getContext('2d');
            var myDoughnutChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Cancelado', 'Finalizado', 'Em operação'],
                    datasets: [{
                        data: resultado2,
                        backgroundColor: [
                            'rgb(215, 17, 17)',
                            'rgb(0, 128, 0)',
                            'rgb(255, 226, 0)'
                        ]
                    }]
                },
                options: {
                    cutoutPercentage: 50
                }
            });

        });



}

var manutencao = []

var resultado = [0, 0, 0];
function listarManutencao() {
    const freqManMesCarga = contarManutencoesPorMes(manutencao, 'Carga')
    const freqManMesVendas = contarManutencoesPorMes(manutencao, 'Venda')
    const freqManMesVisita = contarManutencoesPorMes(manutencao, 'Visita')
    console.log(freqManMesVendas)

    manutencao.forEach(info => {

        if (info.status == "Cancelada") {
            resultado[0]++

        } else if (info.status == "Finalizada") {
            resultado[1]++

        } else {
            resultado[2]++
        }
    })
    var ctx2 = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx2, {
        type: 'line',
        data: {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Maio', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            datasets: [
                {
                    label: 'Carga',
                    data: freqManMesCarga,
                    fill: false,
                    backgroundColor: 'rgba(96,68, 61)',
                    borderColor: 'rgba(96,68, 61)',
                    tension: 0.1
                },
                {
                    label: 'Vendas',
                    data: freqManMesVendas,
                    fill: false,
                    borderColor: 'rgba(0, 128,0)',
                    backgroundColor: 'rgba(0, 128,0)',
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

var disponivel = [0, 0];
soma = 0
function listarVeiculos() {
    veiculo.forEach(v => {
        soma += 1
        if (v.status == "Disponível") {
            disponivel[0]++
            console.log(disponivel)
        } else {
            disponivel[1]++
        }
    })
}

var operacao = []
var resultado2 = [0, 0, 0];
function listarOperacao() {

    operacao.forEach(info => {

        if (info.status == "Cancelada") {
            resultado2[0]++

        } else if (info.status == "Finalizada") {
            resultado2[1]++

        } else {
            resultado2[2]++
        }
    })

}