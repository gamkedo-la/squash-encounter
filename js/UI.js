/*
function drawUI(){
    colorText("stamina: " +  PlayerClass.sprintStamina, canvas.width-200, 50, 'red');
    console.log(PlayerClass.sprintStamina);
}
*/

const BUTTON_W=51;
const BUTTON_H=51;
var menuMuteButtonX=715;
var menuMuteButtonY=65;
var gameMuteButtonX=708;
var gameMuteButtonY=90;

var muteButtonX = 708;
var muteButtonY = 90;
var pauseButtonX = 770;
var pauseButtonY = muteButtonY;
var buttonPausePressed=false;
var gamePauseState = 'P';
var timesbuttonPausePressed=0;

//board message for rules
var message=0;
var MESSAGEBOARD=0;
var FLOORBOUNCE=1;
var TINHIT=2;
var OUTLINES=3;
var FLOORBOUNCEBEFOREWALL=24;
var BLUESERVES=4;
var REDSERVES=5;
var PRESSSPACE=6;
var MENUUPDOWNSELECTKEYS=25;
var DRAWSERVE=7;
var BLUEWINS=8;
var REDWINS=9;
var NOTHINGHAPPENS1=10;
var NOTHINGHAPPENS2=11;
var NOTHINGHAPPENS3=12;
var NOTHINGHAPPENS4=13;
var NOTHINGHAPPENS5=14;
var NOTHINGHAPPENS6=15;
var NOTHINGHAPPENS7=16;
var NOTHINGHAPPENS8=17;
var NOTHINGHAPPENS9=18;
var NOTHINGHAPPENS10=19;
var NOTHINGHAPPENS11=20;
var NOTHINGHAPPENS12=21;
var NOTHINGHAPPENS13=22;
var NOTHINGHAPPENS14=23;
var NOTHINGHAPPENS15=26;
var messageTip=NOTHINGHAPPENS1;

var spinFrame = 0,
    spinStepsPerAnimFrame = 2,
    spinFrameTimer = 2,
    numFullSpins = 2,
    spinAnimationFrames = null,
    endAnimation = false,
    moreFrames = false,
    drawNow = false,
    uiTimer;
var spinDrawLocation;
const SERVE_W = 330,
        SERVE_H = 365;
var rightToServeOutcomeReady=false;

//todo
var gamePlayFrame = 0;
var gamePlayStepsPerAnimFrame = 20;
var gamePlayFrameTimer = gamePlayStepsPerAnimFrame;


function muteToggleCheck(x, y){
  if(x > muteButtonX-BUTTON_W/2 && //if right of left side
    x < muteButtonX + BUTTON_W/2 && //if left of right side
    y > muteButtonY - BUTTON_H/2 && //if below top
    y < muteButtonY + BUTTON_H/2 ){ //if above bottom
    isMuted = !isMuted;
    Howler.mute(isMuted);
  }
}

function drawMuteState (){
  var muteState = 'U';
  if(menuActive){
    muteButtonX=menuMuteButtonX;
    muteButtonY=menuMuteButtonY;
  } else {
    muteButtonX=gameMuteButtonX;
    muteButtonY=gameMuteButtonY;
  }

  if(isMuted){
    drawAtBaseSheetSprite(soundOffButton, gamePlayFrame, muteButtonX, muteButtonY, BUTTON_W, BUTTON_H);
    muteState = 'M';
  } else{
    drawAtBaseSheetSprite(soundOnButton, gamePlayFrame, muteButtonX, muteButtonY, BUTTON_W, BUTTON_H);
    muteState = 'U';
  }
  //colorText(muteState, muteButtonX, muteButtonY, 'white');
}

