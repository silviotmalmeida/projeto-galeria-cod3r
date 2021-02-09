//importando o jquery
import $ from "jquery";

//importando a função onLoadHtmlSuccess do include.js
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
            //adiciona a classe d-none da div
            .addClass("d-none");
        });
      }
    });
}

// plugin jquery para desenhar os botões a partir dos valores dos atributos wm-city
$.fn.cityButtons = function() {
  //criando um conjunto para as cidades
  const cities = new Set();

  //obtendo os componentes com o atributo wm-city
  $("[wm-city]")
    //percorrendo a lista de componentes
    .each(function(i, e) {
      //populando o conjunto de cidades com os valores dos atributos wm-city
      cities.add($(e).attr("wm-city"));
    });

  //criando o array de botões a partir do conjunto de cidades para um array
  const btns = Array.from(cities)

    //para cada item do array:
    .map((city) => {
      //cria o botão
      const btn = $("<button>")
        //adiciona as classes
        .addClass(["btn", "btn-info"])
        //adiciona a label
        .html(city);
      //define o evento de click
      btn.on("click", (e) => {
        //filtrando as imagens
        filterByCity(city);

        //retirando a classe active de todos os botões
        $(".btn").removeClass("active");

        //incluindo a classe active no botão pressionado
        $(e.target).addClass("active");
      });
      return btn;
    });

  //criando o botão que exibe todas as imagens
  const btnAll = $("<button>")
    //adiciona as classes
    .addClass(["btn", "btn-info", "active"])
    //adiciona a label
    .html("Todas");
  //define o evento de click
  btnAll.on("click", (e) => {
    //filtrando as imagens
    filterByCity(null);

    //retirando a classe active de todos os botões
    $(".btn").removeClass("active");

    //incluindo a classe active no botão pressionado
    $(e.target).addClass("active");
  });
  //inclui no final do array de botões
  btns.push(btnAll);

  //criando a div para os botões
  const btnGroup = $("<div>").addClass(["btn-group"]);

  //incluindo os botões na div
  btnGroup.append(btns);

  //incluido a div com os botões no componente que chamar o plugin
  $(this).html(btnGroup);
  return this;
};

//inserindo o plugin cityButtons no array de funções a serem executadas
//após o carregamento da página
onLoadHtmlSuccess(function() {
  //popula a div que possui o atributo wm-city-buttons com os botões
  $("[wm-city-buttons]").cityButtons();
});
