//player swing-quadrants
const NOQUADRANTHIT = 0;
const TOPRIGHTQUADRANT=1;
const BOTTOMRIGHTQUADRANT=2;
const BOTTOMLEFTQUADRANT=3;
const TOPLEFTQUADRANT=4;

//ballAtReach and playerHitWindowCoords functions constants to determine
//the quadrant where the player swings.
const WINDOWXSCALE=0.02;//For Hit Window range: every real life 20% move across the Y axis, the X hit span visually decreases by 4%
const SHIFTTOCENTERX = -3;
const SHIFTTOCENTERY = 3;
const HITSQUAREW=8;
const HITSQUAREH=8;
const SHIFTTORAQUETPOSITIONX=6;
const SHIFTTORAQUETPOSITIONY=-5;

//back wall sizing
const HITSQUAREBOTTOMW=32;
const HITSQUARECENTERW=42;
const HITSQUAREBOTTOMZ=17;
const BACKWALLCENTERZ=20;

//back wall quadrants
const NOBACKWALLSELECTED=0;
const RIGHTBACKWALL=1;
const LEFTBACKWALL=2;

// x,y pixel coordinates on the render of the near 'wall' (opening) corners
var nearTopLeftX=3;
var nearTopLeftY=248;
var nearTopRightX=798;
var nearTopRightY=248;
var nearBottomLeftX=198;
var nearBottomLeftY=535;
var nearBottomRightX=612;
var nearBottomRightY=535;
// x,y pixel coordinates on the render of the far wall corners
var farTopLeftX=272;
var farTopLeftY=0;
var farTopRightX=537;
var farTopRightY=0;
var farBottomLeftX=304;
var farBottomLeftY=200;
var farBottomRightX=505;
var farBottomRightY=200;

//quadrant where player is standing
const RIGHTCOURTQUADRANT=1;
const LEFTCOURTQUADRANT=2;

//front wall quadrants
const NOFRONTWALLSELECTED=0;
const TOPRIGHTFRONTWALL=1;
const BOTTOMRIGHTFRONTWALL=2;
const BOTTOMLEFTFRONTWALL=3;
const TOPLEFTFRONTWALL=4;

//court floor sizing
const WALKTOPSQUAREW=35;
const WALKBOTTOMSQUAREW=35;
const WALKCENTERSQUAREW=35;
const WALKTOPSQUAREY=39;
const WALKBOTTOMSQUAREY=58;

function drawTargetBackWall (nearX,farX,nearY,farY){
      var visualAdjustmentX=40;//adjustment so the selected wall rectangle does not draw into canvas
      const visualAdjustmentY=5;//adjustment so selected wall covers to side wall line
      if(PlayerClass.targetBackWall==LEFTBACKWALL){
        visualAdjustmentX*=-1;
      }
      var targetWallDrawnWidth = farX-nearX-visualAdjustmentX;
      var targetWalltDrawnHeight = farY-nearY+visualAdjustmentY;
      colorRect(nearX,nearY,targetWallDrawnWidth,targetWalltDrawnHeight,"blue");
    }

    //on mouseclick checks whether backwall is selected as target
