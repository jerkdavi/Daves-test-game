/*jshint esversion: 6 */
const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
var start = "yes";
var restart = "no";

var heading = "Are you ready to start the game?\n\nClick on the screen to start the game!";
var TextPlayer1 = "Player1";
var TextPlayer2 = "Player2";
var Score1 = 0;
var Score2 = 0;
var HighScore1 = 0;
var HighScore2 = 0;
var i = 0;

var TextScore1 = "Score: " + Score1;
var TextScore2 = "Score: " + Score2;
var TextHighScore1 = "Highscore: " + HighScore1;
var TextHighScore2 = "Highscore: " + HighScore2;

document.getElementById("overlay1").style.display = "block";
document.getElementById("overlay2").style.display = "none";
document.getElementById("overlay4").style.display = "none";

document.getElementById("button1").style.cssText = "margin-top:50px;margin-left:250px";
document.getElementById("button2").style.cssText = "margin-left:100px";

document.getElementById("button4").style.cssText = "margin-top:50px;margin-left:250px";
document.getElementById("button3").style.cssText = "margin-left:100px";

document.getElementById("button5").style.cssText = "margin-top:20px;margin-left:100px";
document.getElementById("button6").style.cssText = "margin-top:20px;margin-left:100px";

for(i = 0; i < (document.getElementsByClassName("player1").length); i++)
{
	document.getElementsByClassName("player1")[i].innerText = TextPlayer1;
}
for(i = 0; i < (document.getElementsByClassName("player2").length); i++)
{
	document.getElementsByClassName("player2")[i].innerText = TextPlayer2;
}

document.getElementById("score1").innerText = TextScore1;
document.getElementById("score2").innerText = TextScore2;

document.getElementById("highscore1").innerText = TextHighScore1;
document.getElementById("highscore2").innerText = TextHighScore2;

document.getElementById("input1").value = "";
document.getElementById("input2").value = "";
document.getElementById("input3").value = 5;
document.getElementById("input4").value = 6;
document.getElementById("input5").value = 10;
document.getElementById("input6").value = 80;
document.getElementById("input12").value = 2;
var firstToPlay = Number(document.getElementById("input12").value);

document.getElementById("input7").value = "#000000";
var bckgrndColor = document.getElementById("input7").value;

document.getElementById("input8").value = "#FFFFFF";
var txtColor = document.getElementById("input8").value;

document.getElementById("input9").value = "#d3d3d3";
var wallColor = document.getElementById("input9").value;

document.getElementById("input10").value = "#d3d3d3";
var ballColor = document.getElementById("input10").value;

document.getElementById("input11").value = "#FFFFFF";
var paddleColor = document.getElementById("input11").value;

document.getElementById("body").style.backgroundColor = bckgrndColor;
for(i = 0; i < (document.getElementsByClassName("half2").length); i++)
{
	document.getElementsByClassName("half2")[i].style.backgroundColor = bckgrndColor;
}

document.getElementById("input1").style.backgroundColor = bckgrndColor;
document.getElementById("input2").style.backgroundColor = bckgrndColor;
document.getElementById("input3").style.backgroundColor = bckgrndColor;
document.getElementById("input4").style.backgroundColor = bckgrndColor;
document.getElementById("input5").style.backgroundColor = bckgrndColor;
document.getElementById("input6").style.backgroundColor = bckgrndColor;
document.getElementById("input12").style.backgroundColor = bckgrndColor;
document.getElementById("button1").style.backgroundColor = bckgrndColor;
document.getElementById("button2").style.backgroundColor = bckgrndColor;
document.getElementById("button3").style.backgroundColor = bckgrndColor;
document.getElementById("button4").style.backgroundColor = bckgrndColor;
document.getElementById("button5").style.backgroundColor = bckgrndColor;
document.getElementById("button6").style.backgroundColor = bckgrndColor;

document.getElementById("body").style.color = txtColor;
document.getElementById("input1").style.color = txtColor;
document.getElementById("input2").style.color = txtColor;
document.getElementById("input3").style.color = txtColor;
document.getElementById("input4").style.color = txtColor;
document.getElementById("input5").style.color = txtColor;
document.getElementById("input6").style.color = txtColor;
document.getElementById("input12").style.color = txtColor;
document.getElementById("button1").style.color = txtColor;
document.getElementById("button2").style.color = txtColor;
document.getElementById("button3").style.color = txtColor;
document.getElementById("button4").style.color = txtColor;
document.getElementById("button5").style.color = txtColor;
document.getElementById("button6").style.color = txtColor;

