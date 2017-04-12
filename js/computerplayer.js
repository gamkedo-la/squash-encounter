var computerStepsPerAnimFrame = 2;
var computerFrameTimer = 2;
var computerFrame = 0;

var initComputerStepsPerAnimFrame = 5;//for players entry only
var initComputerFrameTimer = 5;//how quick it changes between frames; for players entry only
var COMPUTER_MOVE_SPEED = 2;


function ComputerClass() {

    this.Init = function () {
        this.Reset();
        //this.initDrawPlayer();
    }

    this.Reset = function () {
        this.prevX = 0;
        this.prevY = 0;
        this.x = COURT_W * 0.84;
        this.y = initYPosition;
        this.isSwinging = false;//used so player does not run if gif showing it's swinging the racket
        this.swingTurn = (ServeClass.servingPlayer === ServeClass.RED ? false : true);
        this.speedX = COMPUTER_MOVE_SPEED;
        this.speedY = COMPUTER_MOVE_SPEED;
        this.isHit = false;
    }

    this.initDrawPlayer = function () {
        this.whichPic = p2_start;
        var drawLocation = perspectiveLocation(this.x, this.y, 0);
        var computerAnimationFrames = this.whichPic.width / PLAYER_W;
        //console.log(computerFrameTimer)

        if (initComputerFrameTimer-- < 0) {
            initComputerFrameTimer = initComputerStepsPerAnimFrame;
            computerFrame++;
        }
        if (computerFrame >= computerAnimationFrames) {
            computerFrame = 0;
            playerEntry = false;
            this.whichPic = p2_standing;
            this.isSwinging = false;
        }
        drawAtBaseSheetSprite(this.whichPic, computerFrame, drawLocation.x, drawLocation.y, PLAYER_W, PLAYER_H);
    }

    this.drawPlayer = function () {
        var drawLocation = perspectiveLocation(this.x, this.y, 0);
        var computerAnimationFrames = this.whichPic.width / PLAYER_W;

        if (computerFrameTimer-- < 0) {
            computerFrameTimer = computerStepsPerAnimFrame;
            computerFrame++;
        }
        if (computerFrame >= computerAnimationFrames) {
            computerFrame = 0;
            
            this.isHit = false;
            this.whichPic = p2_standing;
            this.isSwinging = false;
            computerFrameTimer = 2
            computerStepsPerAnimFrame = 2
        }
        drawAtBaseSheetSprite(this.whichPic, computerFrame, drawLocation.x, drawLocation.y, PLAYER_W, PLAYER_H);
    }
    
    this.movePlayer = function () {
        var nextX = this.x;
        var nextY = this.y;
        var computerSpeed;
        var distPlayerToTX;
        var distPlayerToTY;

        this.hitGraphicSelection();
        if(this.isHit){
          return;
        }

        //run to T
        //console.log(this.swingTurn)
        if (this.swingTurn == false) {
            this.runToT();
            } else if(BallClass.bouncedOnFrontWall){
                //calculate where ball will touch ground
                var ballMotionAngle=Math.atan2(BallClass.speedY,BallClass.speedX);//radians 
                degrees=ballMotionAngle*180/Math.PI;
                ballSpeedUnitVector = magnitude(BallClass.speedX,BallClass.speedY);
                ballSpeedX=Math.cos(atanResult)*ballSpeedUnitVector;  
                ballSpeedY=Math.sin(atanResult)*ballSpeedUnitVector;
                touchGroundX=BallClass.x+ballSpeedX*BallClass.numFramesTouchGround;
                touchGroundY=BallClass.y+ballSpeedY*BallClass.numFramesTouchGround;
                //console.log(touchGroundX,COURT_W,touchGroundY,COURT_L)

                //move computer player to expected ball-touch ground point
                distPlayerToTX=touchGroundX-this.x;
                distPlayerToTY=touchGroundY-this.y;
                atanResult=Math.atan2(distPlayerToTY,distPlayerToTX);//radians
                degrees=ballMotionAngle*180/Math.PI;    
                //console.log(atanResult,degrees)
                //console.log(BallClass.speedX,BallClass.speedY)
                computerPlayerSpeed = magnitude(COMPUTER_MOVE_SPEED,COMPUTER_MOVE_SPEED);
                
                this.speedX=Math.cos(atanResult)*computerPlayerSpeed;
                this.speedY=Math.sin(atanResult)*computerPlayerSpeed;

                //console.log("where should go:",this.speedX)
                } 
                
        nextX += this.speedX;
        nextY += this.speedY;
        //console.log("where it goes:",this.speedX)
        
        this.x = nextX;
        this.y = nextY;
    }
    this.runToT = function () {
    ballMotionAngle=Math.atan2(BallClass.speedY,BallClass.speedX);//radians    
    degrees=ballMotionAngle*180/Math.PI;    

    distPlayerToTX=T_ONCOURT_W-this.x;
    distPlayerToTY=T_ONCOURT_L-this.y;
    
    atanResult=Math.atan2(distPlayerToTY,distPlayerToTX);//radians
    computerSpeed = magnitude(this.speedX,this.speedY);
    if(Math.abs(distPlayerToTX)<=COMPUTER_MOVE_SPEED){
        this.speedX=0;
        } else {
          this.speedX=Math.cos(atanResult)*computerSpeed;  
            }
    if(Math.abs(distPlayerToTY)<=COMPUTER_MOVE_SPEED){
      this.speedY=0;
        } else {
            this.speedY=Math.sin(atanResult)*computerSpeed;
            }
    }

    this.hitGraphicSelection = function () {
        var hereCollision = ballAtReach(this.x, this.y, BallClass.x, BallClass.y);
        var quadrantHit = hereCollision.quadrant;
        var player1IsAtReach = playerAtReach(this.x, this.y, PlayerClass.x, PlayerClass.y);
        var player1IsAtReachNow = player1IsAtReach.oppAtReach;

        //check ball only bounced once or none on floor before swing
        if (BallClass.bouncedOnFloor == 1 || BallClass.bouncedOnFloor == 0) {
            ballBouncedOnFloor = true;
        } else {
            ballBouncedOnFloor = false;
        }

        if (ballBouncedOnFloor && BallClass.bouncedOnFrontWall && quadrantHit != 0 && this.swingTurn && BallClass.tinHit == false && BallClass.ballHitFloorBeforeWall == false) {
            switch (quadrantHit) {
                case TOPRIGHTQUADRANT:
                    this.isSwinging = true;
                    Sound.hit();
                    if (player1IsAtReachNow) {
                        if (this.x > PlayerClass.x) {
                            PlayerClass.whichPic = p1_left_hit;
                        } else {
                            PlayerClass.whichPic = p1_right_hit;
                        }
                        playerFrameTimer = 10
                        playerStepsPerAnimFrame = 10
                    }
                    this.whichPic = p2_shot_top_right;
                    break;
                case TOPLEFTQUADRANT:
                    this.isSwinging = true;
                    Sound.hit();
                    if (player1IsAtReachNow) {
                        if (this.x > PlayerClass.x) {
                            PlayerClass.whichPic = p1_left_hit;
                        } else {
                            PlayerClass.whichPic = p1_right_hit;
                        }
                        playerHit = true;
                        playerFrameTimer = 10
                        playerStepsPerAnimFrame = 10
                    }
                    this.whichPic = p2_shot_top_left;
                    break;
                case BOTTOMRIGHTQUADRANT:
                    this.isSwinging = true;
                    Sound.hit();
                    if (player1IsAtReachNow) {
                        if (this.x > PlayerClass.x) {
                            PlayerClass.whichPic = p1_left_hit;
                        } else {
                            PlayerClass.whichPic = p1_right_hit;
                        }
                        playerHit = true;
                        playerFrameTimer = 10
                        playerStepsPerAnimFrame = 10
                    }
                    this.whichPic = p2_shot_bottom_right;
                    break;
                case BOTTOMLEFTQUADRANT:
                    this.isSwinging = true;
                    Sound.hit();
                    if (player1IsAtReachNow) {
                        if (this.x > PlayerClass.x) {
                            PlayerClass.whichPic = p1_left_hit;
                        } else {
                            PlayerClass.whichPic = p1_right_hit;
                        }
                        playerHit = true;
                        playerFrameTimer = 10
                        playerStepsPerAnimFrame = 10
                    }
                    this.whichPic = p2_shot_bottom_left;
                    break;
            }
        }
        /*if(this.isSwinging==false){
        if(this.keyHeld_Gas){
                    nextY -= PLAYER_MOVE_SPEED * this.sprintMultiplier;
                    this.whichPic = p1_running;
        }
        if(this.keyHeld_Reverse){
                    nextY += PLAYER_MOVE_SPEED * this.sprintMultiplier;
                    this.whichPic = p1_running;
        }
        if(this.keyHeld_TurnLeft){
                    nextX -= PLAYER_MOVE_SPEED * this.sprintMultiplier;
                    this.whichPic = p1_running;
        }
        if(this.keyHeld_TurnRight){
                    nextX+= PLAYER_MOVE_SPEED * this.sprintMultiplier;
                    this.whichPic = p1_running;
        }*/
    }
}