function selectBackWall (mouseClickX,mouseClickY){
      var centerTopX=COURT_W/2;
      var centerTopY=COURT_L-BACKWALLCENTERZ;

      centerBottomX=centerTopX;
      centerBottomY=centerTopY+HITSQUAREBOTTOMZ;

      rightTopX=centerTopX+HITSQUARECENTERW;
      rightTopY=centerTopY;

      rightBottomX=centerTopX+HITSQUAREBOTTOMW;
      rightBottomY=centerTopY+HITSQUAREBOTTOMZ;

      leftTopX=centerTopX-HITSQUARECENTERW;
      leftTopY=centerTopY;

      leftBottomX=centerTopX-HITSQUAREBOTTOMW;
      leftBottomY=centerTopY+HITSQUAREBOTTOMZ;

      //draw coordinates for backwall
      var drawThisLocation = perspectiveLocation(centerTopX,centerTopY,0);
      colorRect(drawThisLocation.x,drawThisLocation.y,3,3,"blue");
      var visualCenterTopX = drawThisLocation.x
      var visualCenterTopY = drawThisLocation.y

      var drawThisLocation = perspectiveLocation(centerBottomX,centerBottomY,0);
      colorRect(drawThisLocation.x,drawThisLocation.y,3,3,"blue");
      var visualcenterBottomX = drawThisLocation.x;
      var visualcenterBottomY = drawThisLocation.y;

      var drawThisLocation = perspectiveLocation(rightTopX,rightTopY,0);
      colorRect(drawThisLocation.x,drawThisLocation.y,3,3,"blue");
      var visualRightTopX = drawThisLocation.x;
      var visualRightTopY = drawThisLocation.y;

      var drawThisLocation = perspectiveLocation(leftTopX,leftTopY,0);
      colorRect(drawThisLocation.x,drawThisLocation.y,3,3,"blue");
      var visualRightTopX = drawThisLocation.x;
      var visualRightTopY = drawThisLocation.y;

      var drawThisLocation = perspectiveLocation(rightBottomX,rightBottomY,0);
      colorRect(drawThisLocation.x,drawThisLocation.y,3,3,"blue");
      var visualLeftBottomX = drawThisLocation.x;
      var visualLeftBottomY = drawThisLocation.y;

      var drawThisLocation = perspectiveLocation(leftBottomX,leftBottomY,0);
      colorRect(drawThisLocation.x,drawThisLocation.y,3,3,"blue");
      var visualLeftBottomX = drawThisLocation.x;
      var visualLeftBottomY = drawThisLocation.y;

      //mouse selection for back wall
      var centerTopDrawn = perspectiveLocation(centerTopX,centerTopY,0);
      var centerBottomDrawn = perspectiveLocation(centerBottomX,centerBottomY,0);
      var rightTopDrawn =perspectiveLocation(rightTopX,rightTopY,0);
      var rightBottomDrawn = perspectiveLocation(rightBottomX,rightBottomY,0);
      var leftTopDrawn = perspectiveLocation(leftTopX,leftTopY,0);
      var leftBottomDrawn=perspectiveLocation(leftBottomX,leftBottomY,0);

      //determine target wall and its corner coordinates
      if(mouseClickX>=centerTopDrawn.x && mouseClickX<=rightTopDrawn.x && mouseClickY>=centerTopDrawn.y && mouseClickY<=centerBottomDrawn.y){
        PlayerClass.targetBackWall=RIGHTBACKWALL;
          var farX=rightTopDrawn.x;
          var nearX=centerTopDrawn.x;
          var farY=centerBottomDrawn.y;
          var nearY=centerTopDrawn.y;
      }
      if(mouseClickX<centerTopDrawn.x && mouseClickX>=leftTopDrawn.x && mouseClickY>centerTopDrawn.y && mouseClickY<=leftBottomDrawn.y){
        PlayerClass.targetBackWall=LEFTBACKWALL;
          farX= leftTopDrawn.x;
          nearX= centerTopDrawn.x;
          farY=leftBottomDrawn.y;
          nearY=centerTopDrawn.y;
      }
      //call function to draw the target wall
      drawTargetBackWall(nearX,farX,nearY,farY);
  }//end of function to target the back wall

