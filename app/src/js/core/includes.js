//importando o jquery
import $ from "jquery";

//array de funções a serem chamadas após o carregamento da página
const loadHtmlSuccessCallbacks = [];

export function onLoadHtmlSuccess(callback) {
  //função que popula o array de funções a serem chamadas após o carregamento da página

  //se a função ainda não estiver presente no array:
  if (!loadHtmlSuccessCallbacks.includes(callback)) {
    //inclui a função
    loadHtmlSuccessCallbacks.push(callback);
  }
}

function loadIncludes(parent) {
  // função que carrega o conteúdo html dos componentes que possuem o atributo wm-include

  //se o componente parent não estiver setado, atribui o body como default
  if (!parent) parent = "body";

  //obtendo o componende parent
  $(parent)
    //filtrando os subcomponentes que possuem o atributo wm-include
    .find("[wm-include]")
    //percorrendo os sobcomponentes filtrados
    .each(function(i, e) {
      //obtendo a url a partir do valor do atributo wm-include
      const url = $(e).attr("wm-include");
      //chamada ajax para obter o conteúdo da url
      $.ajax({
        url,
        //em caso de sucesso:
        success(data) {
          //inclui o conteúdo da url no html do componente
          $(e).html(data);
          //remove o attributo wm-include do componente
          $(e).removeAttr("wm-include");

          //chamando as funções a serem carregadas após o carregamento da página
          loadHtmlSuccessCallbacks.forEach((callback) => callback(data));

          //usando recursivamente a função loadIncludes para alcançar os componentes filhos
          loadIncludes(e);
        },
      });
    });
}

//chamando a função no body
loadIncludes();