document.getElementById("h1").style.cssText = "margin-top:200px;color:black;font-size:30px;";
document.getElementById("h1").innerText = heading;
document.getElementById("h4").style.cssText = "margin-top:200px;color:black;font-size:30px;";

var ballSpeed = Number(document.getElementById("input3").value);
var paddleSpeed = Number(document.getElementById("input4").value);
var Win = Number(document.getElementById("input5").value);
var PaddleHeight = Number(document.getElementById("input6").value);
var maxPaddleY = canvas.height - 15 - PaddleHeight;

const leftPaddle = {
  //start in the middle of the game on the left side
  width:15,
  height:PaddleHeight,
  x:0,
  y: canvas.height / 2 - PaddleHeight / 2,
  // paddle velocity
  dy: 0
};
const rightPaddle = {
  // start in the middle of the game on the right side
  width:15,
  height:PaddleHeight,
  x: canvas.width - 15,
  y: canvas.height / 2 - PaddleHeight / 2,
  // paddle velocity
  dy: 0
};
const ball = {
  // start in the middle of the game
  width: 15,
  height: 15,
  x: canvas.width / 2,
  y: canvas.height / 2,
  // keep track of when need to reset the ball position
  resetting: false,
  // ball velocity (start going to the top-right corner)
  dx: ballSpeed,
  dy: -ballSpeed
};

// check for collision between two objects using axis-aligned bounding box (AABB)
// @see https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
function collides(obj1, obj2) {
  return obj1.x < obj2.x + obj2.width &&
         obj1.x + obj1.width > obj2.x &&
         obj1.y < obj2.y + obj2.height &&
         obj1.y + obj1.height > obj2.y;
}

// game loop
function loop() {
  requestAnimationFrame(loop);
  context.clearRect(0,0,canvas.width,canvas.height);

	document.getElementById('h1').innerText = heading;
	document.getElementById('h4').innerText = heading;
	
  // move paddles by their velocity
  leftPaddle.y += leftPaddle.dy;
  rightPaddle.y += rightPaddle.dy;
  // prevent paddles from going through walls
  if (leftPaddle.y < 15) {
    leftPaddle.y = 15;
  }
  else if (leftPaddle.y > maxPaddleY) {
    leftPaddle.y = maxPaddleY;
  }

  if (rightPaddle.y < 15) {
    rightPaddle.y = 15;
  }
  else if (rightPaddle.y > maxPaddleY) {
    rightPaddle.y = maxPaddleY;
  }

  // draw paddles
  context.fillStyle = paddleColor;
  context.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);
  context.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);

  // move ball by its velocity
  if(start === "no")
  {
	  ball.x += ball.dx;
	  ball.y += ball.dy;
  }

  // prevent ball from going through walls by changing its velocity
  if (ball.y < 15) {
    ball.y = 15;
    ball.dy *= -1;
  }
  else if (ball.y + 15 > canvas.height - 15) {
    ball.y = canvas.height - 15 * 2;
    ball.dy *= -1;
  }

  // reset ball if it goes past paddle (but only if we haven't already done so)
  if (ball.x < 0  && !ball.resetting) {
    ball.resetting = true;
	Score2 += 1;
	TextScore2 = "Score: " + Score2;
	document.getElementById("score2").innerText = TextScore2;
    // give some time for the player to recover before launching the ball again
    if(Score2 === Win)
	{
		document.getElementById("overlay4").style.display = "block";
		heading = TextPlayer2 + " wins the game!\n\nDo you want to play again?";
		restart = "yes";
		HighScore2 += 1;
		TextHighScore2 = "Highscore: " + HighScore2;
		document.getElementById("highscore2").innerText = TextHighScore2;
	}
	else
	{
		setTimeout(() => {
		ball.resetting = false;
		ball.x = canvas.width / 2;
		ball.y = canvas.height / 2;
		}, 400);
	}
  }
  else if (ball.x > canvas.width && !ball.resetting) {
    ball.resetting = true;
	Score1 += 1;
	TextScore1 = "Score: " + Score1;
	document.getElementById("score1").innerText = TextScore1;
    // give some time for the player to recover before launching the ball again4
	if(Score1 === Win)
	{
		document.getElementById("overlay4").style.display = "block";
		heading = TextPlayer1 + " wins the game!\n\nDo you want to play again?";
		restart = "yes";
		HighScore1 += 1;
		TextHighScore1 = "Highscore: " + HighScore1;
		document.getElementById("highscore1").innerText = TextHighScore1;
	}
    else
	{
		setTimeout(() => {
		ball.resetting = false;
		ball.x = canvas.width / 2;
		ball.y = canvas.height / 2;
		}, 400);
	}
  }

  // check to see if ball collides with paddle. if they do change x velocity
  if (collides(ball, leftPaddle)) {
    ball.dx *= -1;
    // move ball next to the paddle otherwise the collision will happen again
    // in the next frame
    ball.x = leftPaddle.x + ball.width;//leftPaddle.width;
  }
  else if (collides(ball, rightPaddle)) {
    ball.dx *= -1;
    // move ball next to the paddle otherwise the collision will happen again
    // in the next frame
    ball.x = rightPaddle.x - ball.width;
  }

  // draw ball
  context.fillStyle = ballColor;
  context.fillRect(ball.x, ball.y, ball.width, ball.height);

  // draw walls
  context.fillStyle = wallColor;
  context.fillRect(0, 0, canvas.width, 15);
  context.fillRect(0, canvas.height - 15, canvas.width, canvas.height);

  // draw dotted line down the middle
  for (let i = 15; i < canvas.height - 15; i += 15 * 2) {
    context.fillRect(canvas.width / 2 - 15 / 2, i, 15, 15);
  }
}