function ballAtReach (playerPixelX, playerPixelY, ballPixelX,ballPixelY){
      if(BallClass.z>PLAYER_MAX_HEIGHT_REACH){
        //console.log(BallClass.z)
        return {
          quadrant:0,
        }
      }
      var quadrantHit;
      var centerX=playerPixelX+SHIFTTOCENTERX;
      var centerY=playerPixelY+SHIFTTOCENTERY;
      var scaleAdjustmentX = (1-playerPixelY/initYPosition)*100*WINDOWXSCALE;

      centerTopX=centerX;
      centerTopY=centerY-HITSQUAREH;

      centerBottomX=centerX;
      centerBottomY=centerY+HITSQUAREH;

      rightCenterX=centerX+HITSQUAREW+scaleAdjustmentX;
      rightCenterY=centerY;

      rightTopX=centerX+HITSQUAREW+scaleAdjustmentX;
      rightTopY=centerY-HITSQUAREH;

      rightBottomX=centerX+HITSQUAREW+scaleAdjustmentX;
      rightBottomY=centerY+HITSQUAREH;

      leftCenterX=centerX-HITSQUAREW-scaleAdjustmentX;
      leftCenterY=centerY;

      leftTopX=centerX-HITSQUAREW-scaleAdjustmentX;
      leftTopY=centerY-HITSQUAREH;

      leftBottomX=centerX-HITSQUAREW-scaleAdjustmentX;
      leftBottomY=centerY+HITSQUAREH;

      raquetPositionX=centerX+SHIFTTORAQUETPOSITIONX+scaleAdjustmentX;
      raquetPositionY=centerY+SHIFTTORAQUETPOSITIONY;

      if(ballPixelX>=centerX && ballPixelX<=rightCenterX && ballPixelY<=centerY && ballPixelY>=centerTopY){
        quadrantHit=TOPRIGHTQUADRANT;
      }
      if(ballPixelX<centerX && ballPixelX>=leftCenterX && ballPixelY<centerY && ballPixelY>=leftTopY){
        quadrantHit=TOPLEFTQUADRANT;
      }
      if(ballPixelX>centerX && ballPixelX<=rightBottomX && ballPixelY>centerY && ballPixelY<=rightBottomY){
        quadrantHit=BOTTOMRIGHTQUADRANT;
      }

      if(ballPixelX<centerX && ballPixelX >= leftBottomX && ballPixelY>centerY & ballPixelY<= leftBottomY){
        quadrantHit=BOTTOMLEFTQUADRANT;
      }
      if(quadrantHit!=TOPRIGHTQUADRANT && quadrantHit !=TOPLEFTQUADRANT && quadrantHit!=BOTTOMRIGHTQUADRANT && quadrantHit!= BOTTOMLEFTQUADRANT){
        quadrantHit=NOQUADRANTHIT;
      }
      return {
        quadrant:quadrantHit,
      }
    }

