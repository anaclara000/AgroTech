function carregar(){
    const options = { method: 'GET' };
    fetch('http://localhost:3000/Motorista', options)
    .then(response => response.json())
    .then(resp => {
        motorista = resp;
        listarMotorista();
    });

    const options2 = { method: 'GET' };
    fetch('http://localhost:3000/Manutencao', options2)
    .then(response => response.json())
    .then(resp => {
        manutencao = resp;
        listarManutencao();
    });

    const options3 = { method: 'GET' };
    fetch('http://localhost:3000/Operacao', options3)
    .then(response => response.json())
    .then(resp => {
        operacao = resp;
        listarOperacao();
    });

}






//LISTAR MOTORISTAS E VISUALIZAR
const list = document.querySelector(".list");
const tbody = document.querySelector(".tbody_list");
var motorista = []


function listarMotorista() {
    motorista.forEach(info => {
        if(info.disponivel == "Indisponível"){
            var lista = list.cloneNode(true);
            lista.classList.remove('model')
            lista.querySelector("#nome").innerHTML = info.nome;
            lista.querySelector("#CNH").innerHTML = info.CNH;
            lista.querySelector("#status").innerHTML = info.disponivel;
            tbody.appendChild(lista)
        }
       
    })
}
var modalManutencao = document.querySelector(".manitence_list");
var modalMotorista = document.querySelector(".driver_list");
var modalOperacao = document.querySelector(".operation_list");

function abrirModalMotorista(){
    modalMotorista.classList.remove("model");
    modalManutencao.classList.add("model");
    modalOperacao.classList.add("model");
}


function exibirInfoMotorista(){
    
}
// FIM DOS MOTORISTAS







// LISTAR MANUTENCAO E VISUALIZAR
const listManutencao = document.querySelector(".list_manitence");
const tbodyManutencao = document.querySelector(".tbody_list_manitence");
var manutencao = []


function listarManutencao() {
    manutencao.forEach(info => {
        if(info.data_fim == null){
            var lista = listManutencao.cloneNode(true);
            lista.classList.remove('model')
            lista.querySelector("#dataI").innerHTML = info.data_inicio.slice(0,10);
            if(info.data_fim != null){
                lista.querySelector("#dataF").innerHTML = info.data_fim.slice(0,10);
               
            } else if(info.data_fim == null){
                lista.querySelector("#dataF").innerHTML = "Em manutenção";
             }
            
            lista.querySelector("#valor").innerHTML = "R$" + info.valor;
            tbodyManutencao.appendChild(lista)
        }
        
    })
}

var modalManutencao = document.querySelector(".manitence_list");
var modalMotorista = document.querySelector(".driver_list");
var modalOperacao = document.querySelector(".operation_list");

function abrirModalManutencao(){
    modalManutencao.classList.remove("model");
    modalMotorista.classList.add("model");
    modalOperacao.classList.add("model");
}
// FIM DA MANUTENCAO













// LISTAR OPERACAO E VISUALIZAR
const listOperacao = document.querySelector(".list_operation");
const tbodyOperacao = document.querySelector(".tbody_list_operation");
var operacao = []


function listarOperacao() {
    
    operacao.forEach(info => {
        if(info.dataFim == null){
            var lista = listOperacao.cloneNode(true);
            lista.classList.remove('model')
            lista.querySelector("#idMotorista").innerHTML = info.id_Motorista;
            lista.querySelector("#dataInicio").innerHTML = info.dataInicio.slice(0,10);
    
            if(info.dataFim != null){
                lista.querySelector("#dataFim").innerHTML = info.dataFim.slice(0,10);
               
            } else if(info.dataFim == null){
                lista.querySelector("#dataFim").innerHTML = "Em operação";
             }
             tbodyOperacao.appendChild(lista)
        }
       

        
        
    })
}

var modalManutencao = document.querySelector(".manitence_list");
var modalMotorista = document.querySelector(".driver_list");
var modalOperacao = document.querySelector(".operation_list");

function abrirModalOperacao(){
    modalManutencao.classList.add("model");
    modalMotorista.classList.add("model");
    modalOperacao.classList.remove("model");
    
}

// FIM DA OPERACAO




