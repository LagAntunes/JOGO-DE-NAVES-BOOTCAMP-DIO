/* JS do jogo*/
let fundoGame = document.getElementById("fundoGame");
let instrucoes = document.getElementById("blocoInstrucoes");
let botaoComecaJogo = document.getElementById("botao-comeca-jogo");

botaoComecaJogo.addEventListener("click", () => {
    $(instrucoes).hide();


    $(fundoGame).append(`<div id="jogador"></div>`);
    $(fundoGame).append(`<div id="amigo"></div>`);
    $(fundoGame).append(`<div id="inimigo1"></div>`);
    $(fundoGame).append(`<div id="inimigo2"></div>`);
})