function gamePauseToggleCheck(x, y){
  if(potentialEsc==false){
    if(x > pauseButtonX-BUTTON_W/2 && //if right of left side
        x < pauseButtonX + BUTTON_W/2 && //if left of right side
        y > pauseButtonY-BUTTON_H/2 && //if below top
        y < pauseButtonY + BUTTON_H/2 ){ //if above bottom
        Sound.stop("crowd-cheer", false, 0.1);
        cheerOn=false;
        gameIsPaused = !gameIsPaused;
        buttonPausePressed=true;
        timesbuttonPausePressed+=1;
        if(timesbuttonPausePressed==2){
            buttonPausePressed=false;
            timesbuttonPausePressed=0;
        }
    }
  }
}

function drawGamePauseState (){
  var gamePlayAnimationFrames = gamePlayButton.width / BUTTON_W;
  if(gameIsPaused){
    drawAtBaseSheetSprite(gamePauseButton, gamePlayFrame, pauseButtonX, pauseButtonY, BUTTON_W, BUTTON_H);
    gamePauseState = '||';
    } else{
        drawAtBaseSheetSprite(gamePlayButton, gamePlayFrame, pauseButtonX, pauseButtonY, BUTTON_W, BUTTON_H);
        gamePauseState = 'P';    
    }
  //colorText(gamePauseState, pauseButtonX, pauseButtonY, 'red');
  

            /*if (gamePlayFrameTimer-- < 0) {
                gamePlayFrameTimer = gamePlayStepsPerAnimFrame;
                gamePlayFrame++;
            }
            if (gamePlayFrame >= gamePlayAnimationFrames) {
                gamePlayFrame = 0;
            }*/
            //drawAtBaseSheetSprite(gamePauseButton, gamePlayFrame, pauseButtonX, pauseButtonY, BUTTON_W, BUTTON_H);
        
}

function drawStaminaBar() {
    //draw bar border
    colorRect(740, canvas.height - 555, 104, 24, 'White');
    //draw bar background
    colorRect(740, canvas.height - 555, 100, 20, 'LightGray');
    //draw current stamina
    //OLD colorRect(633, canvas.height - 560, PlayerClass.sprintStamina * 5, 20, 'red');
    //colorText("stamina: " +  PlayerClass.sprintStamina, canvas.width-200, 50, 'red');
    colorRectStamina(740-104/2+2, canvas.height - 555-10, PlayerClass.sprintStamina * 5, 20, 'red',Math.PI);
    //draw label
    canvasContext.fillStyle = "white";
    canvasContext.textAlign = "center";
    canvasContext.font = "bold 18px Cherry Cream Soda";
    canvasContext.fillText("Stamina", 728, canvas.height - 573);
}

function calculateRightToServe() {
    spinDrawLocation = perspectiveLocation(COURT_W / 2, COURT_L * 0.2, 0),
        titleText = null;

    drawMessageBoard();
    message=7;
    //console.log(numFullSpins)
    if (numFullSpins > 0) {
        spinAnimationFrames = serve_spin.width / SERVE_W;
    } else if (!moreFrames) {
        if (Math.random() >= 0.5) {
            spinAnimationFrames = 0;
            drawNow = true;
        } else {
            spinAnimationFrames = 5;
            moreFrames = true;
        }
    }

    if (spinFrameTimer-- < 0 && drawNow == false) {
        spinFrameTimer = spinStepsPerAnimFrame;
        spinFrame++;

        if (moreFrames && spinFrame == 5) {
            moreFrames = false;
            drawNow = true;
        }
    }
    if (!drawNow) {
        if (spinFrame >= spinAnimationFrames) {
            spinFrame = 0;
            numFullSpins--;
        }
        /*titleText = "";
        canvasContext.fillStyle = "grey";
        canvasContext.textAlign = "center";
        canvasContext.font = "bold 15px Cherry Cream Soda";
        canvasContext.fillText((titleText), canvas.width / 2, 490);*/
    }
    else {
        if (!endAnimation) {
            spinFrame = spinAnimationFrames;
            endAnimation = true;
        }
        rightToServeOutcomeReady=true;
    }
    drawRightToServe();
    //console.log(serve_spin, spinFrame, drawLocation.x, drawLocation.y, SERVE_W, SERVE_H)
}

