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
        $(fundoGame).append(`<div id="inimigo2"></div>`);
    })


/* movimenta o background do jogo */
    let jogo = {};
    /* função loop do background */
    jogo.timer = setInterval(loop, 30);
    function loop() {
        moveFundo();
        moveJogador();
        moveInimigo1();
        moveInimigo2();
        moveAmigo();
        colisao();
    }

/* teclas de comando do jogador */
    let Tecla = {
        W: 87,
        S: 83,
        D: 68
    }
    jogo.pressionou = [];

    /* verificação de tecla pressionada */
    $(document).keydown(function(e) {
        jogo.pressionou[e.which] = true;
    })

    $(document).keyup(function(e) {
        jogo.pressionou[e.which] = false;
    })

/* variáveis de movimentação do inimigo 1 */
    let velocidade = 5;
    let posicaoY = parseInt(Math.random() * 334);

/* váriáveis de movimentação do ataque do personagem */
    let podeAtirar = true;

/* função que movimenta o background */
    function moveFundo() {
        movimentacao = parseInt($(`.fundo-game`).css(`background-position`));
        $(`.fundo-game`).css(`background-position`, movimentacao - 4);
    }

/* função que movimenta o jogador */
    function moveJogador() {
        if(jogo.pressionou[Tecla.W]) {
            let Topo = parseInt($(`#jogador`).css(`top`));
            $(`#jogador`).css(`top`, Topo - 10);
            if(Topo <= 0) {
                $(`#jogador`).css(`top`, Topo + 20);
            }
        }

        if(jogo.pressionou[Tecla.S]) {
            let Topo = parseInt($(`#jogador`).css(`top`));
            $(`#jogador`).css(`top`, Topo + 10);
            if(Topo >= 437) {
                $(`#jogador`).css(`top`, Topo - 20);
            }
        }

        if(jogo.pressionou[Tecla.D]) {
            disparo();
        }
    }

/* função que movimenta o inimigo 1 */
    function moveInimigo1() {
        posicaoX = parseInt($(`#inimigo1`).css(`left`));
        $(`#inimigo1`).css(`left`, posicaoX - velocidade);
        $(`#inimigo1`).css(`top`, posicaoY);

        if(posicaoX <= 0) {
            posicaoY = parseInt(Math.random() * 334);
            $(`#inimigo1`).css(`left`, 694);
            $(`#inimigo1`).css(`top`, posicaoY);
        }
    }

/* função que movimenta o inimigo 2 */
    function moveInimigo2() {
        posicaoX = parseInt($(`#inimigo2`).css(`left`));
        $(`#inimigo2`).css(`left`, posicaoX - 3);

        if(posicaoX <= 0) {
            $(`#inimigo2`).css(`left`, 775);
        }
    }

/* função que movimenta o amigo */
    function moveAmigo() {
        posicaoX = parseInt($(`#amigo`).css(`left`));
        $(`#amigo`).css(`left`, posicaoX + 1);

        if(posicaoX > 906) {
            $(`#amigo`).css(`left`, 0);
        }
    }

/* função que possibilita o disparo */
    function disparo() {
        if(podeAtirar == true) {
            podeAtirar = false;

            Topo = parseInt($(`#jogador`).css(`top`));
            posicaoX = parseInt($(`#jogador`).css(`left`));
            tiroX = posicaoX + 190;
            TopoTiro = Topo + 37;
            $(fundoGame).append(`<div id="disparo"></div>`);
            $(`#disparo`).css(`top`, TopoTiro);
            $(`#disparo`).css(`left`, tiroX);

            var tempoDisparo = window.setInterval(executaDisparo, 30)
        }


        function executaDisparo() {
            posicaoX = parseInt($(`#disparo`).css(`left`));
            $(`#disparo`).css(`left`, posicaoX + 10);

            if(posicaoX > 900) {
                window.clearInterval(tempoDisparo);
                tempoDisparo = null;
                $(`#disparo`).remove();
                podeAtirar = true;
            }
        }
    }

/* função da colisão */
    function colisao() {
        var colisao1 = ($(`#jogador`).collision($(`#inimigo1`)));

        if(colisao1.length > 0) {
            inimigo1X = parseInt($(`#inimigo1`).css(`left`));
            inimigo1Y = parseInt($(`#inimigo1`).css(`top`));
            explosao1(inimigo1X, inimigo1Y);

            posicaoY = parseInt(Math.random() * 334);
            $(`#inimigo1`).css(`left`, 694);
            $(`#inimigo1`).css(`top`, posicaoY);
        }
    }

/* função da explosão */
    function explosao1(inimigo1X, inimigo1Y) {
        $(fundoGame).append(`<div id="explosao1"></div>`);
        var divDaExplosao1 = $(`#explosao1`);
        divDaExplosao1.css(`top`, inimigo1Y);
        divDaExplosao1.css(`left`, inimigo1X);
        divDaExplosao1.animate({width:200, opacity: 0}, `slow`);

        var tempoDaExplosao1 = window.setInterval(removeExplosao1, 1000);

        function removeExplosao1() {
            divDaExplosao1.remove();
            window.clearInterval(tempoDaExplosao1);
            tempoDaExplosao1 = null;
        }
    }