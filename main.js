const canvas = document.getElementById('canvas');
const canvasContext = canvas.getContext('2d');

const radiusStick = 25;
let canvasPos = getPosition(canvas);
let playerStickX = canvas.width / 2;
let playerStickY = canvas.height - 50;

const radiusStickC = 25;
let computerStickX = canvas.width / 2;
let computerStickY = 50;
let computerXD = 3;
let computerYD = 3;

let puckX = canvas.width / 2;
let puckY = canvas.height / 2;
const puckRadius = 15;
let puckSpeed = 5;
let puckXD = 5;
let puckYD = 7;

let frictionX = 0.997;
let frictionY = 0.997;

let playerScore = 0;
let computerScore = 0;
let compScore = document.getElementById('computerScore');
let playScore = document.getElementById('playerScore');
let result = document.getElementsByTagName('h2');

canvas.focus();


canvas.addEventListener('mousemove', setMousePosition, false);

function setMousePosition(e) {
    let newX = e.clientX - canvasPos.x;
    let newY = e.clientY - canvasPos.y;
    if(newX - radiusStick >= 0 && newX + radiusStick <= canvas.width) playerStickX = newX;
    if(newY - radiusStick >= canvas.height / 2 && newY + radiusStick <= canvas.height) playerStickY = newY;
} 


// function to draw the board
function drawBoard() {   
    canvasContext.beginPath();
    canvasContext.fillStyle = '#8c8c8c';
    for (let i = 0; i < 40; i++) {
        for (let j = 0; j < 20; j++) {
            canvasContext.fillRect(j * 20 + 8, i * 20 + 12, 2, 2);
        } 
    }
    canvasContext.closePath();
    canvasContext.beginPath();
    canvasContext.setLineDash([]);
    canvasContext.strokeStyle = '#CF7A7E';
    canvasContext.lineWidth = '4';
    canvasContext.arc(canvas.width / 2, canvas.height / 2, 40, 0, 2 * Math.PI);
    canvasContext.stroke();
    canvasContext.closePath();

    canvasContext.beginPath();
    canvasContext.setLineDash([8, 13]);
    canvasContext.moveTo(0, canvas.height / 2);
    canvasContext.lineTo(canvas.width, canvas.height / 2);
    canvasContext.stroke();
    canvasContext.closePath();

    canvasContext.beginPath();
    canvasContext.setLineDash([]);    
    canvasContext.arc(canvas.width / 2, canvas.height / 2, 7, 0, 2 * Math.PI);
    canvasContext.fillStyle = "#CF7A7E";
    canvasContext.fill();
    canvasContext.closePath();

    canvasContext.beginPath();
    canvasContext.setLineDash([]);
    canvasContext.lineWidth = '4';
    canvasContext.arc(canvas.width / 2, canvas.height, 60, 0, 2 * Math.PI);
    canvasContext.stroke();
    canvasContext.closePath();

    canvasContext.beginPath();
    canvasContext.setLineDash([]);
    canvasContext.lineWidth = '4';
    canvasContext.arc(canvas.width / 2, 0, 60, 0, 2 * Math.PI);
    canvasContext.stroke();
    canvasContext.closePath();
    
}

// function to draw Player's stick
function drawPlayerStick() {
    canvasContext.beginPath();
    canvasContext.arc(playerStickX, playerStickY, radiusStick, 0, 2 * Math.PI, true);
    canvasContext.fillStyle = "#e6005c";
    canvasContext.fill();
    canvasContext.closePath();

    canvasContext.beginPath();
    canvasContext.strokeStyle = '#cc0052';
    canvasContext.lineWidth = '15';
    canvasContext.arc(playerStickX, playerStickY, radiusStick-11, 0, 2 * Math.PI, true);
    canvasContext.stroke();
    canvasContext.closePath();

    canvasContext.beginPath();
    canvasContext.strokeStyle = '#b30047';
    canvasContext.lineWidth = '6';
    canvasContext.arc(playerStickX, playerStickY, radiusStick-13, 0, 2 * Math.PI, true);
    canvasContext.stroke();
    canvasContext.closePath();
}

// function to draw Computer's stick
function drawComputerStick() {
    canvasContext.beginPath();
    canvasContext.arc(computerStickX, computerStickY, radiusStickC, 0, 2 * Math.PI, true);
    canvasContext.fillStyle = "#0066ff";
    canvasContext.fill();
    canvasContext.closePath();

    canvasContext.beginPath();
    canvasContext.strokeStyle = '#005ce6';
    canvasContext.lineWidth = '15';
    canvasContext.arc(computerStickX, computerStickY, radiusStickC-11, 0, 2 * Math.PI, true);
    canvasContext.stroke();
    canvasContext.closePath();

    canvasContext.beginPath();
    canvasContext.strokeStyle = '#0052cc';
    canvasContext.lineWidth = '6';
    canvasContext.arc(computerStickX, computerStickY, radiusStickC-13, 0, 2 * Math.PI, true);
    canvasContext.stroke();
    canvasContext.closePath();
}

