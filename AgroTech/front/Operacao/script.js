
function carregar() {
    const options2 = { method: 'GET' };
    fetch('http://localhost:3000/Operacao', options2)
        .then(response => response.json())
        .then(resp => {
            operacao = resp;
            listarOperacao();
        });

        // const options3 = { method: 'GET' };
        // fetch('http://localhost:3000/Motorista', options3)
        //     .then(response => response.json())
        //     .then(resp => {
        //         motorista = resp;
        //         listarMotorista();
        //     });
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
    }


const listOperacao = document.querySelector(".list_operation");
const tbodyOperacao = document.querySelector(".tbody_list_operation");
var operacao = []


function listarOperacao() {

    operacao.forEach(info => {
      
            var lista = listOperacao.cloneNode(true);
            lista.classList.remove('model')

            document.querySelector("#situacao").innerHTML = info.status
            lista.querySelector("#id").innerHTML = info.id
            lista.querySelector("#desc").innerHTML = info.descricao
            lista.querySelector("#dataInicio").innerHTML = info.dataInicio.slice(0, 10);

            if (info.dataFim != null) {
                lista.querySelector("#dataFim").innerHTML = info.dataFim.slice(0, 10);
                lista.querySelector(".img_icon").src = "../../assets/Cverde.png"
            

            } else if (info.dataFim == null) {
                lista.querySelector("#dataFim").innerHTML = "-";
                lista.querySelector(".img_icon").src = "../../assets/Camarelo.png"
            }
            tbodyOperacao.appendChild(lista)
        

        const options = { method: 'GET' };

        fetch('http://localhost:3000/Motorista/idUm/' + info.id_Motorista, options)
            .then(response => response.json())
            .then(response => {
                lista.querySelector('#idMotorista').innerHTML = response.nome;
            })


            const options2 = { method: 'GET' };

            fetch('http://localhost:3000/Veiculos/idUm/' + info.idVeiculo, options2)
                .then(response => response.json())
                .then(v => {
                    lista.querySelector('#veiculos').innerHTML = v.placa + ' | ' + v.tipo;
                })


    })
}


function abrirModalCreate() {
    var modalCreate = document.querySelector('.painel')
    modalCreate.classList.toggle('model')


}

function cad(){

    let inputVeiculo = document.querySelector('#veiculo').value
    let inputDesc = document.querySelector('#desc').value
    let inputMotorista = document.querySelector('.painel_driver').value

    const event = new Date()
    let data = JSON.stringify({
        "dataInicio": event.toISOString(),
        "dataFim": null,
        "id_Motorista": parseInt(inputMotorista),
        "idVeiculo": parseInt(inputVeiculo),
        "descricao": inputDesc
    })
    fetch('http://localhost:3000/Operacao', {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": data
    })
        .then(response => response.json())
        .then(resp => {
            const options = { method: 'GET' };
            fetch('http://localhost:3000/Veiculos/idUm/' + resp.idVeiculo, options)
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

                fetch('http://localhost:3000/Veiculos/idUp/' + resp.idVeiculo, {
                    "method": "PUT",
                    "headers": {
                        "Content-Type": "application/json"
                    },
                    "body": infoVeiculo
                })
                    .then(response => response.json())
                    .then(resp => {
                        
                    })
                

            })

            fetch('http://localhost:3000/Motorista/idUm/' + resp.id_Motorista, options)
            .then(response => response.json())
            .then(motorista => {

                let info = JSON.stringify({
                    "nome": motorista.nome,
                    "CNH": motorista.CNH,
                    "disponivel": "Indisponível"
                })

                fetch('http://localhost:3000/Motorista/idUp/' + resp.id_Motorista, {
                    "method": "PUT",
                    "headers": {
                        "Content-Type": "application/json"
                    },
                    "body": info
                })
                    .then(response => response.json())
                    .then(resp => {

                        alert("foi")
                        window.location.reload()
                    })

                })

        })
}


function listarVeiculo() {

    veiculo.forEach(v => {
        if (v.status == "Disponível") {
            var op = document.createElement("option")
            op.innerHTML = v.tipo + " | " + v.placa
            op.value = v.id
            document.querySelector(".select_veiculo").appendChild(op)
        }
    })

}

function abrirModalAcao(e) {
    var modal = document.querySelector('.painel_acao')
    modal.classList.toggle('model')

    var IdAcao = e.parentNode.parentNode.querySelector('#id').innerHTML
    document.querySelector('#idAcao').value = IdAcao

    var desc = e.parentNode.parentNode.querySelector('#desc').innerHTML
    // var status = e.parentNode.parentNode.querySelector('#dataFim').innerHTML
    var veiculo = e.parentNode.parentNode.querySelector('#veiculos').innerHTML
    var motorista = e.parentNode.parentNode.querySelector('#idMotorista').innerHTML

    var situacao = e.parentNode.parentNode.querySelector('#situacao').innerHTML
    console.log(situacao)
    if (situacao == 'Em operacao') {
        document.querySelector('#data_acao').value = "Veiculo em operação"

        document.querySelector('#desc_acao').value = desc

        document.querySelector('#veiculo_acao').value = veiculo
        document.querySelector('.veiculoAtual').value = veiculo
        document.querySelector('#value_acao').value = motorista

    } else if(situacao == 'Finalizada'){
        document.querySelector('#desc_acao').value = desc
        document.querySelector('#data_acao').value = "Operação finalizada"
        document.querySelector('#veiculo_acao').value = veiculo
        document.querySelector('#value_acao').value = motorista
        console.log(veiculo)
        let inpStatus = document.querySelector('#data_acao')
        inpStatus.disabled = true

    }else{
        var modal = document.querySelector('.painel_acao')
        modal.classList.add('model')

     
    }

}


// function listarMotorista(){
//     var op = document.createElement("option")
//     op.innerHTML = info.nome
//     op.value = info.id
//     document.querySelector("#select_driver").appendChild(op)
// }

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