function GradientShotToBackWall (playerX,playerY){
      var centerX=COURT_W/2;
      var centerY=COURT_L*0.38;

      centerTopX=centerX;
      centerTopY=centerY-WALKTOPSQUAREY;

      centerBottomX=centerX;
      centerBottomY=centerY+WALKBOTTOMSQUAREY;

      rightCenterX=centerX+WALKCENTERSQUAREW;
      rightCenterY=centerY;

      rightTopX=centerX+WALKTOPSQUAREW;
      rightTopY=centerY-WALKTOPSQUAREY;

      rightBottomX=centerX+WALKBOTTOMSQUAREW;
      rightBottomY=centerY+WALKBOTTOMSQUAREY;

      leftCenterX=centerX-WALKCENTERSQUAREW;
      leftCenterY=centerY;

      leftTopX=centerX-WALKTOPSQUAREW;
      leftTopY=centerY-WALKTOPSQUAREY;

      leftBottomX=centerX-WALKBOTTOMSQUAREW;
      leftBottomY=centerY+WALKBOTTOMSQUAREY;

      /*//draw coordinates of court quadrants on the screen
      var drawThisLocation = perspectiveLocation(centerX,centerY,0);
      colorRect(drawThisLocation.x,drawThisLocation.y,3,3,"blue");
      var visualCenterX = drawThisLocation.x
      var visualCenterY = drawThisLocation.y
      var drawThisLocation = perspectiveLocation(centerTopX,centerTopY,0);
      colorRect(drawThisLocation.x,drawThisLocation.y,3,3,"blue");
      var visualCenterTopY = drawThisLocation.y
      var drawThisLocation = perspectiveLocation(rightTopX,rightTopY,0);
      colorRect(drawThisLocation.x,drawThisLocation.y,3,3,"blue");
      var visualRightTopX = drawThisLocation.x
      var drawThisLocation = perspectiveLocation(rightCenterX,rightCenterY,0);
      colorRect(drawThisLocation.x,drawThisLocation.y,3,3,"blue");
      var visualRightCenterX = drawThisLocation.x
      var drawThisLocation = perspectiveLocation(rightBottomX,rightBottomY,0);
      colorRect(drawThisLocation.x,drawThisLocation.y,3,3,"blue");
      var drawThisLocation = perspectiveLocation(centerBottomX,centerBottomY,0);
      colorRect(drawThisLocation.x,drawThisLocation.y,3,3,"blue");
      var drawThisLocation = perspectiveLocation(leftCenterX,leftCenterY,0);
      colorRect(drawThisLocation.x,drawThisLocation.y,3,3,"blue");
      var drawThisLocation = perspectiveLocation(leftTopX,leftTopY,0);
      colorRect(drawThisLocation.x,drawThisLocation.y,3,3,"blue");
      var drawThisLocation = perspectiveLocation(leftBottomX,leftBottomY,0);
      colorRect(drawThisLocation.x,drawThisLocation.y,3,3,"blue");*/

      //determine X point target and radiants to shoot to backwall on swing
      //what court quadrant is player standing:

      var targetXOnBackWall;
        if(PlayerClass.targetBackWall==RIGHTBACKWALL){
            targetXOnBackWall=centerBottomX+(rightBottomX-playerX)/2;
            distPlayerToTargetX=targetXOnBackWall-playerX;//opposite side of triangle
            distPlayerToBackWallY=centerBottomY-playerY;//adjacent side of triangle
            var atanResult=Math.atan(distPlayerToTargetX/distPlayerToBackWallY);//radians
            var degreeTarget=atanResult*180/Math.PI;
            //console.log(atanResult,degreeTarget);
            var ballAng=atanResult;
        }
        if(PlayerClass.targetBackWall==LEFTBACKWALL){
            targetXOnBackWall=centerBottomX-(playerX-leftBottomX)/2;
            distPlayerToTargetX=playerX-targetXOnBackWall;
            distPlayerToBackWallY=centerBottomY-playerY;
            var atanResult=Math.atan(distPlayerToTargetX/distPlayerToBackWallY);//radians
            var degreeTarget=atanResult*180/Math.PI;
            var ballAng=atanResult;
        }
        //what quadrant is player standing
        if(playerX>=centerX){
          PlayerClass.playerStandingOnCourtQuadrant=RIGHTCOURTQUADRANT;
        } else {
          PlayerClass.playerStandingOnCourtQuadrant=LEFTCOURTQUADRANT;
        }

      return {
        ballAng:ballAng,
        playerOnThisCourtQuad:PlayerClass.playerStandingOnCourtQuadrant,
        tgtBackWall:PlayerClass.targetBackWall
      };

  }//end of function

/*function drawTargetFrontWall () {
      var frontWallTargeted = targetFrontWall(BallClass.x,PlayerClass.y);
      var rectRealLifeAnchorX=frontWallTargeted[1];
      var rectRealLifeAnchorY=frontWallTargeted[2];
      var rectRealLifeWidthPoint=frontWallTargeted[3];
      var rectRealLifeHeightPoint=frontWallTargeted[4];

      var rectDrawnAnchor = perspectiveLocation(rectRealLifeAnchorX,rectRealLifeAnchorY,0);
      var rectDrawnWidthPoint = perspectiveLocation(rectRealLifeWidthPoint,rectRealLifeAnchorY,0);
      var rectDrawnHeightPoint = perspectiveLocation(rectRealLifeAnchorX,rectRealLifeHeightPoint,0);

      var targetWallDrawnWidth = rectDrawnWidthPoint.x-rectDrawnAnchor.x;
      var targetWalltDrawnHeight = rectDrawnAnchor.y-rectDrawnHeightPoint.y;
      //console.log(rectDrawnAnchor.x,rectDrawnAnchor.y)
      colorRect(rectDrawnAnchor.x,rectDrawnAnchor.y,targetWallDrawnWidth,targetWalltDrawnHeight,"blue");
    }*/

