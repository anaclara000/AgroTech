const inpUser = document.querySelector('#user')
const inpSenha = document.querySelector('#senha')
var id 

function logar() {
   let data = {
    "email": inpUser.value,
    "senha": inpSenha.value
   }
   console.log(data)
   fetch("http://localhost:3000/Login", {
    "method":"POST",
    "headers": {
        "Content-Type":"application/json"
    },
    "body": JSON.stringify(data)
})
.then(res => {return res.json()})
.then(data => {
    if(data.erro === undefined) {
        console.log(data)
        localStorage.setItem("info", JSON.stringify({"email":data.email, "id":data.uid, "nivel":data.univel, "name": data.uname}));

          window.location.href = '../Home/index.html'
    }
})
}

