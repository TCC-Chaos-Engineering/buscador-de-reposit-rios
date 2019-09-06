// const request = require("request");

// const options = {
//   url: "https://api.github.com/repos/request/request",
//   headers: {
//     "User-Agent": "request"
//   }
// };

var inputPesquisa = document.querySelector("#inputPesquisa");
var listaRepositorios = document.querySelector("#listaRepositorios");

function mostrarLoading() {
  listaRepositorios.innerHTML = "";
  var loadingElement = document.createElement("div");
  loadingElement.setAttribute(
    "class",
    "spinner-border text-secondary centralizado"
  );
  loadingElement.setAttribute("role", "status");
  var spanLoading = document.createElement("span");
  spanLoading.setAttribute("class", "sr-only");
  var textoSpan = document.createTextNode("Loading...");
  spanLoading.appendChild(textoSpan);
  loadingElement.appendChild(spanLoading);
  listaRepositorios.appendChild(loadingElement);
}

function mostrarError() {
  listaRepositorios.innerHTML = "";
  var errorElement = document.createElement("div");
  var textElement = document.createTextNode("Erro na requisição.");
  errorElement.setAttribute("class", "alert alert-danger mt-3");
  errorElement.setAttribute("role", "alert");
  errorElement.appendChild(textElement);
  listaRepositorios.appendChild(errorElement);
}

function buscarRepositorio() {
  var msgErro = document.createElement("div");
  var textoMsgErro = document.createTextNode("Você não digitou um usuário.");
  msgErro.setAttribute("class", "alert alert-danger mt-3");
  msgErro.setAttribute("role", "alert");
  msgErro.appendChild(textoMsgErro);

  if (!inputPesquisa.value) return listaRepositorios.appendChild(msgErro);

  console.log("inputPesquisa.value", inputPesquisa.value);

  axios
    .get(`https://api.github.com/users/${inputPesquisa.value}/repos`)
    .then(function(response) {
      listaRepositorios.innerHTML = "";
      var descricaoUsario = document.querySelector("#descricaoUsuario");
      var textoDescricaoUsuario = document.createTextNode(
        `Repositórios públicos e forks do usuário '${inputPesquisa.value}' no GitHub`
      );
      descricaoUsario.appendChild(textoDescricaoUsuario);
      listaRepositorios.appendChild(descricaoUsario);
      inputPesquisa.value = "";
      response.data.forEach(element => {
        var listaRepositorios = document.querySelector("#listaRepositorios");
        var itemListaRepositorios = document.createElement("li");
        itemListaRepositorios.setAttribute("class", "list-group-item");
        var textoItemListaRepositorios = document.createTextNode(element.name);
        itemListaRepositorios.appendChild(textoItemListaRepositorios);
        listaRepositorios.appendChild(itemListaRepositorios);
      });
    })
    .catch(function() {
      mostrarError();
    });
}