function drawRightToServe(){
    if (!ServeHandler.bluePicks) drawAtBaseSheetSprite(serve_spin, spinFrame, spinDrawLocation.x, spinDrawLocation.y, SERVE_W, SERVE_H);   
}

function rightToServeOutcome() {
    var drawLocationPlayer1 = (ServeHandler.flipPos > 0 ? perspectiveLocation(COURT_W * 0.3, COURT_L * 0.65, 0) : perspectiveLocation(COURT_W * 0.8, COURT_L * 0.65, 0));
    var drawLocationPlayer2 = perspectiveLocation(COURT_W * 0.8, COURT_L * 0.65, 0);
    var subText = "Press Space to Continue";
    var chooseLeft = "",
        chooseRight = "",
        setChoice = "",
        titleText = null;

        //console.log(serveBet)
    if (ServeHandler.bluePicks) {
        window.clearTimeout(timer);
        drawAtBaseSheetSprite(p1_standing, 0, drawLocationPlayer1.x, drawLocationPlayer1.y, PLAYER_W, PLAYER_H);
        titleText = "Choose Your Starting Side:";
        subText = "";
        canvasContext.fillStyle = "blue";
        chooseLeft = "A for Left";
        chooseRight = "D for Right"
        setChoice = "Press Space to Continue"
        ServeHandler.WhoServes();
    }
    else if (spinFrame == 5) {
        
        drawAtBaseSheetSprite(p1_standing, 0, drawLocationPlayer1.x, drawLocationPlayer1.y, PLAYER_W, PLAYER_H);
        titleText = "Blue Player Has Right To Serve !";
        canvasContext.fillStyle = "blue";
        ServeHandler.servingPlayer = ServeHandler.BLUE;
        ServeHandler.nextServingPlayer = ServeHandler.BLUE;
        BallClass.x = ServeHandler.LEFT_SQUASHBALL;
        ComputerClass.swingTurn = true;
        PlayerClass.swingTurn = false;
        subText = "";
        timer = window.setTimeout(function () { ServeHandler.bluePicks = true; }, 1200);
    } else {
        drawAtBaseSheetSprite(p2_standing, 0, drawLocationPlayer2.x, drawLocationPlayer2.y, PLAYER_W, PLAYER_H);
        titleText = "Red Player Has Right To Serve !";
        canvasContext.fillStyle = "red";
        ServeHandler.servingPlayer = ServeHandler.RED;
        ComputerClass.swingTurn = false;
        PlayerClass.swingTurn = true;
    }

    canvasContext.font = "bold 20px Cherry Cream Soda";
    canvasContext.fillText((titleText), canvas.width / 2, 485);

    canvasContext.fillStyle = "black";
    canvasContext.textAlign = "center";
    //canvasContext.fillText(setChoice, canvas.width / 2, canvas.height / 2);
    //message player
    message=PRESSSPACE;
    drawMessageBoard();

    canvasContext.font = "bold 15px Cherry Cream Soda";
    //canvasContext.fillText((subText), canvas.width / 2, 515);
    canvasContext.fillStyle = "blue";
    canvasContext.fillText(chooseLeft, canvas.width * 2 / 5, 515);
    canvasContext.fillText(chooseRight, canvas.width * 3 / 5, 515);
}

