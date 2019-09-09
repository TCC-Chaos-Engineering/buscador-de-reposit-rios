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

function mostrarError(erro) {
  listaRepositorios.innerHTML = "";
  var errorElement = document.createElement("div");
  var textElement = document.createTextNode(erro);
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

  axios
    .get(`https://api.github.com/users/${inputPesquisa.value}/repos`)
    .then(function(response) {
      var descricaoUsario = document.querySelector("#descricaoUsuario");
      descricaoUsario.innerHTML = "";
      var textoDescricaoUsuario = document.createTextNode(
        `${response.data.length} Repositórios públicos e forks encontrados do usuário '${inputPesquisa.value}' no GitHub`
      );
      listaRepositorios.innerHTML = "";
      descricaoUsario.append(textoDescricaoUsuario);
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
    .catch(e => {
      mostrarError(e);
    });
}
