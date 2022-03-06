/* JS do jogo*/
var fundoGame = document.getElementById("fundoGame");
let instrucoes = document.getElementById("blocoInstrucoes");
let botaoComecaJogo = document.getElementById("botao-comeca-jogo");


/* inicia o jogo com o clique do botão */
botaoComecaJogo.addEventListener("click", () => {
    $(instrucoes).hide();

    $(fundoGame).append(`<div id="jogador" class="animacaoJogador"></div>`);
    $(fundoGame).append(`<div id="amigo" class="animacaoAmigo"></div>`);
    $(fundoGame).append(`<div id="inimigo1" class="animacaoInimigo1"></div>`);
    $(fundoGame).append(`<div id="inimigo2"></div>`);

    start();
})

/* início da função start */
function start() { 
    $(fundoGame).append("<div id='placar'></div>");
    $(fundoGame).append("<div id='energia2'></div>");
    $(fundoGame).append("<div id='energia'></div>");

    /* Principais variáveis do jogo */
    var jogo = {}
    var fimdejogo = false;
    var energia2Atual = 5;
    var energiaAtual = 3;
    var pontos = 0;
    var salvos = 0;
    var perdidos = 0;
    var podeAtirar = true;
    var explosaoAcontecendo = false;
    var explosaoAcontecendo2 = false;
    var velocidade = 5;
    var posicaoY = parseInt(Math.random() * 334);
    var TECLA = {
        W: 87,
        S: 83,
        D: 68
    }

    jogo.pressionou = [];

    var somDisparo = document.getElementById("somDisparo");
    var somExplosao = document.getElementById("somExplosao");
    var musica = document.getElementById("musica");
    var somGameover = document.getElementById("somGameover");
    var somPerdido = document.getElementById("somPerdido");
    var somResgate = document.getElementById("somResgate");
    var errorPassou = document.getElementById("errorPassou");
    var introMusica = document.getElementById("introMusica");

    /* Música em loop */
    introMusica.pause();
    musica.addEventListener("ended", function() {
        musica.currentTime = 0;
        musica.play();
    }, false);
    musica.play();

    /* Verifica se o usuário pressionou alguma tecla */
    $(document).keydown(function(e) {
        jogo.pressionou[e.which] = true;
    });


    $(document).keyup(function(e) {
        jogo.pressionou[e.which] = false;
    });

    /* Game Loop */
    jogo.timer = setInterval(loop, 30);

    /* início da função loop */
        function loop() {
            movefundo();
            movejogador();
            moveinimigo1();
            moveinimigo2();
            moveamigo();
            colisao();
        }
    /* fim da função loop */

    /* início da função que movimenta o fundo do jogo */
        function movefundo() {
            esquerda = parseInt($(fundoGame).css("background-position"));
            $(fundoGame).css("background-position", esquerda - 3);
        }
    /* fim da função que movimenta o fundo do jogo */

    /* início da função que movimenta o jogador */
        function movejogador() {
            if(jogo.pressionou[TECLA.W]) {
                var topo = parseInt($("#jogador").css("top"));
                $("#jogador").css("top", topo - 10);

                if(topo <= 0) {
                    $("#jogador").css("top", topo + 20);
                }
            }

            if(jogo.pressionou[TECLA.S]) {
                var topo = parseInt($("#jogador").css("top"));
                $("#jogador").css("top", topo + 10);

                if(topo >= 437) {
                    $("#jogador").css("top", topo - 20);
                }
            }

            if(jogo.pressionou[TECLA.D]) {
                disparo();
            }

        }
    /* fim da função que movimenta o jogador */
    
    /* início da função que movimenta o inimigo 1 */
        function moveinimigo1() {
            posicaoX = parseInt($("#inimigo1").css("left"));
            $("#inimigo1").css("left", posicaoX - velocidade);
            $("#inimigo1").css("top", posicaoY);

            if(posicaoX <= 0) {
                posicaoY = parseInt(Math.random() * 334);
                $("#inimigo1").css("left", 694);
                $("#inimigo1").css("top", posicaoY);
            }
        }
    /* fim da função que movimenta o inimigo 1 */

    /* início da função que movimenta o inimigo 2 */
        function moveinimigo2() {
            posicaoX = parseInt($("#inimigo2").css("left"));
            $("#inimigo2").css("left", posicaoX - 3);

            if(posicaoX <= 0) {
                $("#inimigo2").css("left", 100);
            }
        }
    /* fim da função que movimenta o inimigo 2 */

    /* início da função que movimenta o amigo */
        function moveamigo() {
            posicaoX = parseInt($("#amigo").css("left"));
            $("#amigo").css("left", posicaoX + 1);

            if(posicaoX > 906) {
                $("#amigo").css("left", 0);
            }
        }
    /* fim da função que movimenta o amigo */

    /* início da função do disparo */
        function disparo() {
            /* início da condição "pode atirar" */
                if(podeAtirar == true) {
                    podeAtirar = false;

                    topo = parseInt($("#jogador").css("top"))
                    posicaoX = parseInt($("#jogador").css("left"))
                    tiroX = posicaoX + 190;
                    topoTiro = topo + 37;
                    $(fundoGame).append("<div id='disparo'></div>");
                    $("#disparo").css("top", topoTiro);
                    $("#disparo").css("left", tiroX);

                    var tempoDisparo = window.setInterval(executaDisparo, 30);
                }
            /* fim da condição "pode atirar" */

            /* início da função executa disparo */
                function executaDisparo() {
                    posicaoX = parseInt($("#disparo").css("left"));
                    $("#disparo").css("left", posicaoX + 10);

                    if(posicaoX > 900) {
                        window.clearInterval(tempoDisparo);
                        tempoDisparo = null;
                        $("#disparo").remove();
                        podeAtirar = true;
                    }
                }
            /* fim da função executa disparo */
        }
    /* fim da função do disparo */

    /* início da função colisão */
        function colisao() {
            var colisao1 = ($("#jogador").collision($("#inimigo1")));
            var colisao2 = ($("#jogador").collision($("#inimigo2")));
            var colisao3 = ($("#disparo").collision($("#inimigo1")));
            var colisao4 = ($("#disparo").collision($("#inimigo2")));
            var colisao5 = ($("#jogador").collision($("#amigo")));
            var colisao6 = ($("#inimigo2").collision($("#amigo")));

            /* início da colisão do jogador com o inimigo 1 */
                if(colisao1.length > 0) {
                    energiaAtual--;

                    inimigo1X = parseInt($("#inimigo1").css("left"));
                    inimigo1Y = parseInt($("#inimigo1").css("top"));
                    explosao1(inimigo1X, inimigo1Y);

                    posicaoY = parseInt(Math.random() * 334);
                    $("#inimigo1").css("left", 900);
                    $("#inimigo1").css("top", posicaoY);
                }
            /* fim da colisão do jogador com o inimigo 1 */

            /* início da colisão do jogador com o inimigo 2 */
                if(colisao2.length > 0) {
                    energiaAtual--;

                    inimigo2X = parseInt($("#inimigo2").css("left"));
                    inimigo2Y = parseInt($("#inimigo2").css("top"));
                    explosao1(inimigo2X, inimigo2Y - 20);

                    $("#inimigo2").remove();

                    reposicionaInimigo2();
                }
            /* fim da colisão do jogador com o inimigo 2 */
            
            /* início da colisão do disparo do jogador com o inimigo 1 */
                if(colisao3.length > 0) {
                    pontos = pontos + 100;
                    velocidade = velocidade + 0.2;

                    inimigo1X = parseInt($("#inimigo1").css("left"));
                    inimigo1Y = parseInt($("#inimigo1").css("top"));

                    explosao1(inimigo1X, inimigo1Y);
                    $("#disparo").css("left", 950);

                    posicaoY = parseInt(Math.random() * 334);
                    $("#inimigo1").css("left", 694);
                    $("#inimigo1").css("top", posicaoY);
                }
            /* fim da colisão do disparo do jogador com o inimigo 1 */

            /* início da colisão do disparo do jogador com o inimigo 2 */
                if(colisao4.length > 0) {
                    pontos = pontos + 50;

                    inimigo2X = parseInt($("#inimigo2").css("left"));
                    inimigo2Y = parseInt($("#inimigo2").css("top"));
                    $("#inimigo2").remove();

                    explosao2(inimigo2X, inimigo2Y);
                    $("#disparo").css("left", 950);

                    reposicionaInimigo2();
                }
            /* fim da colisão do disparo do jogador com o inimigo 2 */

            /* início da colisão do jogador com o amigo */
                if(colisao5.length > 0) {
                    somResgate.play();
                    salvos++;

                    reposicionaAmigo();
                    $("#amigo").remove();
                }
            /* fim da colisão do jogador com o amigo */

            /* início da colisão do inimigo 2 com o amigo */
                if(colisao6.length>0) {
                    perdidos++;    
                    amigoX = parseInt($("#amigo").css("left"));
                    amigoY = parseInt($("#amigo").css("top"));
                    explosao3(amigoX,amigoY);
                    $("#amigo").remove();
                            
                    reposicionaAmigo();      
                }
            /* fim da colisão do inimigo 2 com o amigo */
        }
    /* fim da função colisão */

    /* início da função da explosão 1 */
        function explosao1(inimigo1X,inimigo1Y) {
            somExplosao.play();
            $(fundoGame).append("<div id='explosao1'></div");
            var divExplosao1 = $("#explosao1");
            divExplosao1.css("top", inimigo1Y);
            divExplosao1.css("left", inimigo1X);
            divExplosao1.animate({width:200, opacity:0}, "slow");
            
            var tempoDaExplosao1 = window.setInterval(removeExplosao, 1000);
            
            function removeExplosao() {
                divExplosao1.remove();
                window.clearInterval(tempoDaExplosao1);
                tempoDaExplosao1=null;
            } 
        }
    /* fim da função da explosão 1 */

    /* início da função da explosão 2 */
        function explosao2(inimigo2X,inimigo2Y) {
            somExplosao.play();
            $(fundoGame).append("<div id='explosao2'></div");
            var divExplosao2 = $("#explosao2");
            divExplosao2.css("top", inimigo2Y);
            divExplosao2.css("left", inimigo2X);
            divExplosao2.animate({width:200, opacity:0}, "slow");
            
            var tempoDaExplosao2 = window.setInterval(removeExplosao2, 1000);
            
            function removeExplosao2() {
                tempoDaExplosao2.remove();
                window.clearInterval(tempoDaExplosao2);
                tempoDaExplosao2 = null;
            }
        }
    /* fim da função da explosão 2 */

    /* início da função da explosão 3 */
        function explosao3(amigoX,amigoY) {
            somPerdido.play();
            $(fundoGame).append("<div id='explosao3'></div");
            $("#explosao3").css("top",amigoY);
            $("#explosao3").css("left",amigoX);

            var tempoDaExplosao3 = window.setInterval(resetaExplosao3, 1000);

            function resetaExplosao3() {
                $("#explosao3").remove();
                window.clearInterval(tempoDaExplosao3);
                tempoDaExplosao3 = null;     
            }
        } 
    /* fim da função da explosão 3 */

    /* início da função que reposiciona o inimigo 2 */
        function reposicionaInimigo2() {
            var tempoColisao4 = window.setInterval(reposiciona4, 5000);
                
            function reposiciona4() {
                window.clearInterval(tempoColisao4);
                tempoColisao4 = null;
                    
                if (fimdejogo == false) {
                    $(fundoGame).append("<div id='inimigo2'></div");
                }
            }	
        }
    /* fim da função que reposiciona o inimigo 2 */

    /* início da função que reposiciona o amigo */
        function reposicionaAmigo() {
            var tempoAmigo = window.setInterval(reposiciona6, 6000);
            
            function reposiciona6() {
                window.clearInterval(tempoAmigo);
                tempoAmigo = null;
                
                if (fimdejogo==false) {
                    $(fundoGame).append("<div id='amigo' class='animacaoAmigo'></div>");
                } 
            } 
        }
    /* fim da função que reposiciona o amigo */
}
/* fim da função start */