var button1 = document.querySelector("#button1");
	button1.style.cursor = "pointer";
	button1.addEventListener("click", () => {
		document.getElementById("overlay1").style.display = "none";
		document.getElementById("overlay2").style.display = "block";
	});

var button2 = document.querySelector("#button2");
	button2.style.cursor = "pointer";
	button2.addEventListener("click", () => {
		document.getElementById("overlay1").style.display = "none";
		start = "no";
	});

var button3 = document.querySelector("#button3");
	button3.style.cursor = "pointer";
	button3.addEventListener("click", () => {
		document.getElementById("overlay4").style.display = "none";
		ball.resetting = false;
		ball.x = canvas.width / 2;
		ball.y = canvas.height / 2;
		Score1 = 0;
		Score2 = 0;
		TextScore1 = "Score: " + Score1;
		TextScore2 = "Score: " + Score2;
		document.getElementById("score1").innerText = TextScore1;
		document.getElementById("score2").innerText = TextScore2;
		start = "no";
	});

var button4 = document.querySelector("#button4");
	button4.style.cursor = "pointer";
	button4.addEventListener("click", () => {
		document.getElementById("overlay4").style.display = "none";
		document.getElementById("overlay2").style.display = "block";
	});

var button5 = document.querySelector("#button5");
	button5.style.cursor = "pointer";
	button5.addEventListener("click", Reset, false);
	
var button6 = document.querySelector("#button6");
	button6.style.cursor = "pointer";
	button6.addEventListener("click", Save, false);

