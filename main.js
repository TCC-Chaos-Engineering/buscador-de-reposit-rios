var inputPesquisa = document.querySelector("#inputPesquisa");
var listaRepositorios = document.querySelector("#listaRepositorios");
var cardUsuario = document.querySelector("#cardUsuario");

// function mostrarLoading() {
//   listaRepositorios.innerHTML = "";
//   var loadingElement = document.createElement("div");
//   loadingElement.setAttribute(
//     "class",
//     "spinner-border text-secondary centralizado"
//   );
//   loadingElement.setAttribute("role", "status");
//   var spanLoading = document.createElement("span");
//   spanLoading.setAttribute("class", "sr-only");
//   var textoSpan = document.createTextNode("Loading...");
//   spanLoading.appendChild(textoSpan);
//   loadingElement.appendChild(spanLoading);
//   listaRepositorios.appendChild(loadingElement);
// }

function mostrarErroRequisicao(erro) {
  listaRepositorios.innerHTML = "";
  var errorElement = document.createElement("div");
  var textElement = document.createTextNode(erro);
  errorElement.setAttribute("class", "alert alert-danger mt-3");
  errorElement.setAttribute("role", "alert");
  errorElement.appendChild(textElement);
  listaRepositorios.appendChild(errorElement);
}

function mostrarErrorUsuarioVazio() {
  var msgErro = document.createElement("div");
  var textoMsgErro = document.createTextNode("Você não digitou um usuário.");
  msgErro.setAttribute("class", "alert alert-danger mt-3");
  msgErro.setAttribute("role", "alert");
  msgErro.appendChild(textoMsgErro);

  if (!inputPesquisa.value) return listaRepositorios.appendChild(msgErro);
}

function buscarRepositorios() {
  mostrarErrorUsuarioVazio();
  axios
    .get(`https://api.github.com/users/${inputPesquisa.value}/repos`)
    .then(function(response) {
      var descricaoUsario = document.querySelector("#descricaoUsuario");
      descricaoUsario.innerHTML = "";
      var textoDescricaoUsuario = document.createTextNode(
        `${response.data.length} repositórios públicos e forks encontrados`
      );
      listaRepositorios.innerHTML = "";
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
    .catch(e => {
      mostrarErroRequisicao(e);
    });
}

function buscarPerfil() {
  mostrarErrorUsuarioVazio();

  axios
    .get(`https://api.github.com/users/${inputPesquisa.value}`)
    .then(function(response) {
      var nomeUsario = document.querySelector("#nomeUsuario");
      var textoNomeUsuario = document.createTextNode(`${response.data.name}`);
      var imagemUsario = document.querySelector("#imagemUsuario");
      imagemUsario.setAttribute("src", `${response.data.avatar_url}`);
      var nomeLocalidade = document.querySelector("#nomeLocalidade");
      var textoNomeLocalidade = document.createTextNode(
        `${response.data.location}`
      );
      nomeUsario.innerHTML = "";
      cardUsuario.innerHTML = "";
      inputPesquisa.value = "";
      nomeLocalidade.innerHTML = "";
      nomeUsario.appendChild(textoNomeUsuario);
      nomeLocalidade.appendChild(textoNomeLocalidade);
      cardUsuario.appendChild(nomeUsario);
      if (response.data.location !== null) {
        cardUsuario.appendChild(nomeLocalidade);
      }
    })
    .catch(e => {
      mostrarErroRequisicao(e);
    });
}
