function carregar() {
    const options2 = { method: 'GET' };
    fetch('http://localhost:3000/Usuario', options2)
        .then(response => response.json())
        .then(resp => {
            Usuarios = resp;
            listarUsuarios();
        });

    const options3 = { method: 'GET' };
    fetch('http://localhost:3000/Motorista', options3)
        .then(response => response.json())
        .then(resp => {
            Motorista = resp;
            listarMotorista();
        });


}


const listUsuarios = document.querySelector(".list_Usuarios");
const tbodyUsuarios = document.querySelector(".tbody_list_Usuarios");
var Usuarios = []


function listarUsuarios() {
    Usuarios.forEach(u => {
        if (u.nivel != 'motorista') {
            var lista = listUsuarios.cloneNode(true);
            lista.classList.remove('model')
            lista.querySelector('#id').innerHTML = u.id;
            lista.querySelector('#nome').innerHTML = u.nome;
            lista.querySelector('#email').innerHTML = u.email;
            lista.querySelector('#cpf').innerHTML = u.CPF;
            lista.querySelector('#nivel').innerHTML = u.nivel;
            lista.querySelector('.ativo').innerHTML = u.ativo;

        }



        tbodyUsuarios.appendChild(lista)
    })
}


const listMotorista = document.querySelector(".list_Motorista");
const tbodyMotorista = document.querySelector(".tbody_list_Motorista");
var Usuarios = []


function listarMotorista() {
    Motorista.forEach(m => {


        var lista = listMotorista.cloneNode(true);
        lista.classList.remove('model')
        lista.querySelector('#id').innerHTML = m.id;
        lista.querySelector('#nome').innerHTML = m.nome;
        lista.querySelector('#cnh').innerHTML = m.CNH;
        lista.querySelector('#ativo').innerHTML = m.ativo;

        if (m.disponivel == "Disponível") {
            lista.querySelector('.img_icon').src = "../../assets/Cverde.png";
        } else {
            lista.querySelector('.img_icon').src = "../../assets/Cvermelho.png";
        }



        // ista.querySelector('#email').innerHTML = m.email;
        // lista.querySelector('#cpf').innerHTML = m.CPF;


        tbodyMotorista.appendChild(lista)

        const options = { method: 'GET' };

        fetch('http://localhost:3000/Usuario/idUm/' + m.id, options)
            .then(response => response.json())
            .then(response => {
                lista.querySelector('#email').innerHTML = response.email;
                lista.querySelector('#cpf').innerHTML = response.CPF;
            })

    })

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