// function to draw the puck
function drawPuck() {
    canvasContext.beginPath();
    //canvasContext.strokeStyle = '#ff9900';
    canvasContext.lineWidth = '3';
    canvasContext.arc(puckX, puckY, puckRadius, 0, 2 * Math.PI);
    canvasContext.fillStyle = "#ff9900";
    canvasContext.fill();
    canvasContext.closePath();

    canvasContext.beginPath();
    canvasContext.fillStyle = '#ffad33';
    canvasContext.arc(puckX, puckY, 8, 0, 2 * Math.PI, true);
    canvasContext.fill();
    canvasContext.closePath();
}

function getPosition(el) {
    var xPosition = 0;
    var yPosition = 0;
   
    while (el) {
      xPosition += (el.offsetLeft - el.scrollLeft + el.clientLeft);
      yPosition += (el.offsetTop - el.scrollTop + el.clientTop);
      el = el.offsetParent;
    }
    return {
      x: xPosition,
      y: yPosition
    };
  }

function movePuck() {
    if( puckX + puckRadius >= canvas.width || puckX - puckRadius <= 0 ) puckXD = -puckXD; 
    if(puckY + puckRadius >= canvas.height || puckY - puckRadius <= 0 ) puckYD = -puckYD;
    if((puckX + puckRadius < canvas.width / 2 + 70 && puckX - puckRadius > canvas.width / 2 - 70 ) && (puckY - puckRadius <= 0)) console.log(playerScore++);
    if((puckX + puckRadius < canvas.width / 2 + 70 && puckX - puckRadius > canvas.width / 2 - 70 ) && (puckY + puckRadius >= canvas.height)) console.log(computerScore++);
    puckX += puckXD;
    puckY += puckYD;
}

function moveComputerStick() {
    if(computerStickX + radiusStickC >= canvas.width || computerStickX - radiusStickC <= 0) computerXD = -computerXD; 
    if(computerStickY + radiusStickC >= canvas.height / 2 || computerStickY - radiusStickC <= 0 ) computerYD = -computerYD;
    computerStickX += computerXD;
    computerStickY += computerYD;
}

function stopGame(who) {
    playerScore = 0;
    computerScore = 0;
    playerStickX = canvas.width / 2;
    playerStickY = canvas.height - 50;
    computerStickX = canvas.width / 2;
    computerStickY = 50;
    puckX = canvas.width / 2;
    puckY = canvas.height / 2;
    result.innerHTML = who + ' has won!';
}

function drawGame() {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    moveComputerStick();
    movePuck();
    drawBoard();
    drawPlayerStick();
    drawComputerStick();
    drawPuck();

    let temp = Math.sqrt( (playerStickX - puckX) * (playerStickX - puckX) + (playerStickY - puckY) * (playerStickY - puckY) );
    let temp2 = Math.sqrt( (computerStickX - puckX) * (computerStickX - puckX) + (computerStickY - puckY) * (computerStickY - puckY) );
    if (puckRadius + radiusStick >= temp || puckRadius + radiusStickC >= temp2) {
        if( playerStickX < puckX || playerStickX > puckX || computerStickX > puckX || computerStickY < puckX ) puckXD = -puckXD;
        if( playerStickY < puckY || playerStickY > puckY || computerStickY > puckY || computerStickY < puckY ) puckYD = -puckYD;
        /*
        if ( (playerStickX < puckX && playerStickY < puckY) || (computerStickX < puckX && computerStickY < puckY) ) { 
            if(puckX + puckRadius < canvas.width) puckXD = -puckXD;//puckX += puckSpeed; 
            if(puckY + puckRadius < canvas.height) puckYD = -puckYD;//puckY += puckSpeed;
        }
        else if ( (playerStickX < puckX && playerStickY > puckY) || (computerStickX < puckX && computerStickY > puckY) ) { 
            if(puckX + puckRadius < canvas.width) puckXD = -puckXD;//puckX += puckSpeed;
            if(puckY - puckRadius > 0) puckYD = -puckYD;//puckY -= puckSpeed; 
        }
        else if ( (playerStickX > puckX && playerStickY < puckY) || (computerStickX > puckX && computerStickY < puckY) ) { 
            if(puckX - puckRadius > 0) puckXD = -puckXD;//puckX -= puckSpeed;
            if(puckY + puckRadius < canvas.height) puckYD = -puckYD;//puckY += puckSpeed; 
        }
        else if ( (playerStickX > puckX && playerStickY > puckY) || (computerStickX > puckX && computerStickY > puckY) ) { 
            if(puckX - puckRadius > 0) puckXD = -puckXD;//puckX -= puckSpeed;
            if(puckY - puckRadius > 0) puckYD = -puckYD;//puckY -= puckSpeed; 
        } */
    }

    //if( )

    playScore.innerHTML = playerScore;
    compScore.innerHTML = computerScore;
    if(playerScore === 9) stopGame('Player');
    if(computerScore === 9) stopGame('Computer');
    requestAnimationFrame(drawGame);
}

// new code

function showCoordinates(event) {
    let x = event.touches[0].clientX;
    let y = event.touches[0].clientY;

    if (x > radiusStick && x < canvas.width - radiusStick && y > canvas.height / 2 + radiusStick && y < canvas.height - radiusStick) {
        playerStickX = x;
        playerStickY = y;
    }
}  

drawGame();
