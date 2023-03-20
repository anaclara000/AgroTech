
var veiculo = []
var motorista = []

const nome = document.querySelector(".nameUser");
const nivel = document.querySelector(".nivelUser");
var userinfo = JSON.parse(localStorage.getItem("info"));

nome.innerHTML = userinfo.name;
nivel.innerHTML = userinfo.nivel;

function verificarNivel() {
    if (document.querySelector(".nivelUser").innerHTML == "funcionario") {
        var nivelUser = document.querySelector('.criarCoisas')
        nivelUser.classList.add('model')

        var fun = document.querySelector('.funcionarioPainel')
        fun.classList.remove('model')

        var aa = document.querySelector('.aa')
        aa.classList.add('model')

        var bb = document.querySelector('.bb')
        bb.classList.add('model')

    } else {
        var fun = document.querySelector('.funcionarioPainel')
        fun.classList.add('model')

        var nivelUser = document.querySelector('.criarCoisas')
        nivelUser.classList.remove('model')

        var aa = document.querySelector('.aa')
        aa.classList.remove('model')

        var bb = document.querySelector('.bb')
        bb.classList.remove('model')

    }

}
function logOut() {
    window.localStorage.removeItem("info")
    window.location.href = "../Login"
}

function carregar() {
    verificarNivel()
    const options2 = { method: 'GET' };
    fetch('http://localhost:3000/Operacao', options2)
        .then(response => response.json())
        .then(resp => {
            operacao = resp;
            listarOperacao();
        });

    const options3 = { method: 'GET' };
    fetch('http://localhost:3000/Motorista', options3)
        .then(response => response.json())
        .then(resp => {
            motorista = resp;
            listarMotorista();
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

    escolher()
}


const listOperacao = document.querySelector(".list_operation");
const tbodyOperacao = document.querySelector(".tbody_list_operation");
var operacao = []


function listarOperacao() {

    operacao.forEach(info => {

        var lista = listOperacao.cloneNode(true);
        lista.classList.remove('model')

        lista.querySelector("#situacao").innerHTML = info.status
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
        if (info.status == 'Cancelada') {
            lista.querySelector(".img_icon").src = "../../assets/Cvermelho.png"
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


function fecharModalAviso() {
    var situacao2 = document.querySelector('.situacao2')
    situacao2.classList.add('model')
}


function abrirModalCreate() {
    var modalCreate = document.querySelector('.painel')
    modalCreate.classList.toggle('model')


}

function cad() {

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
            document.querySelector(".select_veiculo2").appendChild(op.cloneNode(true))
        }
    })

}
function listarMotorista() {

    motorista.forEach(m => {
        if (m.disponivel == "Disponível") {
            var op2 = document.createElement("option")
            op2.innerHTML = m.nome
            op2.value = m.id
            document.querySelector("#select_driver").appendChild(op2)

        }
    })

}

function abrirModalAcao(e) {
    let opcaoCancelar = document.querySelector("#cancelar");
    let opcaoAtualizar = document.querySelector("#atualizar");
    var modal = document.querySelector('.painel_acao')
    modal.classList.toggle('model')
    if (!modal.classList.contains('model')) {
        var IdAcao = e.parentNode.parentNode.querySelector('#id').innerHTML
        document.querySelector('#idAcao').value = IdAcao

        var desc = e.parentNode.parentNode.querySelector('#desc').innerHTML
        var veiculo = e.parentNode.parentNode.querySelector('#veiculos').innerHTML
        var motorista = e.parentNode.parentNode.querySelector('#idMotorista').innerHTML

        var situacao = e.parentNode.parentNode.querySelector('#situacao').innerHTML
        console.log(situacao)
        if (situacao == 'Em operação') {
            document.querySelector('#data_acao').value = "Veiculo em operação"

            document.querySelector('#desc_acao').value = desc

            document.querySelector('#veiculo_acao').value = veiculo
            document.querySelector('.veiculoAtual').value = veiculo
            document.querySelector('#value_acao').value = motorista
            opcaoAtualizar.disabled = true;
            opcaoCancelar.disabled = false;

        } else if (situacao == 'Finalizada') {
            document.querySelector('#desc_acao').value = desc
            document.querySelector('#data_acao').value = "Operação finalizada"
            document.querySelector('#veiculo_acao').value = veiculo
            document.querySelector('.veiculoAtual').value = veiculo
            document.querySelector('.veiculoAtual').innerHTML = veiculo
            document.querySelector('#value_acao').value = motorista
            console.log(veiculo)
            let inpStatus = document.querySelector('#data_acao')
            inpStatus.disabled = true
            opcaoAtualizar.disabled = false;
            opcaoCancelar.disabled = true;

        } else {
            var modal = document.querySelector('.painel_acao')
            modal.classList.add('model')


        }
    }

}

function escolher() {
    var select_items = document.querySelector(".select_items")
    let seleStatus = select_items.options[select_items.selectedIndex].value;
    // if (seleStatus == 'finalizar') { var acao = 'finalizar' }
    // if (seleStatus == 'cancel') { var acao = 'cancel' }
    // if (seleStatus == 'att') { var acao = 'att' }

    var informacao = document.querySelector('#data_acao').value

    if (seleStatus == 'select_infos') {
        let inpStatus = document.querySelector('#data_acao')
        inpStatus.disabled = true

        let inpDesc = document.querySelector("#desc_acao")
        inpDesc.disabled = true

        let inpValor = document.querySelector("#value_acao")
        inpValor.disabled = true

        let inpVeiculo = document.querySelector("#veiculo_acao")
        inpVeiculo.disabled = true


        var modalveiculo = document.querySelector('#veiculo_acao')
        modalveiculo.classList.remove('model')

        let inpId = document.querySelector("#idAcao")
        inpId.disabled = true

        let botao = document.querySelector(".btnAcao")
        botao.disabled = true

        var modalAviso = document.querySelector('.aviso')
        modalAviso.classList.add('model')

        var modalAviso3 = document.querySelector('.aviso3')
        modalAviso3.classList.add('model')

        var modalAviso2 = document.querySelector('.aviso2')
        modalAviso2.classList.add('model')

    } else {
        if (informacao != 'Operação finalizada') {
            if (seleStatus == 'att') {
                let inpStatus = document.querySelector('#data_acao')
                inpStatus.disabled = true

                let inpDesc = document.querySelector("#desc_acao")
                inpDesc.disabled = true

                let inpValor = document.querySelector("#value_acao")
                inpValor.disabled = true

                let inpId = document.querySelector("#idAcao")
                inpId.disabled = true

                let botao = document.querySelector(".btnAcao")
                botao.disabled = true
                var modalAviso = document.querySelector('.aviso')
                modalAviso.classList.remove('model')

                let inpVeiculo2 = document.querySelector(".select_veiculo2")
                inpVeiculo2.disabled = true


                var modalveiculo = document.querySelector('#veiculo_acao')
                modalveiculo.classList.remove('model')
                var modalinpVeiculo2 = document.querySelector('.select_veiculo2')
                modalinpVeiculo2.classList.add('model')
            }
            if (seleStatus == 'cancel') {
                let inpStatus = document.querySelector('#data_acao')
                inpStatus.disabled = true

                let inpDesc = document.querySelector("#desc_acao")
                inpDesc.disabled = true

                let inpId = document.querySelector("#idAcao")
                inpId.disabled = true

                let inpValor = document.querySelector("#value_acao")
                inpValor.disabled = true

                let botao = document.querySelector(".btnAcao")
                botao.disabled = false
                var modalAviso = document.querySelector('.aviso')
                modalAviso.classList.add('model')

                // let inpVeiculo2 = document.querySelector(".select_veiculo2")
                // inpVeiculo2.disabled = true


                var modalveiculo = document.querySelector('#veiculo_acao')
                modalveiculo.classList.remove('model')
                // var modalinpVeiculo2 = document.querySelector('.select_veiculo2')
                // modalinpVeiculo2.classList.add('model')
            }
            if (seleStatus == 'finalizar') {
                let inpStatus = document.querySelector('#data_acao')
                inpStatus.disabled = true

                let inpDesc = document.querySelector("#desc_acao")
                inpDesc.disabled = true

                let inpId = document.querySelector("#idAcao")
                inpId.disabled = true

                let inpValor = document.querySelector("#value_acao")
                inpValor.disabled = true

                let botao = document.querySelector(".btnAcao")
                botao.disabled = false

                var modalAviso = document.querySelector('.aviso')
                modalAviso.classList.add('model')

                // let inpVeiculo2 = document.querySelector(".select_veiculo2")
                // inpVeiculo2.disabled = true

                var modalveiculo = document.querySelector('#veiculo_acao')
                modalveiculo.classList.remove('model')

                // var modalinpVeiculo2 = document.querySelector('.select_veiculo2')
                // modalinpVeiculo2.classList.add('model')

            }
        }
        if (informacao == 'Operação finalizada') {
            if (seleStatus == 'cancel') {
                let inpStatus = document.querySelector('#data_acao')
                inpStatus.disabled = true

                let inpDesc = document.querySelector("#desc_acao")
                inpDesc.disabled = true

                let inpId = document.querySelector("#idAcao")
                inpId.disabled = true

                let inpValor = document.querySelector("#value_acao")
                inpValor.disabled = true

                let botao = document.querySelector(".btnAcao")
                botao.disabled = true
                var modalAviso = document.querySelector('.aviso')
                modalAviso.classList.add('model')

                var modalAviso3 = document.querySelector('.aviso3')
                modalAviso3.classList.add('model')

                var modalAviso2 = document.querySelector('.aviso2')
                modalAviso2.classList.remove('model')

                let inpVeiculo2 = document.querySelector(".select_veiculo2")
                inpVeiculo2.disabled = true

                var modalinpVeiculo = document.querySelector('.veiculo_acao')
                modalinpVeiculo.classList.remove('model')


                var modalinpVeiculo2 = document.querySelector('.select_veiculo2')
                modalinpVeiculo2.classList.add('model')
            }
            if (seleStatus == 'finalizar') {
                let inpStatus = document.querySelector('#data_acao')
                inpStatus.disabled = true

                let inpDesc = document.querySelector("#desc_acao")
                inpDesc.disabled = true

                let inpId = document.querySelector("#idAcao")
                inpId.disabled = true

                let inpValor = document.querySelector("#value_acao")
                inpValor.disabled = true

                let botao = document.querySelector(".btnAcao")
                botao.disabled = true

                var modalAviso3 = document.querySelector('.aviso3')
                modalAviso3.classList.remove('model')

                var modalAviso2 = document.querySelector('.aviso2')
                modalAviso2.classList.add('model')

                let inpVeiculo2 = document.querySelector(".select_veiculo2")
                inpVeiculo2.disabled = true


                var modalveiculo = document.querySelector('#veiculo_acao')
                modalveiculo.classList.remove('model')
                var modalinpVeiculo2 = document.querySelector('.select_veiculo2')
                modalinpVeiculo2.classList.add('model')


            }
            if (seleStatus == 'att') {


                let inpStatus = document.querySelector('#data_acao')
                inpStatus.disabled = true

                let inpDesc = document.querySelector("#desc_acao")
                inpDesc.disabled = false

                let inpId = document.querySelector("#idAcao")
                inpId.disabled = true

                let inpValor = document.querySelector("#value_acao")
                inpValor.disabled = false

                let botao = document.querySelector(".btnAcao")
                botao.disabled = false

                let inpVeiculo2 = document.querySelector(".select_veiculo2")
                inpVeiculo2.disabled = false

                var modalveiculo = document.querySelector('#veiculo_acao')
                modalveiculo.classList.add('model')

                var modalveiculo2 = document.querySelector('.select_veiculo2')
                modalveiculo2.classList.remove('model')

                var modalAviso3 = document.querySelector('.aviso3')
                modalAviso3.classList.add('model')

                var modalAviso2 = document.querySelector('.aviso2')
                modalAviso2.classList.add('model')

                var modalAviso = document.querySelector('.aviso')
                modalAviso.classList.add('model')


            }
        }
    }






}

function atualizar() {
    let idManu = document.querySelector('#idAcao').value
    let inputDesc = document.querySelector('#desc_acao').value
    let inputmotorista = document.querySelector('#value_acao').value
    var select_items = document.querySelector(".select_items")
    let seleStatus = select_items.options[select_items.selectedIndex].value;


    if (seleStatus == 'att') {
        console.log("aq")
        let info = JSON.stringify({
            "descricao": inputDesc,
            "Motorista": inputmotorista,
        })

        fetch('http://localhost:3000/Operacao/idUp/' + idManu, {
            "method": "PUT",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": info
        })
            .then(response => response.json())
            .then(resp => {
                let data = JSON.stringify({
                    "status": "Disponível",
                })


                fetch('http://localhost:3000/Veiculos/idUp/' + resp.idVeiculo, {
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

    }
    if (seleStatus == 'cancel') {

        const event = new Date()
        let info = JSON.stringify({
            "dataFim": event.toISOString(),
            "status": "Cancelada",
        })

        fetch('http://localhost:3000/Operacao/idUp/' + idManu, {
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
    if (seleStatus == 'finalizar') {
        const event = new Date()
        let info = JSON.stringify({
            "dataFim": event.toISOString(),
            "status": "Finalizada",
        })

        fetch('http://localhost:3000/Operacao/idUp/' + idManu, {
            "method": "PUT",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": info
        })
            .then(response => response.json())
            .then(resp => {
                let data = JSON.stringify({
                    "status": "Disponível",
                })


                fetch('http://localhost:3000/Veiculos/idUp/' + resp.idVeiculo, {
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