/*//on mouse target front wall
function targetFrontWall (ballPixelX,ballPixelY){
      var targetFrontWall;
      const HITSQUARETOPW=71;
      const HITSQUAREBOTTOMW=34;
      const HITSQUARECENTERW=39;
      const HITSQUARETOPZ=28;
      const HITSQUAREBOTTOMZ=8;
      const centerZ=14;

      var centerX=COURT_W/2;
      var centerY=0-centerZ;

      centerTopX=centerX;
      centerTopY=centerY-HITSQUARETOPZ;

      centerBottomX=centerX;
      centerBottomY=centerY+HITSQUAREBOTTOMZ;

      rightCenterX=centerX+HITSQUARECENTERW;
      rightCenterY=centerY;

      rightTopX=centerX+HITSQUARETOPW;
      rightTopY=centerY-HITSQUARETOPZ;

      rightBottomX=centerX+HITSQUAREBOTTOMW;
      rightBottomY=centerY+HITSQUAREBOTTOMZ;

      leftCenterX=centerX-HITSQUARECENTERW;
      leftCenterY=centerY;

      leftTopX=centerX-HITSQUARETOPW;
      leftTopY=centerY-HITSQUARETOPZ;

      leftBottomX=centerX-HITSQUAREBOTTOMW;
      leftBottomY=centerY+HITSQUAREBOTTOMZ;

      var centerDrawn = perspectiveLocation(centerX,centerY,0);
      var centerTopDrawn = perspectiveLocation(centerTopX,centerTopY,0);
      var centerBottomDrawn = perspectiveLocation(centerBottomX,centerBottomY,0);
      var rightCenterDrawn = perspectiveLocation(rightCenterX,rightCenterY,0);
      var rightTopDrawn =perspectiveLocation(rightTopX,rightTopY,0);
      var rightBottomDrawn = perspectiveLocation(rightBottomX,rightBottomY,0);
      var leftCenterDrawn = perspectiveLocation(leftCenterX,leftCenterY,0);
      var leftTopDrawn = perspectiveLocation(leftTopX,leftTopY,0);
      var leftBottomDrawn=perspectiveLocation(leftBottomX,leftBottomY,0);

      //determine target wall
      if(mouseX>=centerDrawn.x && mouseX<=rightCenterDrawn.x && mouseY<=centerDrawn.y && mouseY>=centerTopDrawn.y){
        targetFrontWall=TOPRIGHTFRONTWALL;
        return [targetFrontWall, centerDrawn.x, centerDrawn.y, rightCenterDrawn.x, centerTopDrawn.y];
      }

      if(mouseX<centerDrawn.x && mouseX>=leftCenterDrawn.x && mouseY<centerDrawn.y && mouseY>=leftTopDrawn.y){
        targetFrontWall=TOPLEFTFRONTWALL;
        return [targetFrontWall,centerDrawn.x, centerDrawn.y, leftCenterDrawn.x,leftTopDrawn.y];
      }

      if(mouseX>centerDrawn.x && mouseX<=rightBottomDrawn.x && mouseY>centerDrawn.y && mouseY<=rightBottomDrawn.y){
        targetFrontWall=BOTTOMRIGHTFRONTWALL;
        return [targetFrontWall,centerDrawn.x,centerDrawn.y,rightBottomDrawn.x,rightBottomDrawn.y];
      }

      if(mouseX<centerDrawn.x && mouseX >= leftBottomDrawn.x && mouseY>centerDrawn.y & mouseY<= leftBottomDrawn.y){
        targetFrontWall=BOTTOMLEFTFRONTWALL;
        return  [targetFrontWall,centerDrawn.x,centerDrawn.y,leftBottomDrawn.x,leftBottomDrawn.y]
      }
      if(targetFrontWall!=TOPRIGHTQUADRANT && targetFrontWall !=TOPLEFTQUADRANT && targetFrontWall!=BOTTOMRIGHTQUADRANT && targetFrontWall!= BOTTOMLEFTQUADRANT){
        targetFrontWall=NOFRONTWALLSELECTED;
        return targetFrontWall;
      }
  }//end of function to target the front wall
*/





