// Variables Board

let board;
let boardWidth = 750;
let boardHeight = 250;
let context;

// Variables dino

let dinoWidth = 88;
let dinoHeight = 88;
let dinoX = 50;
let dinoY = boardHeight-dinoHeight;
let dinoImg;

// Variables Cactus

let cactusArray = [];
let cactus1Width = 34;
let cactus2Width = 69;
let cactus3Width = 102;

let cactusHeight = 60;
let cactusX = 700;
let cactusY = boardHeight- cactusHeight;

let cactus1Img;
let cactus2Img;
let cactus3Img;

// Variables para fisicas del juego

let velocityX = -5;
let velocityY = 0;
let gravity = 0.3;

let gameOver = false;
let score = 0;

// Objeto DIno

let dino = {
    x : dinoX,
    y : dinoY,
    width : dinoWidth,
    height : dinoHeight
}

window.onload = function(){
    board = document.getElementById('board');

    //Se cambian las dimensiones del canvas 
    
    board.width = boardWidth;
    board.height = boardHeight;

    //Contexto del canvas

    context = board.getContext('2d');

    // Dibujo Dino

    dinoImg = new Image();
    dinoImg.src = 'images/dino.png';

    dinoImg.onload = function(){
        context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height );
    };


    cactus1Img = new Image ();
    cactus1Img.src = 'images/cactus1.png';
    
    cactus2Img = new Image ();
    cactus2Img.src = 'images/cactus2.png';
    
    cactus3Img = new Image ();
    cactus3Img.src = 'images/cactus3.png';

    requestAnimationFrame(update);

    setInterval(placeCactus,1000);

    document.addEventListener('keyup', moveDino);

    document.addEventListener("keydown", function(event) {
        if (gameOver && event.code === "Space") {
            resetGame();
        }
    });    

};

function update() {

if(gameOver){
    return;
}

    requestAnimationFrame(update);

    context.clearRect(0, 0, boardWidth, boardHeight);

    velocityY += gravity;

    dino.y = Math.min(dino.y + velocityY, dinoY);


    context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height );

    // Dibujar obstaculos

    for (let i = 0; i < cactusArray.length; i++) {
        let cactus = cactusArray[i];
        cactus.x += velocityX;
        context.drawImage(cactus.img, cactus.x, cactus.y, cactus.width, cactus.height);
        
    


    if(detectCollision(dino,cactus)){
        gameOver = true;
        alert('Game Over');

        dinoImg.src = 'images/dino-dead.png';
        dinoImg.onload = function(){
            context.drawImage(cactus.img, cactus.x, cactus.y, cactus.width, cactus.height);

        }
    }

    context.fillStyle = 'black';
    context.font = "20px courier";
    score++;
    context.fillText(score,5,20);
}}



function placeCactus() {
    
    if(gameOver){
        return;
    }

    // Objeto Cactus

    let cactus = {
      img: null,
      x: cactusX,
      y: cactusY,
      width: null,
      height: cactusHeight
    };
   
   
    let placeCactusChance = Math.random(); //Generamos un numero aleatorio entre 0 y 0.99999
   
   
   
   
    if (placeCactusChance > .90) { //10% de que salga cactus3
      cactus.img = cactus3Img;
      cactus.width = cactus3Width;
      cactusArray.push(cactus);
    } else if (placeCactusChance > .70) { //30% de que salga cactus2
      cactus.img = cactus2Img;
      cactus.width = cactus2Width;
      cactusArray.push(cactus);
    } else if (placeCactusChance > .50) { //50% de que salga cactus1
      cactus.img = cactus1Img;
      cactus.width = cactus1Width;
      cactusArray.push(cactus);
    }

    if(cactusArray.length > 5){
        cactusArray.shift;

    }


   }


   function moveDino(e){
    if(gameOver){
        return;
    }

    if((e.code == 'Space' || e.code == 'ArrowUp')&& dino.y == dinoY){
        velocityY= -10;
    }
   }
   

   function detectCollision(a, b) {
    return a.x < b.x + b.width &&   //a's top left corner doesn't reach b's top right corner
           a.x + a.width > b.x &&   //a's top right corner passes b's top left corner
           a.y < b.y + b.height &&  //a's top left corner doesn't reach b's bottom left corner
           a.y + a.height > b.y;    //a's bottom left corner passes b's top left corner
   }

   function resetGame() {
    gameOver = false;
    score = 0;
    dino.y = dinoY;
    velocityY = 0;
    cactusArray = [];
    requestAnimationFrame(update);
} 