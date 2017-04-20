/*
function drawUI(){
	colorText("stamina: " +  PlayerClass.sprintStamina, canvas.width-200, 50, 'red');
	console.log(PlayerClass.sprintStamina);
}
*/
var spinFrame = 0,
    spinStepsPerAnimFrame = 2,
    spinFrameTimer = 2,
    numFullSpins = 2,
    spinAnimationFrames = null,
    endAnimation = false,
    moreFrames = false,
    drawNow = false,
    uiTimer;

function drawStaminaBar() {
    //draw bar background
    colorRect(633, canvas.height - 560, 100, 20, 'LightGray');
    //draw current stamina
    colorRect(633, canvas.height - 560, PlayerClass.sprintStamina * 5, 20, 'red');
    //draw label
    colorText('STAMINA', 700, canvas.height - 570, 'white');
}

function rightToServe() {
    const SERVE_W = 330,
        SERVE_H = 365;
    var drawLocation = perspectiveLocation(COURT_W / 2, COURT_L * 0.2, 0),
        titleText = null;

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
        titleText = "Drawing Right To Serve, please hold";
        canvasContext.fillStyle = "grey";
        canvasContext.textAlign = "center";
        canvasContext.font = "bold 15px verdana";
        canvasContext.fillText((titleText), canvas.width / 2, 490);
    }
    else {
        if (!endAnimation) {
            spinFrame = spinAnimationFrames;
            endAnimation = true;
        }
        rightToServeOutcome();
    }
    if (!ServeHandler.bluePicks) drawAtBaseSheetSprite(serve_spin, spinFrame, drawLocation.x, drawLocation.y, SERVE_W, SERVE_H);
}

function rightToServeOutcome() {
    var drawLocationPlayer = (ServeHandler.flipPos > 0 ? perspectiveLocation(COURT_W * 0.3, COURT_L * 0.65, 0) : perspectiveLocation(COURT_W * 0.8, COURT_L * 0.65, 0)),
        subText = "Press Enter to Continue",
        chooseLeft = "",
        chooseRight = "",
        setChoice = "",
        titleText = null;

    if (ServeHandler.bluePicks) {
        window.clearTimeout(timer);
        drawAtBaseSheetSprite(p1_standing, 0, drawLocationPlayer.x, drawLocationPlayer.y, PLAYER_W, PLAYER_H);
        titleText = "Choose Your Starting Side:";
        subText = "";
        chooseLeft = "A for Left";
        chooseRight = "D for Right"
        setChoice = "Press Enter to Continue"
        canvasContext.fillStyle = "blue";
        ServeHandler.WhoServes();
    }
    else if (spinFrame == 5) {
        drawAtBaseSheetSprite(p1_standing, 0, drawLocationPlayer.x, drawLocationPlayer.y, PLAYER_W, PLAYER_H);
        titleText = "Blue Player Has Right To Serve !";
        canvasContext.fillStyle = "blue";
        ServeHandler.servingPlayer = ServeHandler.BLUE;
        ComputerClass.swingTurn = true;
        PlayerClass.swingTurn = false;
        subText = "";
        timer = window.setTimeout(function () { ServeHandler.bluePicks = true; }, 1200);
    } else {
        titleText = "Red Player Has Right To Serve !";
        canvasContext.fillStyle = "red";
        ServeHandler.servingPlayer = ServeHandler.RED;
        ComputerClass.swingTurn = false;
        PlayerClass.swingTurn = true;
    }

    canvasContext.font = "bold 20px verdana";
    canvasContext.fillText((titleText), canvas.width / 2, 485);

    canvasContext.fillStyle = "black";
    canvasContext.textAlign = "center";
    canvasContext.fillText(setChoice, canvas.width / 2, canvas.height / 2);

    canvasContext.font = "bold 15px verdana";
    canvasContext.fillText((subText), canvas.width / 2, 515);
    canvasContext.fillText(chooseLeft, canvas.width * 2 / 5, 515);
    canvasContext.fillText(chooseRight, canvas.width * 3 / 5, 515);
}