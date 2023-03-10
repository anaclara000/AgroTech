
var veiculo = []




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



        var hoje = new Date();
        var hora = hoje.getHours();
        var minutos = hoje.getMinutes();
        var segundos = hoje.getSeconds();
        horaAtual = hora + ':' + minutos + ":" + segundos;
        document.querySelector('#data').value = horaAtual
    
        let inptData = document.querySelector('#data')
        inptData.disabled = true
   

        var ctx = document.getElementById('myGrafic').getContext('2d');
        var myDoughnutChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Red', 'Blue', 'Yellow'],
                datasets: [{
                    data: [30, 50, 20],
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 205, 86)'
                    ]
                }]
            },
            options: {
                cutoutPercentage: 50
            }
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
            lista.querySelector(".img_icon").src = "../../assets/Camarelo.png"

        } else {
            lista.querySelector("#dataF").innerHTML = info.data_fim.slice(0, 10);
            lista.querySelector(".img_icon").src = "../../assets/Cverde.png"
        }

        lista.querySelector("#valor").innerHTML = "R$" + info.valor;
        lista.querySelector("#descricao").innerHTML = info.descricao;
        tbodyManutencao.appendChild(lista)

        

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


function abrirModalAcao(e){
    var modal = document.querySelector('.painel_acao')
    modal.classList.toggle('model')

    var IdAcao = e.parentNode.parentNode.querySelector('#id').innerHTML
    document.querySelector('#idAcao').value = IdAcao

    var desc = e.parentNode.parentNode.querySelector('#descricao').innerHTML
    var valor = e.parentNode.parentNode.querySelector('#valor').innerHTML
    var status = e.parentNode.parentNode.querySelector('#dataF').innerHTML
    
        if(status == '-'){
            document.querySelector('#data_acao').value = "Veiculo em manutenção"

            document.querySelector('#desc_acao').value = desc
    
            document.querySelector('#value_acao').value = valor
        
            
        }else{
            document.querySelector('#desc_acao').value = desc
            document.querySelector('#value_acao').value = valor
            document.querySelector('#data_acao').value = "Manutenção finalizada"
            let inpStatus = document.querySelector('#data_acao')
            inpStatus.disabled = true
        
    }
       
    }
    
    function escolher(){
        var select_items = document.querySelector(".select_items")
        let seleStatus = select_items.options[select_items.selectedIndex].value;
        // if (seleStatus == 'finalizar') { var acao = 'finalizar' }
        // if (seleStatus == 'cancel') { var acao = 'cancel' }
        // if (seleStatus == 'att') { var acao = 'att' }

        var informacao = document.querySelector('#data_acao').value

        if(seleStatus == 'select_infos'){
            let inpStatus = document.querySelector('#data_acao')
                inpStatus.disabled = true
    
                let inpDesc = document.querySelector("#desc_acao")
                inpDesc.disabled = true
    
                let inpValor = document.querySelector("#value_acao")
                inpValor.disabled = true
    
                let botao = document.querySelector(".btnAcao")
                botao.disabled = true
        }else{
            if(informacao != 'Manutenção finalizada'){
                if(seleStatus == 'att'){
                    let inpStatus = document.querySelector('#data_acao')
                    inpStatus.disabled = true
        
                    let inpDesc = document.querySelector("#desc_acao")
                    inpDesc.disabled = true
        
                    let inpValor = document.querySelector("#value_acao")
                    inpValor.disabled = true
        
                    let botao = document.querySelector(".btnAcao")
                    botao.disabled = true
                    var modalAviso = document.querySelector('.aviso')
                    modalAviso.classList.remove('model')
                }
                if(seleStatus == 'cancel'){
                    let inpStatus = document.querySelector('#data_acao')
                    inpStatus.disabled = false
        
                    let inpDesc = document.querySelector("#desc_acao")
                    inpDesc.disabled = false
        
                    let inpValor = document.querySelector("#value_acao")
                    inpValor.disabled = false
        
                    let botao = document.querySelector(".btnAcao")
                    botao.disabled = false
                    var modalAviso = document.querySelector('.aviso')
                    modalAviso.classList.add('model')
                  
                }
                if(seleStatus == 'finalizar'){
                    let inpStatus = document.querySelector('#data_acao')
                    inpStatus.disabled = false
        
                    let inpDesc = document.querySelector("#desc_acao")
                    inpDesc.disabled = false
        
                    let inpValor = document.querySelector("#value_acao")
                    inpValor.disabled = false
        
                    let botao = document.querySelector(".btnAcao")
                    botao.disabled = false

                    var modalAviso = document.querySelector('.aviso')
                    modalAviso.classList.add('model')
                  
                }
            }
            if(informacao == 'Manutenção finalizada'){
                if(seleStatus == 'cancel'){
                    let inpStatus = document.querySelector('#data_acao')
                    inpStatus.disabled = true
        
                    let inpDesc = document.querySelector("#desc_acao")
                    inpDesc.disabled = true
        
                    let inpValor = document.querySelector("#value_acao")
                    inpValor.disabled = true
        
                    let botao = document.querySelector(".btnAcao")
                    botao.disabled = true
                    var modalAviso2 = document.querySelector('.aviso2')
                    modalAviso2.classList.remove('model')
                }
                if(seleStatus == 'finalizar'){
                    let inpStatus = document.querySelector('#data_acao')
                    inpStatus.disabled = true
        
                    let inpDesc = document.querySelector("#desc_acao")
                    inpDesc.disabled = true
        
                    let inpValor = document.querySelector("#value_acao")
                    inpValor.disabled = true
        
                    let botao = document.querySelector(".btnAcao")
                    botao.disabled = true
                    var modalAviso3 = document.querySelector('.aviso3')
                    modalAviso3.classList.remove('model')
                }
                if(seleStatus == 'att'){
                    let inpStatus = document.querySelector('#data_acao')
                    inpStatus.disabled = false
        
                    let inpDesc = document.querySelector("#desc_acao")
                    inpDesc.disabled = false
        
                    let inpValor = document.querySelector("#value_acao")
                    inpValor.disabled = false
        
                    let botao = document.querySelector(".btnAcao")
                    botao.disabled = false
                    var modalAviso3 = document.querySelector('.aviso3')
                    modalAviso3.classList.add('model')
                }
            }
        }
        // PODE CANCELAR E FINALIZAR
      
      
       
      
       
    }

