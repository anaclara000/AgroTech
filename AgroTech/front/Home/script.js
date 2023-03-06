function carregar() {

    const options1 = { method: 'GET' };
    fetch('http://localhost:3000/Operacao', options1)
        .then(response => response.json())
        .then(resp => {
            operacao = resp;
            listarOperacao();
        });

    const options2 = { method: 'GET' };
    fetch('http://localhost:3000/Manutencao', options2)
        .then(response => response.json())
        .then(resp => {
            manutencao = resp;
            listarManutencao();
        });



    const options3 = { method: 'GET' };
    fetch('http://localhost:3000/Motorista', options3)
        .then(response => response.json())
        .then(resp => {
            motorista = resp;
            listarMotorista();
        });

}

// LISTAR OPERACAO E VISUALIZAR
const listOperacao = document.querySelector(".list_operation");
const tbodyOperacao = document.querySelector(".tbody_list_operation");
var operacao = []

var soma3 = 0
function listarOperacao() {

    operacao.forEach(info => {
        if (info.dataFim == null) {
            soma3 += 1
            var lista = listOperacao.cloneNode(true);
            lista.classList.remove('model')

            lista.querySelector("#id").innerHTML = info.id_Motorista
            lista.querySelector("#dataInicio").innerHTML = info.dataInicio.slice(0, 10);

            if (info.dataFim != null) {
                lista.querySelector("#dataFim").innerHTML = info.dataFim.slice(0, 10);

            } else if (info.dataFim == null) {
                lista.querySelector("#dataFim").innerHTML = "Em operação";
            }
            tbodyOperacao.appendChild(lista)
        }

        const options = { method: 'GET' };

        fetch('http://localhost:3000/Motorista/idUm/' + info.id_Motorista, options)
            .then(response => response.json())
            .then(response => {
                lista.querySelector('#idMotorista').innerHTML = response.nome;
            })


        document.querySelector('#qtd_operation').innerHTML = soma3 + "/" + operacao.length

    })
}

var modalManutencao = document.querySelector(".manitence_list");
var modalMotorista = document.querySelector(".driver_list");
var modalOperacao = document.querySelector(".operation_list");

function abrirModalOperacao() {
    modalManutencao.classList.add("model");
    modalMotorista.classList.add("model");
    modalOperacao.classList.remove("model");

}

function exibirInfoOperacao(e) {
    var id_Motorista = e.parentNode.parentNode.querySelector('#id').innerHTML
    var nomeMotorista = e.parentNode.parentNode.querySelector("#idMotorista").innerHTML


    const options = { method: 'GET' };

    fetch('http://localhost:3000/Motorista/idUm/' + id_Motorista, options)
        .then(response => response.json())
        .then(resp => {
            data = resp.operacao;
            data.forEach(r => {
                var info = document.querySelector(".select_info")
                var model = document.querySelector(".btn")
                model.classList.remove("model")
                info.classList.add("model")
                document.querySelector('#idOperacao').innerHTML = r.id
                document.querySelector('.nameDriver').innerHTML = "Motorista: " + nomeMotorista
                document.querySelector('.descricaoOp').innerHTML = "Descrição: " + r.descricao;
                document.querySelector('.data').innerHTML = "Data: " + r.dataInicio.slice(0, 10)

                const options2 = { method: 'GET' };

                fetch('http://localhost:3000/Veiculos/idUm/' + r.idVeiculo, options2)
                    .then(response => response.json())
                    .then(response => {
                        if (response.tipo == "Carga") {
                            document.querySelector('.caminhaoImage').src = "../../assets/caminhao.png"
                            document.querySelector('.caminhaoImage').style.width = "8vw"
                        } else if (response.tipo == "Visita") {
                            document.querySelector('.caminhaoImage').src = "../../assets/caminhonete.png"
                            document.querySelector('.caminhaoImage').style.width = "6vw"
                        } else {
                            document.querySelector('.caminhaoImage').src = "../../assets/venda.png"
                        }


                        document.querySelector('.tipo').innerHTML = "Veiculo de: " + response.tipo
                        document.querySelector('.placa').innerHTML = "Placa: " + response.placa

                    })



            })
        })


}

// FIM DA OPERACAO

