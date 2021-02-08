//importando o jquery
import $ from "jquery";

import { onLoadHtmlSuccess } from "../core/includes";

//duração da animação de fade-in e fade-out das imagens
const duration = 300;

function filterByCity(city) {
  //função que filtra as imagens cujo atributo wm-city coincida com o arqumento passado

  //obtendo os componentes com atributo wm-city
  $("[wm-city]")
    //percorrendo a lista de componentes
    .each(function(i, e) {
      //se o valor do atributo wm-city coincidir com o argumento passado ou for o argumento for nulo:
      const isTarget = $(this).attr("wm-city") === city || city === null;
      if (isTarget) {
        //obtém o componente img
        $(this)
          //obtém o componente pai (div)
          .parent()
          //remove a classe d-none da div
          .removeClass("d-none");
        //inicia o fade-in da img
        $(this).fadeIn(duration);

        //senão:
      } else {
        //inicia o fade-out da img
        $(this).fadeOut(duration, () => {
          //obtém o componente img
          $(this)
            //obtém o componente pai (div)
            .parent()
            //remove a classe d-none da div
            .addClass("d-none");
        });
      }
    });
}

$.fn.cityButtons = function() {
  const cities = new Set();
  $("[wm-city]").each(function(i, e) {
    cities.add($(e).attr("wm-city"));
  });

  const btns = Array.from(cities).map((city) => {
    const btn = $("<button>")
      .addClass(["btn", "btn-info"])
      .html(city);
    btn.click((e) => filterByCity(city));
    return btn;
  });

  const btnAll = $("<button>")
    .addClass(["btn", "btn-info", "active"])
    .html("Todas");
  btnAll.click((e) => filterByCity(null));
  btns.push(btnAll);

  const btnGroup = $("<div>").addClass(["btn-group"]);
  btnGroup.append(btns);

  $(this).html(btnGroup);
  return this;
};

onLoadHtmlSuccess(function() {
  $("[wm-city-buttons]").cityButtons();
});
