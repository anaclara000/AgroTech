
// var secretKey = "123456789";

var id

function logar() {
    var inpUser = document.querySelector('#user')
    var inpSenha = document.querySelector('#senha')
    // var encrypted = CryptoJS.AES.encrypt(inpSenha, secretKey);
    // var decrypted = CryptoJS.AES.decrypt(encrypted, secretKey);


    let data = {
        "email": inpUser.value,
        "senha": inpSenha.value
    }
    console.log(data)
    fetch("http://localhost:3000/Login", {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(data)
    })
        .then(res => { return res.json() })
        .then(data => {
            if (data.erro === undefined) {
                localStorage.setItem('ifuser', JSON.stringify(data))
                console.log(data)
                localStorage.setItem("info", JSON.stringify({ "email": data.email, "id": data.uid, "nivel": data.univel, "name": data.uname }));

                window.location.href = '../Home/index.html'
            } else {
                alert('Por favor verificar os campos')
            }
        })
}

