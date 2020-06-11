var ball = document.getElementById('ball');
var rod1 = document.getElementById('rod1');
var rod2 = document.getElementById('rod2');


//variables
const rod1Name = "Rod 1";
const rod2Name = "Rod 2";

var score = 0;
var gameOn = false;
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
var movement;
var ballSpeedX = 2;
var ballSpeedY = 2;

window.addEventListener('resize',function(){
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
});

(function(){
alert("press enter to play");
alert("rod1 controls key A and D rod2 controls key J and L");
resetBoard();
})();

function resetBoard(){
    rod1.style.left = (windowWidth - rod1.offsetWidth)/2 + "px";
    rod2.style.left = rod1.style.left;
    ball.style.left = (windowWidth - ball.offsetWidth)/2 + "px";

    ball.style.top = (rod1.offsetTop + rod1.offsetHeight) + "px";

    score = 0;
    gameOn = false;
}

function storeWin(winner,points){
    clearInterval(movement);
    resetBoard();
    alert(winner + " wins with a score of " + points);
}


//keypress

window.addEventListener('keypress',function(event){
    let rodSpeed = 20;
    let rodPlace = rod1.getBoundingClientRect();
    let rod2Place = rod2.getBoundingClientRect();
    if(event.code==="KeyD" && ((rodPlace.x + rodPlace.width)< windowWidth)){
        rod1.style.left = (rodPlace.x) + rodSpeed + "px";
    }
    else if(event.code==="KeyA" && ((rodPlace.x)>0)){
        rod1.style.left = (rodPlace.x)-rodSpeed + "px";
    }
    else if(event.code==="KeyL" && ((rod2Place.x + rod2Place.width)< windowWidth)){
        rod2.style.left = (rod2Place.x) + rodSpeed + "px";
    }
    else if(event.code==="KeyJ" && ((rod2Place.x)>0)){
        rod2.style.left = (rod2Place.x)-rodSpeed + "px";
    }

    if(event.code==="Enter"){
        if(!gameOn){
            gameOn = true;

            let ballPlace = ball.getBoundingClientRect();
            let ballX = ballPlace.x;
            let ballY = ballPlace.y;
            let ballWidth = ballPlace.width;

            let rod1Width = rod1.offsetWidth;
            let rod2Width = rod2.offsetWidth;
            let rod1Height = rod1.offsetHeight;
            let rod2Height = rod2.offsetHeight;

            movement = setInterval(function(){
                ballX += ballSpeedX;
                ballY += ballSpeedY;

                 let rod1X = rod1.getBoundingClientRect().x;
                 let rod2X = rod2.getBoundingClientRect().x;

                ball.style.left = ballX + "px";
                ball.style.top =  ballY + "px";
                
                let ballPos = ballX + ballWidth / 2;

                    if(((ballX + ballWidth) > windowWidth) || ballX < 0) {
                        ballSpeedX = -ballSpeedX;
                    }

                    if(ballY <= rod1Height){
                        ballSpeedY = -ballSpeedY;
                        score++;

                        if((ballPos < rod1X) || (ballPos > (rod1X + rod1Width))){
                            storeWin(rod2Name,score);
                        }
                    }

                    else if((ballY + ballWidth) >= (windowHeight - rod2Height)){
                        ballSpeedY = -ballSpeedY;
                        score++;

                        if((ballPos < rod2X) || (ballPos > (rod2X + rod2Width))){
                            storeWin(rod1Name,score);
                        }
                    }
            },10);
        }
    }
});