function drawMessageBoard(){
    var messageBoardW=412;
    var messageBoardH=54;
    drawAtBaseSheetSprite(messageboard, 0, canvas.width/2, canvas.height-35, messageBoardW, messageBoardH);
    switch (message) {
                case BLUESERVES:
                    canvasContext.fillStyle = "white";
                    canvasContext.textAlign = "center";
                    canvasContext.font = "18px Cherry Cream Soda";
                    canvasContext.fillText("Blue Serves, press Enter.", canvas.width/2, canvas.height-30 );
                    break;
                case REDSERVES:
                    canvasContext.fillStyle = "white";
                    canvasContext.textAlign = "center";
                    canvasContext.font = "18px Cherry Cream Soda";
                    canvasContext.fillText("Red Serves, press Enter.", canvas.width/2, canvas.height-30 );
                    break;
                case FLOORBOUNCE:
                    canvasContext.fillStyle = "white";
                    canvasContext.textAlign = "center";
                    canvasContext.font = "18px Cherry Cream Soda";
                    canvasContext.fillText("Excess Ball Bounce On Floor!Push Enter", canvas.width/2, canvas.height-30 );
                    break;
                case FLOORBOUNCEBEFOREWALL:
                    canvasContext.fillStyle = "white";
                    canvasContext.textAlign = "center";
                    canvasContext.font = "18px Cherry Cream Soda";
                    canvasContext.fillText("Floor bounce before the wall!Push Enter", canvas.width/2, canvas.height-30 );
                    break;
                case TINHIT:
                    canvasContext.fillStyle = "white";
                    canvasContext.textAlign = "center";
                    canvasContext.font = "18px Cherry Cream Soda";
                    canvasContext.fillText("Down ! Ball Hit The Tin.Push Enter", canvas.width/2, canvas.height-30 );
                    break;
                case OUTLINES:
                    canvasContext.fillStyle = "white";
                    canvasContext.textAlign = "center";
                    canvasContext.font = "18px Cherry Cream Soda";
                    canvasContext.fillText("Out ! Ball Over Outside Lines.Push Enter", canvas.width/2, canvas.height-30 );
                    break;
                case MESSAGEBOARD:
                    canvasContext.fillStyle = "white";
                    canvasContext.textAlign = "center";
                    canvasContext.font = "18px Cherry Cream Soda";
                    canvasContext.fillText("Welcome to Squash Encounter !", canvas.width/2, canvas.height-30 );
                    break;
                case PRESSSPACE:
                    canvasContext.fillStyle = "white";
                    canvasContext.textAlign = "center";
                    canvasContext.font = "18px Cherry Cream Soda";
                    canvasContext.fillText("Press Space To Continue", canvas.width/2, canvas.height-30 );
                    break;
                case DRAWSERVE:
                    canvasContext.fillStyle = "white";
                    canvasContext.textAlign = "center";
                    canvasContext.font = "18px Cherry Cream Soda";
                    canvasContext.fillText("Drawing Right To Serve, please hold", canvas.width/2, canvas.height-30 );
                    break;
                case BLUEWINS:
                    canvasContext.fillStyle = "white";
                    canvasContext.textAlign = "center";
                    canvasContext.font = "18px Cherry Cream Soda";
                    canvasContext.fillText("Blue Player Wins !", canvas.width/2, canvas.height-30 );
                    break;                    
                case REDWINS:
                    canvasContext.fillStyle = "white";
                    canvasContext.textAlign = "center";
                    canvasContext.font = "18px Cherry Cream Soda";
                    canvasContext.fillText("Red Player Wins !", canvas.width/2, canvas.height-30 );
                    break;
                case NOTHINGHAPPENS1:
                    canvasContext.fillStyle = "white";
                    canvasContext.textAlign = "center";
                    canvasContext.font = "18px Gloria Hallelujah";
                    canvasContext.fillText("Constantly hydrate during your game !", canvas.width/2, canvas.height-30 );
                    break;
                case NOTHINGHAPPENS2:
                    canvasContext.fillStyle = "white";
                    canvasContext.textAlign = "center";
                    canvasContext.font = "18px Gloria Hallelujah";
                    canvasContext.fillText("Stretch before your game !", canvas.width/2, canvas.height-30 );
                    break;
                case NOTHINGHAPPENS3:
                    canvasContext.fillStyle = "white";
                    canvasContext.textAlign = "center";
                    canvasContext.font = "18px Gloria Hallelujah";
                    canvasContext.fillText("Stay fit to play Squash !", canvas.width/2, canvas.height-30 );
                    break;
                case NOTHINGHAPPENS4:
                    canvasContext.fillStyle = "white";
                    canvasContext.textAlign = "center";
                    canvasContext.font = "18px Gloria Hallelujah";
                    canvasContext.fillText("Don't play Squash to stay fit !", canvas.width/2, canvas.height-30 );
                    break;
                case NOTHINGHAPPENS5:
                    canvasContext.fillStyle = "white";
                    canvasContext.textAlign = "center";
                    canvasContext.font = "18px Gloria Hallelujah";
                    canvasContext.fillText("Stretch your goals !", canvas.width/2, canvas.height-30 );
                    break;
                case NOTHINGHAPPENS6:
                    canvasContext.fillStyle = "white";
                    canvasContext.textAlign = "center";
                    canvasContext.font = "18px Gloria Hallelujah";
                    canvasContext.fillText("Don't appeal Lets you don't believe !", canvas.width/2, canvas.height-30 );
                    break;
                case NOTHINGHAPPENS7:
                    canvasContext.fillStyle = "white";
                    canvasContext.textAlign = "center";
                    canvasContext.font = "18px Gloria Hallelujah";
                    canvasContext.fillText("Insist on precise tight drives !", canvas.width/2, canvas.height-30 );
                    break;
                case NOTHINGHAPPENS8:
                    canvasContext.fillStyle = "white";
                    canvasContext.textAlign = "center";
                    canvasContext.font = "18px Gloria Hallelujah";
                    canvasContext.fillText("Don't hit yourself !", canvas.width/2, canvas.height-30 );
                    break;
                case NOTHINGHAPPENS9:
                    canvasContext.fillStyle = "white";
                    canvasContext.textAlign = "center";
                    canvasContext.font = "18px Gloria Hallelujah";
                    canvasContext.fillText("Go for Gold and control the T !", canvas.width/2, canvas.height-30 );
                    break;
                case NOTHINGHAPPENS10:
                    canvasContext.fillStyle = "white";
                    canvasContext.textAlign = "center";
                    canvasContext.font = "18px Gloria Hallelujah";
                    canvasContext.fillText("Get that drive into the nick !", canvas.width/2, canvas.height-30 );
                    break;
                case NOTHINGHAPPENS11:
                    canvasContext.fillStyle = "white";
                    canvasContext.textAlign = "center";
                    canvasContext.font = "18px Gloria Hallelujah";
                    canvasContext.fillText("Target wall quadrants to gain game control !", canvas.width/2, canvas.height-30 );
                    break;
                case NOTHINGHAPPENS12:
                    canvasContext.fillStyle = "white";
                    canvasContext.textAlign = "center";
                    canvasContext.font = "18px Gloria Hallelujah";
                    canvasContext.fillText("Pace yourself in a Rally !", canvas.width/2, canvas.height-30 );
                    break;
                case NOTHINGHAPPENS13:
                    canvasContext.fillStyle = "white";
                    canvasContext.textAlign = "center";
                    canvasContext.font = "18px Gloria Hallelujah";
                    canvasContext.fillText("Eat carbs the night before your game !", canvas.width/2, canvas.height-30 );
                    break;
                case NOTHINGHAPPENS14:
                    canvasContext.fillStyle = "white";
                    canvasContext.textAlign = "center";
                    canvasContext.font = "18px Gloria Hallelujah";
                    canvasContext.fillText("Eat fruit on the day !", canvas.width/2, canvas.height-30 );
                    break;
                case NOTHINGHAPPENS15:
                    canvasContext.fillStyle = "white";
                    canvasContext.textAlign = "center";
                    canvasContext.font = "18px Gloria Hallelujah";
                    canvasContext.fillText("Target your wall shots !", canvas.width/2, canvas.height-30 );
                    break;
                case MENUUPDOWNSELECTKEYS:
                    canvasContext.fillStyle = "white";
                    canvasContext.textAlign = "center";
                    canvasContext.font = "18px Cherry Cream Soda";
                    canvasContext.fillText("Up (W), Down (S), Confirm (Space Bar)", canvas.width/2, canvas.height-30 );
                    break;
                    
                }
}
