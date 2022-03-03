/* JS do jogo*/
    let fundoGame = document.getElementById("fundoGame");
    let instrucoes = document.getElementById("blocoInstrucoes");
    let botaoComecaJogo = document.getElementById("botao-comeca-jogo");


/* inicia o jogo com o clique do botão */
    botaoComecaJogo.addEventListener("click", () => {
        $(instrucoes).hide();


        $(fundoGame).append(`<div id="jogador" class="animacaoJogador"></div>`);
        $(fundoGame).append(`<div id="amigo" class="animacaoAmigo"></div>`);
        $(fundoGame).append(`<div id="inimigo1" class="animacaoInimigo1"></div>`);
        $(fundoGame).append(`<div id="inimigo2" class="animacaoInimigo2"></div>`);
    })
