var squashcourt = document.createElement("img");
var ballPic = document.createElement("img");
var ballShadow = document.createElement("img");
var p1_standing = document.createElement("img");
var p1_running = document.createElement("img");
var p1_shot_bottom_left = document.createElement("img");
var p1_shot_bottom_right = document.createElement("img");
var p1_sprint_shot_down_right = document.createElement("img");
var p1_sprint_shot_down_left = document.createElement("img");
var p1_shot_top_right = document.createElement("img");
var p1_shot_top_left = document.createElement("img");

var p2_standing = document.createElement("img");
var p2_running = document.createElement("img");
var p2_shot_bottom_left = document.createElement("img");
var p2_shot_bottom_right = document.createElement("img");
var p2_shot_top_right = document.createElement("img");
var p2_shot_top_left = document.createElement("img");

var scorecounter1 = document.createElement("img");
var scorecounter2 = document.createElement("img");
var scorecounterbackground = document.createElement("img");
var zero = document.createElement("img");
var one = document.createElement("img");
var two = document.createElement("img");
var three = document.createElement("img");
var four = document.createElement("img");
var five = document.createElement("img");
var six = document.createElement("img");
var seven = document.createElement("img");
var eight = document.createElement("img");
var nine = document.createElement("img");

var picsToLoad=0;

function countLoadedImagesAndLaunchIfReady(){
		picsToLoad--;
		if(picsToLoad==0) {
		imageLoadingDoneSoStartGame();
		}
	}

function beginLoadingImage(imgVar, fileName){
	imgVar.onload = countLoadedImagesAndLaunchIfReady;
	imgVar.src = "img/"+fileName;
	}

function loadImages(){
	var imageList = [
	{varName: squashcourt, theFile: "squashcourt4.png"},
	{varName: ballPic, theFile: "ball_sprite_6x6.png"},
	{varName: ballShadow, theFile: "ball_shadow.png"},
	{varName: p1_shot_bottom_left, theFile: "shortsprite_p1_shot_bottom_left.png"},
	{varName: p1_shot_bottom_right, theFile: "shortsprite_p1_shot_bottom_right2.png"},
	{varName: p1_standing, theFile: "p1_standing.png"},
	{varName: p1_running, theFile: "p1_running.png"},
	{varName: p1_sprint_shot_down_right, theFile: "sprite_p1_sprint_shot_down_right_v2.png"},
	{varName: p1_sprint_shot_down_left, theFile: "sprite_p1_sprint_shot_down_left_v2.png"},
	{varName: p1_shot_top_right, theFile: "shortsprite_p1_shot_top_right.png"},
	{varName: p1_shot_top_left, theFile: "shortsprite_p1_shot_top_left.png"},
	
	{varName: p2_shot_bottom_left, theFile: "shortsprite_p2_shot_bottom_left.png"},
	{varName: p2_shot_bottom_right, theFile: "shortsprite_p2_shot_bottom_right2.png"},
	{varName: p2_standing, theFile: "p2_standing.png"},
	{varName: p2_running, theFile: "p2_running.png"},
	{varName: p2_shot_top_right, theFile: "shortsprite_p2_shot_top_right.png"},
	{varName: p2_shot_top_left, theFile: "shortsprite_p2_shot_top_left.png"},

	{varName: scorecounter1, theFile: "scorecounter1a.png"},
	{varName: scorecounter2, theFile: "scorecounter2a.png"},
	{varName: scorecounterbackground, theFile: "scorecounterbackground.png"},
	{varName: zero, theFile: "zero.png"},
	{varName: one, theFile: "one.png"},
	{varName: two, theFile: "two.png"},
	{varName: three, theFile: "three.png"},
	{varName: four, theFile: "four.png"},
	{varName: five, theFile: "five.png"},
	{varName: six, theFile: "six.png"},
	{varName: seven, theFile: "seven.png"},
	{varName: eight, theFile: "eight.png"},
	{varName: nine, theFile: "nine.png"}

	];

	picsToLoad = imageList.length;

	for (var i=0; i < imageList.length; i++){
		if(imageList[i].varName != undefined){
			beginLoadingImage(imageList[i].varName, imageList[i].theFile);
		} 	
	}
}