//LISTAR MOTORISTAS E VISUALIZAR
const list = document.querySelector(".list");
const tbody = document.querySelector(".tbody_list");
var motorista = []

var soma = 0;
function listarMotorista() {


    console.log(motorista.length)
    motorista.forEach(info => {
        if (info.disponivel == "Indisponível") {
            soma += 1
            var lista = list.cloneNode(true);
            lista.classList.remove('model')
            lista.querySelector("#id").innerHTML = info.id;
            lista.querySelector("#nome").innerHTML = info.nome;
            lista.querySelector("#CNH").innerHTML = info.CNH;
            lista.querySelector("#status").innerHTML = info.disponivel;
            tbody.appendChild(lista)
        }

    })
    document.querySelector('#qtd_driver').innerHTML = soma + "/" + motorista.length

}
var modalManutencao = document.querySelector(".manitence_list");
var modalMotorista = document.querySelector(".driver_list");
var modalOperacao = document.querySelector(".operation_list");

function abrirModalMotorista() {
    modalMotorista.classList.remove("model");
    modalManutencao.classList.add("model");
    modalOperacao.classList.add("model");
}


function exibirInfoMotorista(e) {
    var veiculo = []
    var idMotorista = e.parentNode.parentNode.querySelector('#id').innerHTML
    var nomeMotorista = e.parentNode.parentNode.querySelector("#nome").innerHTML


    const options = { method: 'GET' };

    fetch('http://localhost:3000/Motorista/idUm/' + idMotorista, options)
        .then(response => response.json())
        .then(resp => {
            data = resp.operacao;
            data.forEach(r => {
                var info = document.querySelector(".select_info")
                var model = document.querySelector(".btn")
                model.classList.remove("model")
                info.classList.add("model")
                document.querySelector('#idOperacao').innerHTML = r.id
                console.log(r.id)
                document.querySelector('.nameDriver').innerHTML = "Motorista: " + nomeMotorista
                document.querySelector('.descricaoOp').innerHTML = "Descrição: " + r.descricao;
                document.querySelector('.data').innerHTML = "Data: " + r.dataInicio.slice(0, 10)

                const options2 = { method: 'GET' };

                fetch('http://localhost:3000/Veiculos/idUm/' + r.idVeiculo, options2)
                    .then(response => response.json())
                    .then(response => {
                        if (response.tipo == "Carga") {
                            document.querySelector('.caminhaoImage').src = "../../assets/caminhao.png"
                            document.querySelector('.caminhaoImage').style.width = "8vw"
                        } else if (response.tipo == "Visita") {
                            document.querySelector('.caminhaoImage').src = "../../assets/caminhonete.png"
                            document.querySelector('.caminhaoImage').style.width = "6vw"
                        } else {
                            document.querySelector('.caminhaoImage').src = "../../assets/venda.png"
                        }


                        document.querySelector('.tipo').innerHTML = "Veiculo de: " + response.tipo
                        document.querySelector('.placa').innerHTML = "Placa: " + response.placa

                    })



            })
        })


}

function finalizar(e) {

    var id = e.parentNode.parentNode.parentNode.querySelector('#idOperacao').innerHTML
    console.log(id)
    const event = new Date();

    const options = { method: 'GET' };

    fetch('http://localhost:3000/Operacao/idUm/' + id, options)
        .then(response => response.json())
        .then(resp => {

            let data = JSON.stringify({
                "dataInicio": resp.dataInicio,
                "dataFim": event.toISOString(),
                "id_Motorista": resp.id_Motorista,
                "idVeiculo": resp.idVeiculo,
                "descricao": resp.descricao,
            })

            const options = { method: 'GET' };

            fetch('http://localhost:3000/Motorista/idUm/' + resp.id_Motorista, options)
                .then(response => response.json())
                .then(motorista => {

                    let info = JSON.stringify({
                        "nome": motorista.nome,
                        "CNH": motorista.CNH,
                        "disponivel": "Disponível"
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

                            console.log(info)
                        })




                    fetch('http://localhost:3000/Operacao/idUp/' + id, {
                        "method": "PUT",
                        "headers": {
                            "Content-Type": "application/json"
                        },
                        "body": data
                    })
                        .then(response => response.json())
                        .then(resp => {

                            window.location.reload()

                        })





                })





        })
}

