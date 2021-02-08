//importando o jquery
import $ from "jquery";

const loadHtmlSuccessCallbacks = [];

export function onLoadHtmlSuccess(callback) {
  if (!loadHtmlSuccessCallbacks.includes(callback)) {
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

          loadHtmlSuccessCallbacks.forEach((callback) => callback(data));

          //usando recursivamente a função loadIncludes para alcançar os componentes filhos
          loadIncludes(e);
        },
      });
    });
}

//chamando a função no body
loadIncludes();