//Drawing calculations
  //determine window range for racket hit: Draw only
/*
  //draws real life coordinates of front wall: Draw only
  function frontWallHitWindowCoords (){
      const HITSQUARETOPW=71;
      const HITSQUAREBOTTOMW=34;
      const HITSQUARECENTERW=39;
      const HITSQUARETOPZ=28;
      const HITSQUAREBOTTOMZ=8;
      const centerZ=14;

      var centerX=COURT_W/2;
      var centerY=0-centerZ;

      centerTopX=centerX;
      centerTopY=centerY-HITSQUARETOPZ;

      centerBottomX=centerX;
      centerBottomY=centerY+HITSQUAREBOTTOMZ;

      rightCenterX=centerX+HITSQUARECENTERW;
      rightCenterY=centerY;

      rightTopX=centerX+HITSQUARETOPW;
      rightTopY=centerY-HITSQUARETOPZ;

      rightBottomX=centerX+HITSQUAREBOTTOMW;
      rightBottomY=centerY+HITSQUAREBOTTOMZ;

      leftCenterX=centerX-HITSQUARECENTERW;
      leftCenterY=centerY;

      leftTopX=centerX-HITSQUARETOPW;
      leftTopY=centerY-HITSQUARETOPZ;

      leftBottomX=centerX-HITSQUAREBOTTOMW;
      leftBottomY=centerY+HITSQUAREBOTTOMZ;

      var drawThisLocation = perspectiveLocation(centerX,centerY,0);
      colorRect(drawThisLocation.x,drawThisLocation.y,3,3,"blue");
      var visualCenterX = drawThisLocation.x
      var visualCenterY = drawThisLocation.y

      var drawThisLocation = perspectiveLocation(centerTopX,centerTopY,0);
      colorRect(drawThisLocation.x,drawThisLocation.y,3,3,"blue");
      var visualCenterTopY = drawThisLocation.y

      var drawThisLocation = perspectiveLocation(rightTopX,rightTopY,0);
      colorRect(drawThisLocation.x,drawThisLocation.y,3,3,"blue");
      var visualRightTopX = drawThisLocation.x

      var drawThisLocation = perspectiveLocation(rightCenterX,rightCenterY,0);
      colorRect(drawThisLocation.x,drawThisLocation.y,3,3,"blue");
      var visualRightCenterX = drawThisLocation.x

      var drawThisLocation = perspectiveLocation(rightBottomX,rightBottomY,0);
      colorRect(drawThisLocation.x,drawThisLocation.y,3,3,"blue");
      var drawThisLocation = perspectiveLocation(centerBottomX,centerBottomY,0);
      colorRect(drawThisLocation.x,drawThisLocation.y,3,3,"blue");
      var drawThisLocation = perspectiveLocation(leftCenterX,leftCenterY,0);
      colorRect(drawThisLocation.x,drawThisLocation.y,3,3,"blue");
      var drawThisLocation = perspectiveLocation(leftTopX,leftTopY,0);
      colorRect(drawThisLocation.x,drawThisLocation.y,3,3,"blue");
      var drawThisLocation = perspectiveLocation(leftBottomX,leftBottomY,0);
      colorRect(drawThisLocation.x,drawThisLocation.y,3,3,"blue");

      var distanceCenterXToRightCenterX= visualRightCenterX- visualCenterX
      var distanceCenterYToCenterTopY= visualCenterTopY-visualCenterY
  }//end function to build front wall coords

*/

//Possibly delete: function determines where the squash racket is so it can be shifted at swing
//to make the swing transition visually less glitchy