// FIM DOS MOTORISTAS





// LISTAR MANUTENCAO E VISUALIZAR
const listManutencao = document.querySelector(".list_manitence");
const tbodyManutencao = document.querySelector(".tbody_list_manitence");
var manutencao = []

var soma2 = 0;
function listarManutencao() {
    manutencao.forEach(info => {
        if (info.data_fim == null) {
            soma2 += 1
            var lista = listManutencao.cloneNode(true);
            lista.classList.remove('model')
            lista.querySelector('#id').innerHTML = info.id
            lista.querySelector("#dataI").innerHTML = info.data_inicio.slice(0, 10);
            if (info.data_fim != null) {
                lista.querySelector("#dataF").innerHTML = info.data_fim.slice(0, 10);

            } else if (info.data_fim == null) {
                lista.querySelector("#dataF").innerHTML = "Em manutenção";
            }

            lista.querySelector("#valor").innerHTML = "R$" + info.valor;
            tbodyManutencao.appendChild(lista)
        }

        document.querySelector('#qtd_maintenance').innerHTML = soma2 + "/" + manutencao.length
    })
}

var modalManutencao = document.querySelector(".manitence_list");
var modalMotorista = document.querySelector(".driver_list");
var modalOperacao = document.querySelector(".operation_list");

function abrirModalManutencao() {
    modalManutencao.classList.remove("model");
    modalMotorista.classList.add("model");
    modalOperacao.classList.add("model");
}

function exibirInfoManutencao(e) {
    var idManutencao = e.parentNode.parentNode.querySelector("#id").innerHTML;

    const options = { method: 'GET' };

    fetch('http://localhost:3000/Manutencao/idUm/' + idManutencao, options)
        .then(response => response.json())
        .then(response => {
            var btn = document.querySelector(".btn_manitence")
            var info = document.querySelector(".select_info_manitence")
            info.classList.add('model')
            btn.classList.remove('model')
            document.querySelector(".data_manitence").innerHTML = "Data: " + response.data_inicio.slice(0, 10);
            document.querySelector(".descManitance").innerHTML = "Descrição: " + response.descricao;
            document.querySelector('.image_manitence').src = "../../assets/manutencao.png"
            document.querySelector('.image_manitence').style.width = "9vw"
            const options2 = { method: 'GET' };

            fetch('http://localhost:3000/Veiculos/idUm/' + response.id_Veiculo, options2)
                .then(response => response.json())
                .then(resp => {
                    document.querySelector(".tipo_manitence").innerHTML = "Veiculo de: " + resp.tipo;
                    document.querySelector(".placa_manitence").innerHTML = "Placa: " + resp.placa;
                })


        })



}
// FIM DA MANUTENCAO


function abrirModalCreate() {
    var modalCreate = document.querySelector('.painel')
    modalCreate.classList.toggle('model')
    
    var modalteste = document.querySelector('.teste')
    modalteste.classList.add('model')
}

function abrirModelOperacao(){
    var modalteste = document.querySelector('.teste')
    modalteste.classList.remove('model')
    
}

function teste(){
    var select_items = document.querySelector(".select_items")
    let seleStatus = select_items.options[select_items.selectedIndex].value;

    if(seleStatus == 'select_infos'){
        let inpMotorista = document.querySelector(".painel_driver")
        inpMotorista.disabled = false

        let inpValor = document.querySelector(".painel_value")
        inpValor.disabled = false
    }
    if (seleStatus == 'manitence') {
        let inpMotorista = document.querySelector(".painel_driver")
        inpMotorista.disabled = true

        let inpValor = document.querySelector(".painel_value")
        inpValor.disabled = false


        
    } 
    
    if(seleStatus == 'operation'){
        let inpMotorista = document.querySelector(".painel_driver")
        inpMotorista.disabled = false

        let inpValor = document.querySelector(".painel_value")
        inpValor.disabled = true
    }

}



// INFOS DO USUARIO 
const nome = document.querySelector(".nameUser");
var userinfo = JSON.parse(localStorage.getItem("info"));

nome.innerHTML = userinfo.name;