/*function locationReload()
{
	document.getElementById("overlay4").style.display = "none";
	document.getElementById("overlay1").style.display = "block";
	heading = "Are you ready to start the game?\n\nClick on the screen to start the game!";
	ball.resetting = false;
	ball.x = canvas.width / 2;
	ball.y = canvas.height / 2;
	start = "yes";
	Score1 = 0;
	Score2 = 0;
	TextScore1 = "Score: " + Score1;
	TextScore2 = "Score: " + Score2;
	document.getElementById("score1").innerText = TextScore1;
	document.getElementById("score2").innerText = TextScore2;
}*/
/*function locationAbandon()
{
	heading = "";
	document.getElementById("overlay4").style.display = "none";
	document.getElementById("body1").style.display = "none";
}*/
function Reset()
{
	document.getElementById("input1").value = "";
	document.getElementById("input2").value = "";
	document.getElementById("input3").value = 5;
	document.getElementById("input4").value = 6;
	document.getElementById("input5").value = 10;
	document.getElementById("input6").value = 80;
	document.getElementById("input12").value = 2;
	document.getElementById("input7").value = "#000000";
	document.getElementById("input8").value = "#FFFFFF";
	document.getElementById("input9").value = "#d3d3d3";
	document.getElementById("input10").value = "#d3d3d3";
	document.getElementById("input11").value = "#FFFFFF";
}
function Save()
{
	if(document.getElementById("input1").value === "")
	{
		TextPlayer1 = "Player1";
		for(i = 0; i < (document.getElementsByClassName("player1").length); i++)
		{
			document.getElementsByClassName("player1")[i].innerText = TextPlayer1;
		}
	}
	else if(document.getElementById("input1").value != "")
	{
		TextPlayer1 = document.getElementById("input1").value;
		for(i = 0; i < (document.getElementsByClassName("player1").length); i++)
		{
			document.getElementsByClassName("player1")[i].innerText = TextPlayer1;
		}
	}
	if(document.getElementById("input2").value === "")
	{
		TextPlayer2 = "Player2";
		for(i = 0; i < (document.getElementsByClassName("player2").length); i++)
		{
			document.getElementsByClassName("player2")[i].innerText = TextPlayer2;
		}
	}
	if(document.getElementById("input2").value != "")
	{
		TextPlayer2 = document.getElementById("input2").value;
		for(i = 0; i < (document.getElementsByClassName("player2").length); i++)
		{
			document.getElementsByClassName("player2")[i].innerText = TextPlayer2;
		}
	}
	ballSpeed = Number(document.getElementById("input3").value);
	paddleSpeed = Number(document.getElementById("input4").value);
	Win = Number(document.getElementById("input5").value);
	PaddleHeight = document.getElementById("input6").value;
	leftPaddle.height = PaddleHeight;
	rightPaddle.height = PaddleHeight;
	maxPaddleY = canvas.height - 15 - PaddleHeight;
	leftPaddle.y = canvas.height / 2 - PaddleHeight / 2;
	rightPaddle.y = canvas.height / 2 - PaddleHeight / 2;
	
	ball.dx = ballSpeed;
	ball.dy = -ballSpeed;
		
	document.getElementById("overlay2").style.display = "none";
	if(restart === "no")
	{
		document.getElementById("overlay1").style.display = "block";
	}
	else if(restart === "yes")
	{
		document.getElementById("overlay4").style.display = "block";
	}
	bckgrndColor = document.getElementById("input7").value;
	document.getElementById("body").style.backgroundColor = bckgrndColor;
	for(i = 0; i < (document.getElementsByClassName("half2").length); i++)
	{
		document.getElementsByClassName("half2")[i].style.backgroundColor = bckgrndColor;
	}
	document.getElementById("input1").style.backgroundColor = bckgrndColor;
	document.getElementById("input2").style.backgroundColor = bckgrndColor;
	document.getElementById("input3").style.backgroundColor = bckgrndColor;
	document.getElementById("input4").style.backgroundColor = bckgrndColor;
	document.getElementById("input5").style.backgroundColor = bckgrndColor;
	document.getElementById("input6").style.backgroundColor = bckgrndColor;
	document.getElementById("button1").style.backgroundColor = bckgrndColor;
	document.getElementById("button2").style.backgroundColor = bckgrndColor;
	document.getElementById("button3").style.backgroundColor = bckgrndColor;
	document.getElementById("button4").style.backgroundColor = bckgrndColor;
	document.getElementById("button5").style.backgroundColor = bckgrndColor;
	document.getElementById("button6").style.backgroundColor = bckgrndColor;

	txtColor = document.getElementById("input8").value;
	document.getElementById("body").style.color = txtColor;
	document.getElementById("input1").style.color = txtColor;
	document.getElementById("input2").style.color = txtColor;
	document.getElementById("input3").style.color = txtColor;
	document.getElementById("input4").style.color = txtColor;
	document.getElementById("input5").style.color = txtColor;
	document.getElementById("input6").style.color = txtColor;
	document.getElementById("button1").style.color = txtColor;
	document.getElementById("button2").style.color = txtColor;
	document.getElementById("button3").style.color = txtColor;
	document.getElementById("button4").style.color = txtColor;
	document.getElementById("button5").style.color = txtColor;
	document.getElementById("button6").style.color = txtColor;
	
	wallColor = document.getElementById("input9").value;
	context.fillStyle = wallColor;

	ballColor = document.getElementById("input10").value;
	context.fillStyle = ballColor;
	
	paddleColor = document.getElementById("input11").value;
	context.fillStyle = paddleColor;
	
	firstToPlay = Number(document.getElementById("input12").value);
	if(firstToPlay === 1)
	{
		
		ball.dx *= -1;
	}
	else if(firstToPlay === 2)
	{
		ball.dx *= 1;
	}
}

// listen to keyboard events to move the paddles
document.addEventListener('keydown', function(e) {
  if(start === "no") {
	  // up arrow key
	  if (e.which === 38) {
		rightPaddle.dy = -paddleSpeed;
	  }
	  // down arrow key
	  else if (e.which === 40) {
		rightPaddle.dy = paddleSpeed;
	  }
	  // w key
	  if (e.which === 87) {
		leftPaddle.dy = -paddleSpeed;
	  }
	  // a key
	  else if (e.which === 83) {
		leftPaddle.dy = paddleSpeed;
	  }
  }
});

// listen to keyboard events to stop the paddle if key is released
document.addEventListener('keyup', function(e) {
  if (e.which === 38 || e.which === 40) {
    rightPaddle.dy = 0;
  }
  if (e.which === 83 || e.which === 87) {
    leftPaddle.dy = 0;
  }
});

// start the game
requestAnimationFrame(loop);
