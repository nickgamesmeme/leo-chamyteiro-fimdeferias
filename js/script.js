// ======================
// ELEMENTOS
// ======================

const menu = document.getElementById("menu");
const menuContent = document.getElementById("menu-content");

const gameBoard = document.querySelector(".game-board");

const chamyteiro = document.querySelector(".chamyteiro");
const cacto = document.querySelector(".cacto");

const scoreElement = document.querySelector(".score");
const gameOver = document.querySelector(".game-over");

const music = document.getElementById("bg-music");


// Imagens

const imagemNormal = "img/chamyteiro.png";
const imagemMorto = "img/game-over.png";



// ======================
// VARIÁVEIS
// ======================

let score = 0;

let gameRunning = false;

let scoreInterval = null;

let collisionLoop = null;

let jumpTimeout = null;



// ======================
// MENU
// ======================

function showTutorial(){

    menuContent.classList.remove("hidden");

    menuContent.innerHTML = `
        <h2>Tutorial</h2>
        <p>Pule usando qualquer tecla ou toque na tela.</p>
        <p>Desvie dos cactos.</p>
    `;

}



function showCredits(){

    menuContent.classList.remove("hidden");

    menuContent.innerHTML = `
        <h2>Mensagem</h2>
        <p>Finalmente acabou suas férias, Leo! Seu time já estava com saudades!.</p>
    `;

}




// ======================
// INICIAR
// ======================

function startGame(){

    menu.classList.add("hidden");

    gameBoard.classList.remove("hidden");

    iniciar();

}





// ======================
// RESET DO JOGO
// ======================

function iniciar(){


    // limpa tudo antes

    clearInterval(scoreInterval);

    cancelAnimationFrame(collisionLoop);



    if(jumpTimeout){

        clearTimeout(jumpTimeout);

    }



    gameRunning = true;



    score = 0;

    scoreElement.innerText = "0";



    // remove tela game over

    gameOver.classList.add("hidden");



    // personagem normal

    chamyteiro.src = imagemNormal;

    chamyteiro.classList.remove("jump");

    chamyteiro.style.bottom = "0px";



    // reseta cacto

    cacto.style.animation = "none";

    cacto.style.left = "";

    cacto.style.right = "-70px";



    void cacto.offsetWidth;



    cacto.style.animation =
    "cacto-animation 1.8s linear infinite";




    // música

    music.pause();

    music.currentTime = 0;

    music.volume = 0.3;


    music.play().catch(()=>{});




    // score

    scoreInterval = setInterval(()=>{


        if(gameRunning){

            score++;

            scoreElement.innerText = score;

        }


    },100);




    collisionLoop =
    requestAnimationFrame(verificarColisao);


}





// ======================
// PULO
// ======================

function jump(){


    if(!gameRunning)
        return;



    if(chamyteiro.classList.contains("jump"))
        return;



    chamyteiro.classList.add("jump");



    jumpTimeout = setTimeout(()=>{


        chamyteiro.classList.remove("jump");


    },500);


}





// ======================
// COLISÃO
// ======================

function verificarColisao(){


    if(!gameRunning)
        return;



    const cactus =
    cacto.getBoundingClientRect();



    const player =
    chamyteiro.getBoundingClientRect();



    const bateu =

        player.right > cactus.left + 15 &&

        player.left < cactus.right - 15 &&

        player.bottom > cactus.top + 20;



    if(bateu){

        finalizar();

        return;

    }



    collisionLoop =
    requestAnimationFrame(verificarColisao);


}






// ======================
// MORTE
// ======================

function finalizar(){


    if(!gameRunning)
        return;



    gameRunning = false;



    clearInterval(scoreInterval);

    cancelAnimationFrame(collisionLoop);



    music.pause();



    // troca imagem personagem

    chamyteiro.src = imagemMorto;

    chamyteiro.style.bottom = "-10px";



    // congela cacto no local

    const cactusPosition =
    cacto.getBoundingClientRect();



    const boardPosition =
    gameBoard.getBoundingClientRect();



    cacto.style.animation = "none";

    cacto.style.right = "auto";

    cacto.style.left =
    (cactusPosition.left - boardPosition.left) + "px";



    // mostra game over

    gameOver.classList.remove("hidden");


}





// ======================
// REINICIAR
// ======================

function restartGame(){

    gameOver.classList.add("hidden");

    iniciar();

}





// ======================
// CONTROLES
// ======================


// PC - qualquer tecla

document.addEventListener("keydown",(e)=>{


    e.preventDefault();

    jump();


});




// CELULAR - toque em qualquer lugar

document.addEventListener("touchstart",(e)=>{


    e.preventDefault();

    jump();


},
{
    passive:false
});