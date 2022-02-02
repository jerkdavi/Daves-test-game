/*jshint esversion: 6 */
var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var start = "yes";
var heading = "Are you ready to start the game?\n\nClick on the screen to start the game!";

var TextPlayer1 = "Player";
var Score1 = 0;
var HighScore1 = 0;
var i = 0;
var grid = 16;
var count = 0;
var speed = 0;
var snakeSpeed1 = [1,2,3,4,5,6,7,8,9];
var snakeSpeed2 = [9,8,7,6,5,4,3,2,1];

var TextScore1 = "Score: " + Score1;
var TextHighScore1 = "Highscore: " + HighScore1;

document.getElementById("overlay1").style.display = "block";
document.getElementById("overlay2").style.display = "none";
document.getElementById("overlay4").style.display = "none";

document.getElementById("button1").style.cssText = "margin-top:50px;margin-left:180px";
document.getElementById("button2").style.cssText = "margin-left:100px";

document.getElementById("button4").style.cssText = "margin-top:50px;margin-left:180px";
document.getElementById("button3").style.cssText = "margin-left:100px";

document.getElementById("button5").style.cssText = "margin-top:50px;margin-left:100px";
document.getElementById("button6").style.cssText = "margin-top:50px;margin-left:100px";

for(i = 0; i < (document.getElementsByClassName("player1").length); i++)
{
	document.getElementsByClassName("player1")[i].innerText = TextPlayer1;
}

document.getElementById("score1").innerText = TextScore1;
document.getElementById("highscore1").innerText = TextHighScore1;

document.getElementById("input1").value = "";
document.getElementById("input3").value = 6;
var setsnakeSpeed1 = document.getElementById("input3").value;
var setsnakeSpeed2 = 4;

document.getElementById("input7").value = "#000000";
var bckgrndColor = document.getElementById("input7").value;

document.getElementById("input8").value = "#FFFFFF";
var txtColor = document.getElementById("input8").value;

document.getElementById("input9").value = "#d3d3d3";
var wallColor = document.getElementById("input9").value;

document.getElementById("input10").value = "#008000";
var snakeColor = document.getElementById("input10").value;

document.getElementById("input11").value = "#FF0000";
var appleColor = document.getElementById("input11").value;

var CrashInWall = "";
if (document.getElementById('input12').checked)
{
	CrashInWall = document.getElementById('input12').value
}
if (document.getElementById('input13').checked)
{
	CrashInWall = document.getElementById('input13').value
}
//console.log("CrashInWall = " + CrashInWall);

var CrashInSelf = "";
if (document.getElementById('input14').checked)
{
	CrashInSelf = document.getElementById('input14').value
}
if (document.getElementById('input15').checked)
{
	CrashInSelf = document.getElementById('input15').value
}
//console.log("CrashInSelf = " + CrashInSelf);

document.getElementById("body").style.backgroundColor = bckgrndColor;
for(i = 0; i < (document.getElementsByClassName("half2").length); i++)
{
	document.getElementsByClassName("half2")[i].style.backgroundColor = bckgrndColor;
}

document.getElementById("input1").style.backgroundColor = bckgrndColor;
document.getElementById("input3").style.backgroundColor = bckgrndColor;
document.getElementById("input12").style.backgroundColor = bckgrndColor;
document.getElementById("input13").style.backgroundColor = bckgrndColor;
document.getElementById("input14").style.backgroundColor = bckgrndColor;
document.getElementById("input15").style.backgroundColor = bckgrndColor;
document.getElementById("button1").style.backgroundColor = bckgrndColor;
document.getElementById("button2").style.backgroundColor = bckgrndColor;
document.getElementById("button3").style.backgroundColor = bckgrndColor;
document.getElementById("button4").style.backgroundColor = bckgrndColor;
document.getElementById("button5").style.backgroundColor = bckgrndColor;
document.getElementById("button6").style.backgroundColor = bckgrndColor;

document.getElementById("body").style.color = txtColor;
document.getElementById("input1").style.color = txtColor;
document.getElementById("input3").style.color = txtColor;
document.getElementById("input12").style.color = txtColor;
document.getElementById("input13").style.color = txtColor;
document.getElementById("input14").style.color = txtColor;
document.getElementById("input15").style.color = txtColor;
document.getElementById("button1").style.color = txtColor;
document.getElementById("button2").style.color = txtColor;
document.getElementById("button3").style.color = txtColor;
document.getElementById("button4").style.color = txtColor;
document.getElementById("button5").style.color = txtColor;
document.getElementById("button6").style.color = txtColor;

