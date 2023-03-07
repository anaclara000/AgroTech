
// INFOS DO USUARIO 
const nome = document.querySelector(".nameUser");
var userinfo = JSON.parse(localStorage.getItem("info"));

nome.innerHTML = userinfo.name;