function atualizar(){
    let idManu = document.querySelector('#idAcao').value
    let inputDesc = document.querySelector('#desc_acao').value
    let inputValor = document.querySelector('#value_acao').value
    var select_items = document.querySelector(".select_items")
    let seleStatus = select_items.options[select_items.selectedIndex].value;
    

    
    if(seleStatus == 'att'){
        console.log("aq")
        let info = JSON.stringify({
            "descricao": inputDesc,
            "valor": parseFloat(inputValor.slice(2)),
        })
       
        fetch('http://localhost:3000/Manutencao/idUp/' + idManu, {
            "method": "PUT",
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

function opcao(){
   
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



function abrirModalCreate() {
    var modalCreate = document.querySelector('.painel')
    modalCreate.classList.toggle('model')


}

var veiculo = []

function listarVeiculo() {

    veiculo.forEach(veiculo => {
        if (veiculo.status == "Disponível") {
            var op = document.createElement("option")
            op.innerHTML = veiculo.tipo + " | " + veiculo.placa
            op.value = veiculo.id
            document.querySelector(".select_veiculo").appendChild(op)
        }


    })

}

function cad(){
    const event = new Date()


    let inputVeiculo = document.querySelector('#veiculo').value
    let inputDesc = document.querySelector('#desc').value
    let inputValor = document.querySelector('.painel_value').value

        let info = JSON.stringify({
            "data_inicio": event.toISOString(),
            "data_fim": null,
            "descricao": inputDesc,
            "valor": parseFloat(inputValor),
            "id_Veiculo": parseInt(inputVeiculo)
        })

        fetch('http://localhost:3000/Manutencao', {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": info
        })
            .then(response => response.json())
            .then(resp => {
                const options = { method: 'GET' };
                fetch('http://localhost:3000/Veiculos/idUm/' + resp.id_Veiculo, options)
                .then(response => response.json())
                .then(veiculo => {
    
                    let infoVeiculo = JSON.stringify({
                        "id": veiculo.id,
                        "placa": veiculo.placa,
                        "modelo": veiculo.modelo,
                        "marca": veiculo.marca,
                        "tipo": veiculo.tipo,
                        "status": "Indisponível"
                    })
    
                    fetch('http://localhost:3000/Veiculos/idUp/' + resp.id_Veiculo, {
                        "method": "PUT",
                        "headers": {
                            "Content-Type": "application/json"
                        },
                        "body": infoVeiculo
                    })
                        .then(response => response.json())
                        .then(resp => {
                            alert("foi")
                            window.location.reload()
                        })
                    
    
                })

               

            })




    

}
// GRAFICOS




// INFOS DO USUARIO 
const nome = document.querySelector(".nameUser");
var userinfo = JSON.parse(localStorage.getItem("info"));

nome.innerHTML = userinfo.name;