document.getElementById("h1").style.cssText = "margin-top:200px;color:black;font-size:30px;";
document.getElementById("h1").innerText = heading;
document.getElementById("h4").style.cssText = "margin-top:200px;color:black;font-size:30px;";

var wall1 = {
  x: 0,
  y: 0,
  height: 15,
  width: 575
};
var wall2 = {
  x: 0,
  y: 0,
  height: 575,
  width: 15
};
var wall3 = {
  x: 560,
  y: 0,
  height: 575,
  width: 15
};
var wall4 = {
  x: 0,
  y: 560,
  height: 15,
  width: 575
};

var snake = {
  x: 160,
  y: 160,
  width: 1,
  height: 1,
  // snake velocity. moves one grid length every frame in either the x or y direction
  dx: speed,
  dy: 0,

  // keep track of all grids the snake body occupies
  cells: [],

  // length of the snake. grows when eating an apple
  maxCells: 4
};

var apple = {
  x: 20*16,
  y: 20*16
};

function collides1(obj1, obj2) {
  return obj1.x < obj2.x + obj2.width &&
         obj1.x + obj1.width > obj2.x &&
         obj1.y < obj2.y + obj2.height &&
         obj1.y + obj1.height > obj2.y;
}

// get random whole numbers in a specific range
// @see https://stackoverflow.com/a/1527820/2124254
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// game loop
function loop() {
	  requestAnimationFrame(loop);
		
		document.getElementById('h1').innerText = heading;
		document.getElementById('h4').innerText = heading;
	
	  // slow game loop to 15 fps instead of 60 (60/15 = 4)
	  if (++count < setsnakeSpeed2) {
		return;
	  }

	  count = 0;
	  context.clearRect(0,0,canvas.width,canvas.height);

	  // move snake by it's velocity
	  snake.x += snake.dx;
	  snake.y += snake.dy;
	if(CrashInWall === "Yes")
	{
	  if (collides1(snake, wall1)) {
		heading = "You have crashed in the north wall!\n\nDo you want to play again?";
		start = "yes";
		Collision1();
	  }
	  if (collides1(snake, wall2)) {
		heading = "You have crashed in the west wall!\n\nDo you want to play again?";
		start = "yes";
		Collision1();
	  }
	  if (collides1(snake, wall3)) {
		heading = "You have crashed in the east wall!\n\nDo you want to play again?";
		start = "yes";
		Collision1();
	  }
	  if (collides1(snake, wall4)) {
		heading = "You have crashed in the south wall!\n\nDo you want to play again?";
		start = "yes";
		Collision1();
	  }
	}
	if(CrashInWall === "No")
	{
	  // wrap snake position horizontally on edge of screen
	  if (collides1(snake, wall2)) {
		snake.x = 34 * 16;
	  }
	  /*if (snake.x <= 15) {
		snake.x = canvas.width - grid - 15;
	  }*/
	  if (collides1(snake, wall3)) {
		snake.x = 1 * 16;
	  }
	  /*else if (snake.x >= canvas.width - 15) {
		snake.x = 15;
	  }*/

	  // wrap snake position vertically on edge of screen
	  if (collides1(snake, wall1)) {
		snake.y = 34 * 16;
	  }
	  /*if (snake.y <= 15) {
		snake.y = canvas.height - grid - 15;
	  }*/
	  if (collides1(snake, wall4)) {
		snake.y = 1 * 16;
	  }
	  /*else if (snake.y >= canvas.height - 15) {
		snake.y = 15;
	  }*/
	}
	  // keep track of where snake has been. front of the array is always the head
	  snake.cells.unshift({x: snake.x, y: snake.y});

	  // remove cells as we move away from them
	  if (snake.cells.length > snake.maxCells) {
		snake.cells.pop();
	  }
	  
	  // draw walls
	  context.fillStyle = wallColor;
	  //context.fillRect(0, 0, canvas.width, 15);
	  //context.fillRect(0, 0, 15, canvas.width);
	  //context.fillRect(0, canvas.height - 15, canvas.width, canvas.height);
	  //context.fillRect(canvas.height - 15, 0, canvas.width, canvas.height);
	  context.fillRect(wall1.x, wall1.y, wall1.width, wall1.height);
	  context.fillRect(wall2.x, wall2.y, wall2.width, wall2.height);
	  context.fillRect(wall3.x, wall3.y, wall3.width, wall3.height);
	  context.fillRect(wall4.x, wall4.y, wall4.width, wall4.height);

	  // draw apple
	  context.fillStyle = appleColor;
	  context.fillRect(apple.x, apple.y, grid-1, grid-1);

	  // draw snake one cell at a time
	  context.fillStyle = snakeColor;
	  snake.cells.forEach(function(cell, index) {

		// drawing 1 px smaller than the grid creates a grid effect in the snake body so you can see how long it is
		context.fillRect(cell.x, cell.y, grid-1, grid-1);

		// snake ate apple
		if (cell.x === apple.x && cell.y === apple.y) {
			snake.maxCells++;
			Score1 += 1;
			TextScore1 = "Score: " + Score1;
			document.getElementById("score1").innerText = TextScore1;

			// canvas is 400x400 which is 25x25 grids
			//apple.x = getRandomInt(15, 36) * grid;
			//apple.y = getRandomInt(0, 36) * grid;
			apple.x = getRandomInt(1, 34) * 16;
			apple.y = getRandomInt(1, 34) * 16;
		  
		}
		// check collision with all cells after this one (modified bubble sort)
		if(start === "no"){
			if(CrashInSelf === "Yes")
			{
				for (var i = index + 1; i < snake.cells.length; i++) {

				  // snake occupies same space as a body part. reset game
				  if (snake.x === snake.cells[i].x && snake.y === snake.cells[i].y) {
					heading = "You have crashed in yourself!\n\nDo you want to play again?";
					start = "yes";
					Collision1();
				  }
				}
			}
		}
	  });
}