/*this.playerHitWindowCoords = function(){
      var centerX=this.x+SHIFTTOCENTERX;
      var centerY=this.y+SHIFTTOCENTERY;
      var scaleAdjustmentX = (1-this.y/initYPosition)*100*WINDOWXSCALE;

      centerTopX=centerX;
      centerTopY=centerY-HITSQUAREH;

      centerBottomX=centerX;
      centerBottomY=centerY+HITSQUAREH;

      rightCenterX=centerX+HITSQUAREW+scaleAdjustmentX;
      rightCenterY=centerY;

      rightTopX=centerX+HITSQUAREW+scaleAdjustmentX;
      rightTopY=centerY-HITSQUAREH;

      rightBottomX=centerX+HITSQUAREW+scaleAdjustmentX;
      rightBottomY=centerY+HITSQUAREH;

      leftCenterX=centerX-HITSQUAREW-scaleAdjustmentX;
      leftCenterY=centerY;

      leftTopX=centerX-HITSQUAREW-scaleAdjustmentX;
      leftTopY=centerY-HITSQUAREH;

      leftBottomX=centerX-HITSQUAREW-scaleAdjustmentX;
      leftBottomY=centerY+HITSQUAREH;

      raquetPositionX=centerX+SHIFTTORAQUETPOSITIONX+scaleAdjustmentX;
      raquetPositionY=centerY+SHIFTTORAQUETPOSITIONY;

      var drawThisLocation = perspectiveLocation(centerX,centerY,0);
      colorRect(drawThisLocation.x,drawThisLocation.y,3,3,"orange");
      var visualCenterX = drawThisLocation.x
      var visualCenterY = drawThisLocation.y

      var drawThisLocation = perspectiveLocation(centerTopX,centerTopY,0);
      colorRect(drawThisLocation.x,drawThisLocation.y,3,3,"orange");
      var visualCenterTopY = drawThisLocation.y

      var drawThisLocation = perspectiveLocation(rightTopX,rightTopY,0);
      colorRect(drawThisLocation.x,drawThisLocation.y,3,3,"orange");
      var visualRightTopX = drawThisLocation.x

      var drawThisLocation = perspectiveLocation(rightCenterX,rightCenterY,0);
      colorRect(drawThisLocation.x,drawThisLocation.y,3,3,"orange");
      var visualRightCenterX = drawThisLocation.x

      var drawThisLocation = perspectiveLocation(rightBottomX,rightBottomY,0);
      colorRect(drawThisLocation.x,drawThisLocation.y,3,3,"orange");
      var drawThisLocation = perspectiveLocation(centerBottomX,centerBottomY,0);
      colorRect(drawThisLocation.x,drawThisLocation.y,3,3,"orange");
      var drawThisLocation = perspectiveLocation(leftCenterX,leftCenterY,0);
      colorRect(drawThisLocation.x,drawThisLocation.y,3,3,"orange");
      var drawThisLocation = perspectiveLocation(leftTopX,leftTopY,0);
      colorRect(drawThisLocation.x,drawThisLocation.y,3,3,"orange");
      var drawThisLocation = perspectiveLocation(leftBottomX,leftBottomY,0);
      colorRect(drawThisLocation.x,drawThisLocation.y,3,3,"orange");

      var distanceCenterXToRightCenterX= visualRightCenterX- visualCenterX
      var distanceCenterYToCenterTopY= visualCenterTopY-visualCenterY

      var drawThisLocation = perspectiveLocation(raquetPositionX,raquetPositionY,0);
      colorRect(drawThisLocation.x,drawThisLocation.y,3,3,"red");
      var visualraquetPositionX = drawThisLocation.x
      var visualraquetPositionY = drawThisLocation.y

      var drawThisLocation = perspectiveLocation(this.x,this.y,0);
      colorRect(drawThisLocation.x,drawThisLocation.y,3,3,"blue");
      var visualThisX = drawThisLocation.x
      var visualThisY = drawThisLocation.y
      //end of function to determine window of racket hit
  }*/