var button1 = document.querySelector("#button1");
	button1.style.cursor = "pointer";
	button1.addEventListener("click", secondDiv, false);

var button2 = document.querySelector("#button2");
	button2.style.cursor = "pointer";
	button2.addEventListener("click", firstDiv, false);

var button3 = document.querySelector("#button3");
	button3.style.cursor = "pointer";
	button3.addEventListener("click", () => {
		document.getElementById("overlay4").style.display = "none";
		snake.x = 10 * 16;
		snake.y = 10 * 16;
		snake.cells = [];
		snake.maxCells = 4;
		Score1 = 0;
		TextScore1 = "Score: " + Score1;
		document.getElementById("score1").innerText = TextScore1;
		
		apple.x = 20 * 16;
		apple.y = 20 * 16;
	
		firstDiv();
	});

var button4 = document.querySelector("#button4");
	button4.style.cursor = "pointer";
	button4.addEventListener("click", () => {
		document.getElementById("overlay4").style.display = "none";
		secondDiv();
	});
	
var button5 = document.querySelector("#button5");
	button5.style.cursor = "pointer";
	button5.addEventListener("click", Reset, false);
	
var button6 = document.querySelector("#button6");
	button6.style.cursor = "pointer";
	button6.addEventListener("click", Save, false);

function firstDiv()
{
	document.getElementById("overlay1").style.display = "none";
	start = "no";
	speed = 16;
	snake.dx = speed;
}
function secondDiv()
{
	document.getElementById("overlay1").style.display = "none";
	document.getElementById("overlay2").style.display = "block";
}
/*function locationReload()
{
	document.getElementById("overlay4").style.display = "none";
	document.getElementById("overlay1").style.display = "block";
	heading = "Are you ready to start the game?\n\nClick on the screen to start the game!";
	start = "yes";
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
	document.getElementById("input3").value = 6;
	setsnakeSpeed1 = Number(document.getElementById("input3").value);
	for(i = 0; i < snakeSpeed1.length; i++)
	{
		if(setsnakeSpeed1 === snakeSpeed1[i])
		{
			setsnakeSpeed2 = snakeSpeed2[i];
		}
	}
	document.getElementById("input7").value = "#000000";
	document.getElementById("input8").value = "#FFFFFF";
	document.getElementById("input9").value = "#d3d3d3";
	document.getElementById("input10").value = "#008000";
	document.getElementById("input11").value = "#FF0000";
	document.getElementById("input12").checked = true;
	CrashInWall = document.getElementById("input12").value
	//console.log("CrashInWall = " + CrashInWall);
	document.getElementById("input14").checked = true;
	CrashInSelf = document.getElementById("input14").value
	//console.log("CrashInSelf = " + CrashInSelf);
}
function Collision1()
{
	snake.x = 10 * 16;
	snake.y = 10 * 16;
	snake.dx = 0;
	snake.dy = 0;
	document.getElementById("overlay4").style.display = "block";
	if(Score1 > HighScore1)
	{
		HighScore1 = Score1;
		TextHighScore1 = "Highscore: " + HighScore1;
		document.getElementById("highscore1").innerText = TextHighScore1;
	}
}
function Save()
{
	if(document.getElementById("input1").value === "")
	{
		TextPlayer1 = "Player";
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
	setsnakeSpeed1 = Number(document.getElementById("input3").value);
	
	document.getElementById("overlay2").style.display = "none";
	document.getElementById("overlay1").style.display = "block";
	
	bckgrndColor = document.getElementById("input7").value;
	document.getElementById("body").style.backgroundColor = bckgrndColor;
	for(i = 0; i < (document.getElementsByClassName("half2").length); i++)
	{
		document.getElementsByClassName("half2")[i].style.backgroundColor = bckgrndColor;
	}
	document.getElementById("input1").style.backgroundColor = bckgrndColor;
	document.getElementById("input3").style.backgroundColor = bckgrndColor;
	document.getElementById("button1").style.backgroundColor = bckgrndColor;
	document.getElementById("button2").style.backgroundColor = bckgrndColor;
	document.getElementById("button3").style.backgroundColor = bckgrndColor;
	document.getElementById("button4").style.backgroundColor = bckgrndColor;
	document.getElementById("button5").style.backgroundColor = bckgrndColor;
	document.getElementById("button6").style.backgroundColor = bckgrndColor;

	txtColor = document.getElementById("input8").value;
	document.getElementById("body").style.color = txtColor;
	document.getElementById("input1").style.color = txtColor;
	document.getElementById("input3").style.color = txtColor;
	document.getElementById("button1").style.color = txtColor;
	document.getElementById("button2").style.color = txtColor;
	document.getElementById("button3").style.color = txtColor;
	document.getElementById("button4").style.color = txtColor;
	document.getElementById("button5").style.color = txtColor;
	document.getElementById("button6").style.color = txtColor;
	
	if (document.getElementById('input12').checked)
	{
		CrashInWall = document.getElementById('input12').value
	}
	if (document.getElementById('input13').checked)
	{
		CrashInWall = document.getElementById('input13').value
	}
	//console.log("CrashInWall = " + CrashInWall);
	
	if (document.getElementById('input14').checked)
	{
		CrashInSelf = document.getElementById('input14').value
	}
	if (document.getElementById('input15').checked)
	{
		CrashInSelf = document.getElementById('input15').value
	}
	//console.log("CrashInSelf = " + CrashInSelf);

	setsnakeSpeed1 = Number(document.getElementById("input3").value);
	for(i = 0; i < snakeSpeed1.length; i++)
	{
		if(setsnakeSpeed1 === snakeSpeed1[i])
		{
			setsnakeSpeed2 = snakeSpeed2[i];
		}
	}
	
	wallColor = document.getElementById("input9").value;
	context.fillStyle = wallColor;

	snakeColor = document.getElementById("input10").value;
	context.fillStyle = snakeColor;
	
	appleColor = document.getElementById("input11").value;
	context.fillStyle = appleColor;
}

// listen to keyboard events to move the snake
document.addEventListener('keydown', function(e) {
  // prevent snake from backtracking on itself by checking that it's
  // not already moving on the same axis (pressing left while moving
  // left won't do anything, and pressing right while moving left
  // shouldn't let you collide with your own body)

	if(start === "no") {
		// left arrow key
		if (e.which === 37 && snake.dx === 0) {
			snake.dx = -speed;
			snake.dy = 0;
		}
		// up arrow key
		else if (e.which === 38 && snake.dy === 0) {
			snake.dy = -speed;
			snake.dx = 0;
		}
		// right arrow key
		else if (e.which === 39 && snake.dx === 0) {
			snake.dx = speed;
			snake.dy = 0;
		}
		// down arrow key
		else if (e.which === 40 && snake.dy === 0) {
			snake.dy = speed;
			snake.dx = 0;
		}
	}
});

// start the game
requestAnimationFrame(loop);
