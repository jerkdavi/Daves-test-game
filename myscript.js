//Clears all localStorage
localStorage.clear();

document.getElementById("overlay1").style.display = "block";
heading = "Are you ready to start the game?\n\nClick on the screen to start the game!";

document.getElementById("overlay2").style.display = "none";
document.getElementById("overlay3").style.display = "none";
document.getElementById("overlay4").style.display = "none";

document.getElementById("h1").style.cssText = "margin-top:200px;color:lightblue;font-size:30px;";
document.getElementById("h2").style.cssText = "margin-top:150px;color:lightgreen;font-size:22px;";
document.getElementById("h3").style.cssText = "margin-top:40px;color:lightgreen;font-size:20px;";
document.getElementById("h4").style.cssText = "margin-top:200px;color:lightblue;font-size:30px;";

document.getElementById("button1").style.cssText = "float:left;margin-top:2px;margin-left:4px";
document.getElementById("button2").style.cssText = "margin-top:100px;margin-left:200px";
document.getElementById("button3").style.cssText = "margin-left:100px";
document.getElementById("button4").style.cssText = "margin-left:51px;";
document.getElementById("button5").style.cssText = "margin-left:51px;";
document.getElementById("button6").style.cssText = "margin-left:5px;";
document.getElementById("button7").style.cssText = "margin-left:43px;";
document.getElementById("button10").style.cssText = "margin-left:25px";
document.getElementById("button11").style.cssText = "margin-left:0px";

//Calls function start
start();
function start()
{
	//Create the map
	var maps1 = [];
	maps1[0] = "Room1";
	maps1[1] = "Room2";
	maps1[2] = "Room3";
	maps1[3] = "Room4";
	maps1[4] = "Room5";
	maps1[5] = "Room6";
	maps1[6] = "Room7";
	maps1[7] = "Room8";
	maps1[8] = "Room9";
	
	//Create the images
	var images1 = [];
	images1[0] = "New_maps/room001.png";
	images1[1] = "New_maps/room002.png";
	images1[2] = "New_maps/room003.png";
	images1[3] = "New_maps/room004.png";
	images1[4] = "New_maps/room005.png";
	images1[5] = "New_maps/room006.png";
	images1[6] = "New_maps/room007.png";
	images1[7] = "New_maps/room008.png";
	images1[8] = "New_maps/room009.png";
	
	var images2 = [];
	images2[0] = "New_maps/empty.png";
	images2[1] = "New_maps/empty.png";
	images2[2] = "New_maps/empty.png";
	images2[3] = "New_maps/empty.png";
	images2[4] = "New_maps/room005.png";
	images2[5] = "New_maps/empty.png";
	images2[6] = "New_maps/empty.png";
	images2[7] = "New_maps/empty.png";
	images2[8] = "New_maps/empty.png";
	
	//compass.src = "New_maps/compass001.png";
	
	//Create the objects
	var objects1 = [];
	objects1[0] = ["key1"];
	objects1[1] = ["key2"];
	objects1[2] = ["key3"];
	objects1[3] = ["key4"];
	objects1[4] = ["key5"];
	objects1[5] = ["key6"];
	objects1[6] = ["key7"];
	objects1[7] = ["key8"];
	objects1[8] = ["key9"];
	
	//Create the progress bar
	var progress1 = [];
	progress1[0] = "white";
	progress1[1] = "white";
	progress1[2] = "white";
	progress1[3] = "white";
	progress1[4] = "white";
	progress1[5] = "white";
	progress1[6] = "white";
	progress1[7] = "white";
	progress1[8] = "white";
	
	var counter1;
	var counter2;
	
	var progCount = 0;
	var chkProg = 0;
	var inventory1 = [];
	var taken = "no";
	var dropped = "no";
	var takeall = [];
	var dropall = [];
	
	var temp1 = "";
	var temp2 = "";
	
	//Set the player's start location
	var mapLocation = 4;
	
	//Initialize the player's input
	var playersInput = "";
	
	//Initialize the gameMessage
	var gameMessage = "";
	
	//Create an array of actions the game understands
	//and a variable to store the current action
	var actionsIKnow = ["help", "diary", "clrdiary", "reset", "look", "take", "drop", "goal", "!!!admtake", "!!!admdrop", "!!!admlook", "!!!admup", "!!!admdown", "inventory", "north", "south", "east", "west"];
	
	var action = "";
	var chkAction = "";
	var origAction = "";
	var countOrigAction = 0;
	var commands = [];
	var chkcommands = 0;
	var selection = "";
	var prevSelection = "";
	var ifTake = "no";
	var ifDrop = "no";
	
	//The input and output fields
	//var output = document.querySelector("#output");
	var input = document.querySelector("#input");
	document.getElementById("input").style.display = "none";
	document.getElementById("button1").style.display = "none";
	
	//The button (mouse left-click) events
	var button1 = document.querySelector("#button1");
	button1.style.cursor = "pointer";
	button1.addEventListener("click", clickHandler, false);
	
	var button2 = document.querySelector("#button2");
	button2.style.cursor = "pointer";
	button2.addEventListener("click", locationReload, false);
	
	var button3 = document.querySelector("#button3");
	button3.style.cursor = "pointer";
	button3.addEventListener("click", locationAbandon, false);
	
	var button4 = document.querySelector("#button4");
	button4.style.cursor = "pointer";
	button4.addEventListener("click", () => {
		input.value = "north"
		clickHandler();
	});
	
	var button5 = document.querySelector("#button5");
	button5.style.cursor = "pointer";
	button5.addEventListener("click", () => {
		input.value = "south"
		clickHandler();
	});
	
	var button6 = document.querySelector("#button6");
	button6.style.cursor = "pointer";
	button6.addEventListener("click", () => {
		input.value = "west"
		clickHandler();
	});
	
	var button7 = document.querySelector("#button7");
	button7.style.cursor = "pointer";
	button7.addEventListener("click", () => {
		input.value = "east"
		clickHandler();
	});
	
	var button8 = document.querySelector("#button8");
	button8.style.cursor = "pointer";
	button8.addEventListener("click", () => {
		input.value = "take all"
		clickHandler();
	});
	
	var button9 = document.querySelector("#button9");
	button9.style.cursor = "pointer";
	button9.addEventListener("click", () => {
		input.value = "drop all"
		clickHandler();
	});
	
	var button10 = document.querySelector("#button10");
	button10.style.cursor = "pointer";
	button10.addEventListener("click", () => {
		input.value = "take"
		if(selection.length > 0)
		{
			input.value += " " + selection;
			ifTake = "yes"
			Select1();
		}
		clickHandler();
	});
	
	var button11 = document.querySelector("#button11");
	button11.style.cursor = "pointer";
	button11.addEventListener("click", () => {
		input.value = "drop"
		if(selection.length > 0)
		{
			input.value += " " + selection;
			ifDrop = "yes"
			Select2();
		}
		clickHandler();
	});
	
	var button12 = document.querySelector("#button12");
	button12.style.cursor = "pointer";
	button12.addEventListener("click", () => {
		document.getElementById("input").style.display = "block";
		document.getElementById("button1").style.display = "block";
		render();
	});
	
	var button13 = document.querySelector("#button13");
	button13.style.cursor = "pointer";
	button13.addEventListener("click", () => {
		document.getElementById("input").style.display = "none";
		document.getElementById("button1").style.display = "none";
		render();
	});
	
	var button14 = document.querySelector("#button14");
	button14.style.cursor = "pointer";
	button14.addEventListener("click", () => {
		input.value = "look"
		clickHandler();
	});
	
	var button15 = document.querySelector("#button15");
	button15.style.cursor = "pointer";
	button15.addEventListener("click", () => {
		input.value = "inventory"
		clickHandler();
	});
	
	var button16 = document.querySelector("#button16");
	button16.style.cursor = "pointer";
	button16.addEventListener("click", () => {
		input.value = "help"
		clickHandler();
	});
	
	var button17 = document.querySelector("#button17");
	button17.style.cursor = "pointer";
	button17.addEventListener("click", () => {
		input.value = "goal"
		clickHandler();
	});
	
	//Select room objects
	var clickRoomObj1 = document.querySelector("#roomObj1");
	clickRoomObj1.style.cursor = "pointer";
	clickRoomObj1.addEventListener("click", () => {
		Select1("roomObj1", 0);
	});
	
	var clickRoomObj2 = document.querySelector("#roomObj2");
	clickRoomObj2.style.cursor = "pointer";
	clickRoomObj2.addEventListener("click", () => {
		Select1("roomObj2", 1);
	});
	
	var clickRoomObj3 = document.querySelector("#roomObj3");
	clickRoomObj3.style.cursor = "pointer";
	clickRoomObj3.addEventListener("click", () => {
		Select1("roomObj3", 2);
	});
	
	var clickRoomObj4 = document.querySelector("#roomObj4");
	clickRoomObj4.style.cursor = "pointer";
	clickRoomObj4.addEventListener("click", () => {
		Select1("roomObj4", 3);
	});
	
	var clickRoomObj5 = document.querySelector("#roomObj5");
	clickRoomObj5.style.cursor = "pointer";
	clickRoomObj5.addEventListener("click", () => {
		Select1("roomObj5", 4);
	});
	
	var clickRoomObj6 = document.querySelector("#roomObj6");
	clickRoomObj6.style.cursor = "pointer";
	clickRoomObj6.addEventListener("click", () => {
		Select1("roomObj6", 5);
	});
	
	var clickRoomObj7 = document.querySelector("#roomObj7");
	clickRoomObj7.style.cursor = "pointer";
	clickRoomObj7.addEventListener("click", () => {
		Select1("roomObj7", 6);
	});
	
	var clickRoomObj8 = document.querySelector("#roomObj8");
	clickRoomObj8.style.cursor = "pointer";
	clickRoomObj8.addEventListener("click", () => {
		Select1("roomObj8", 7);
	});
	
	var clickRoomObj9 = document.querySelector("#roomObj9");
	clickRoomObj9.style.cursor = "pointer";
	clickRoomObj9.addEventListener("click", () => {
		Select1("roomObj9", 8);
	});
	
	//Select inventory objects
	var clickInvObj1 = document.querySelector("#invObj1");
	clickInvObj1.style.cursor = "pointer";
	clickInvObj1.addEventListener("click", () => {
		Select2("invObj1", 0);
	});
	
	var clickInvObj2 = document.querySelector("#invObj2");
	clickInvObj2.style.cursor = "pointer";
	clickInvObj2.addEventListener("click", () => {
		Select2("invObj2", 1);
	});
	
	var clickInvObj3 = document.querySelector("#invObj3");
	clickInvObj3.style.cursor = "pointer";
	clickInvObj3.addEventListener("click", () => {
		Select2("invObj3", 2);
	});
	
	var clickInvObj4 = document.querySelector("#invObj4");
	clickInvObj4.style.cursor = "pointer";
	clickInvObj4.addEventListener("click", () => {
		Select2("invObj4", 3);
	});
	
	var clickInvObj5 = document.querySelector("#invObj5");
	clickInvObj5.style.cursor = "pointer";
	clickInvObj5.addEventListener("click", () => {
		Select2("invObj5", 4);
	});
	
	var clickInvObj6 = document.querySelector("#invObj6");
	clickInvObj6.style.cursor = "pointer";
	clickInvObj6.addEventListener("click", () => {
		Select2("invObj6", 5);
	});
	
	var clickInvObj7 = document.querySelector("#invObj7");
	clickInvObj7.style.cursor = "pointer";
	clickInvObj7.addEventListener("click", () => {
		Select2("invObj7", 6);
	});
	
	var clickInvObj8 = document.querySelector("#invObj8");
	clickInvObj8.style.cursor = "pointer";
	clickInvObj8.addEventListener("click", () => {
		Select2("invObj8", 7);
	});
	
	var clickInvObj9 = document.querySelector("#invObj9");
	clickInvObj9.style.cursor = "pointer";
	clickInvObj9.addEventListener("click", () => {
		Select2("invObj9", 8);
	});
	
	//Main div button (mouse left-click) event
	var Div1 = document.querySelector("#overlay1");
	Div1.style.cursor = "pointer";
	Div1.addEventListener("click", firstDiv, false);
	
	var Div2 = document.querySelector("#overlay2");
	Div2.style.cursor = "pointer";
	Div2.addEventListener("click", secondDiv, false);
	
	var Div3 = document.querySelector("#overlay3");
	Div3.style.cursor = "pointer";
	Div3.addEventListener("click", thirdDiv, false);
	
	//Enter key event
	input.addEventListener("keyup", function(event) {
		if (event.keyCode === 13) { clickHandler(); }
	});
	
	//Insert key event
	input.addEventListener("keyup", function(event) {
		if (event.keyCode === 45) { chkCommands(); }
	});
	
	//Delete key event
	input.addEventListener("keyup", function(event) {
		if (event.keyCode === 46) { DeleteOrBackspace(); }
	});
	
	//Backspace key event
	input.addEventListener("keyup", function(event) {
		if (event.keyCode === 8) { DeleteOrBackspace(); }
	});
	
	//Ctrl key event
	input.addEventListener("keyup", function(event) {
		if (event.keyCode === 17) { DeleteOrBackspace(); }
	});
	
	//Shift key event
	input.addEventListener("keyup", function(event) {
		if (event.keyCode === 16) { DeleteOrBackspace(); }
	});
	
	//Up arrow key event
	input.addEventListener("keyup", function(event) {
		if (event.keyCode === 38) {
			input.value = "north"
			clickHandler();
		}
	});
	//Down arrow key event
	input.addEventListener("keyup", function(event) {
		if (event.keyCode === 40) {
			input.value = "south"
			clickHandler();
		}
	});
	//Left arrow key event
	input.addEventListener("keyup", function(event) {
		if (event.keyCode === 37) {
			input.value = "west"
			clickHandler();
		}
	});
	//Right arrow key event
	input.addEventListener("keyup", function(event) {
		if (event.keyCode === 39) {
			input.value = "east"
			clickHandler();
		}
	});
	
	//select for room objects
	function Select1(pass1, pass2)
	{
		if(ifTake === "yes")
		{
			document.getElementById(prevSelection).style.backgroundColor = "white";
		}
		else
		{
			if(selection.length > 0)
			{
				if(prevSelection === pass1)
				{
					document.getElementById(pass1).style.backgroundColor = "white";
					gameMessage = "You unselect " + selection;
					selection = ""
					prevSelection = "";
					render();
				}
				else{
					document.getElementById(prevSelection).style.backgroundColor = "white";
					document.getElementById(pass1).style.backgroundColor = "lightblue";
					selection = objects1[mapLocation][pass2];
					prevSelection = pass1;
					gameMessage = "You select " + selection;
					render();
				}
			}
			else
			{
				document.getElementById(pass1).style.backgroundColor = "lightblue";
				selection = objects1[mapLocation][pass2];
				prevSelection = pass1;
				gameMessage = "You select " + selection;
				render();
			}
		}
	}
	
	//select for inventory objects
	function Select2(pass1, pass2)
	{
		if(ifDrop === "yes")
		{
			document.getElementById(prevSelection).style.backgroundColor = "white";
		}
		else
		{
			if(selection.length > 0)
			{
				if(prevSelection === pass1)
				{
					document.getElementById(pass1).style.backgroundColor = "white";
					gameMessage = "You unselect " + selection;
					selection = ""
					prevSelection = "";
					render();
				}
				else{
					document.getElementById(prevSelection).style.backgroundColor = "white";
					document.getElementById(pass1).style.backgroundColor = "lightblue";
					selection = inventory1[pass2];
					prevSelection = pass1;
					gameMessage = "You select " + selection;
					render();
				}
			}
			else
			{
				document.getElementById(pass1).style.backgroundColor = "lightblue";
				selection = inventory1[pass2];
				prevSelection = pass1;
				gameMessage = "You select " + selection;
				render();
			}
		}
	}
	
	//Display the player's location
	render();
	
	function DeleteOrBackspace()
	{
		action = "";
		chkAction = "";
		origAction = "";
		countOrigAction = 0;
		commands = [];
		chkcommands = 0;
		selection = "";
		prevSelection = "";
		ifTake = "no"
		ifDrop = "no";
	}
	
	function firstDiv()
	{
		document.getElementById("overlay1").style.display = "none";
		document.getElementById("overlay2").style.display = "block";
		heading = "Use arrow keys or buttons to move on the map.\n\nEvery room has a key of its own name inside of it.\n\nGoal of the game is to reverse the keys in opposition to the room names.\n"
		heading += "The one key that can't be opposed must be in your posesion.\n\nType help for help!"
		render();
	}
	function secondDiv()
	{
		document.getElementById("overlay2").style.display = "none";
		heading = "";
		render();
	}
	function thirdDiv()
	{
		document.getElementById("overlay3").style.display = "none";
		heading = "";
		render();
	}
	
	function chkCommands()
	{
		if(countOrigAction === 0)
		{
			origAction = input.value;
			countOrigAction = 1;
		}
		if(origAction.length > 0)
		{
			for(counter1 = 0; counter1 < actionsIKnow.length; counter1++)
			{
				chkAction = actionsIKnow[counter1].slice(0, origAction.length)
				if(origAction === chkAction)
				{
					if(actionsIKnow[counter1] === "!!!admtake"){}
					else if(actionsIKnow[counter1] === "!!!admdrop"){}
					else if(actionsIKnow[counter1] === "!!!admlook"){}
					else if(actionsIKnow[counter1] === "!!!admup"){}
					else if(actionsIKnow[counter1] === "!!!admdown"){}
					else
					{
						commands.push(actionsIKnow[counter1]);
					}
				}
			}
			if(commands.length > 0)
			{
				if(chkcommands === commands.length)
				{
					chkcommands = 0;
				}
				else
				{
					input.value = commands[chkcommands];
					chkcommands += 1;
				}
			}
		}
		else
		{
			countOrigAction = 0;
		}
		//input.focus();
		//input.setSelectionRange(input.value.length, input.value.length);
	}
	
	function locationReload()
	{
		heading = "";
		location.reload();
	}
	
	function locationAbandon()
	{
		heading = "";
		document.getElementById("overlay4").style.display = "none";
		document.getElementById("main").style.display = "none";
	}
	
	function clickHandler()
	{
		action = "";
		chkAction = "";
		origAction = "";
		countOrigAction = 0;
		commands = [];
		chkcommands = 0;
		selection = "";
		prevSelection = "";
		ifTake = "no"
		ifDrop = "no";
		playGame();
	}
	function goal()
	{
		document.getElementById("overlay2").style.display = "block";
		/*gameMessage = "Every room has a key of its own name inside of it.\n";
		gameMessage += "Goal of the game is to reverse the keys in opposition to the room names.\n";
		gameMessage += "The one key that can't be opposed must be in your posesion.\n\n";
		gameMessage += "Type help for help!";
		return gameMessage;*/
	}
	function help()
	{
		document.getElementById("overlay3").style.display = "block";
		heading = "Here is a list of commands you can try:\n\nhelp - returns all available commands\ngoal - returns goal of the game\ndiary - returns all commands you tried\nclrdiary - clears all entries from diary\n"
		heading += "reset - restarts the game\nlook - looks around the room\ntake object name - takes object from room\ntake all - take all objects from room\ndrop object name - drops object in room\n"
		heading += "drop all - drops all objects in room\ninventory - displays contents of your inventory\n\nnorth - tries to go north\nsouth - tries to go south\neast - tries to go east\nwest - tries to go west"
		/*gameMessage = "Every room has a key of its own name inside of it.\n";
		gameMessage += "Goal of the game is to reverse the keys in opposition to the room names.\n";
		gameMessage += "The one key that can't be opposed must be in your posesion.\n\n";
		gameMessage += "Type help for help!";
		return gameMessage;*/
	}
	function playGame()
	{
		//Get the player's input and convert it to lowercase
		playersInput = input.value;
		playersInput = playersInput.toLowerCase();
		//playersInput = playersInput.trim();
		
		var playersInputTrim = playersInput.split(/(\s+)/).filter( function(e) { return e.trim().length > 0; } );
		var playersInputMinus = playersInput.substr(playersInput.indexOf(" ") + 1);
		
		//If no input > converts it to string nothing
		if(playersInputTrim.length === 0) playersInput = "nothing";
		
		//Stores all commands in localStorage and pushes new values without overwriting old values
		var aNumber = !!localStorage.getItem('number') ? JSON.parse(localStorage.getItem('number')) : [];
		var number = document.getElementById('input').value;
		aNumber.push(number);
		localStorage.setItem('number', JSON.stringify(aNumber));
		
		//Reset these variables from the previous turn
		gameMessage = "";
		action = "";
		
		//Figure out the players' action
		for(counter1 = 0; counter1 < actionsIKnow.length; counter1++)
		{
			if(playersInputTrim[0] === actionsIKnow[counter1])
			//if(playersInputTrim.indexOf(actionsIKnow[counter1]) !== -1)
			{
				action = actionsIKnow[counter1];
				if(playersInputTrim[1])
				{
					if(playersInputTrim[0] === "take"){}
					else if(playersInputTrim[0] === "drop"){}
					else if(playersInputTrim[0] === "!!!admup"){}
					else if(playersInputTrim[0] === "!!!admdown"){}
					else
					{
						action = "nonexist";
					}
				}
				if(playersInputTrim[2])
				{
					action = "nonexist";
				}
				break;
			}
		}
		
		//Choose the correct action
		switch(action)
		{
			case " ":
			{
				gameMessage = "Where do you want to go?\n\nType help for help!";
				break;
			}
			case "help":
			{
				help();
				/*gameMessage = "Here is a list of commands you can try:\n\n";
				gameMessage += "help - returns all available commands\n";
				gameMessage += "goal - returns goal of the game\n";
				gameMessage += "diary - returns all commands you tried\n";
				gameMessage += "clrdiary - clears all entries from diary\n";
				gameMessage += "reset - restarts the game\n";
				gameMessage += "look - looks around the room\n";
				gameMessage += "take <object name> - takes object from room\n";
				gameMessage += "take all - take all objects from room\n";
				gameMessage += "drop <object name> - drops object in room\n";
				gameMessage += "drop all - drops all objects in room\n";
				gameMessage += "inventory - displays contents of your inventory\n\n";
				gameMessage += "north - tries to go north\n";
				gameMessage += "south - tries to go south\n";
				gameMessage += "east - tries to go east\n";
				gameMessage += "west - tries to go west\n";*/
				break;
			}
			case "diary":
			{
				//Returns localStorage
				gameMessage = localStorage.getItem('number');
				break;
			}
			case "clrdiary":
			{
				//Clears localStorage
				localStorage.removeItem('number');
				gameMessage = "Diary cleared";
				break;
			}
			case "reset":
			{
				//Reloads window
				locationReload();
				break;
			}
			case "look":
			{
				if(objects1[mapLocation].length != 0 )
					gameMessage = "You can see " + objects1[mapLocation] + " lying on the floor.";
				else
					gameMessage = "There is nothing on the floor";
				break;
			}
			case "goal":
			{
				goal();
				break;
			}
			case "!!!admtake":
			{
				for(counter1 = 0; counter1 < objects1.length; counter1++)
				{
					for(counter2 = 0; counter2 < objects1[counter1].length; counter2++)
					{
						inventory1.push(objects1[counter1][counter2]);
						takeall.push(objects1[counter1][counter2]);
					}
					objects1[counter1].length = 0;
				}
				gameMessage = "You take " +  takeall + " and put it in your inventory.";
				takeall = [];
				takeall.length = 0;
				break;
			}
			case "!!!admup":
			{
				if(playersInputTrim[1] === undefined)
					gameMessage = "Up by how much?";
				else
				{
					if(isNaN(playersInputTrim[1]))
						gameMessage = "Not a number.";
					else
					{
						if(playersInputTrim[1].length > 1)
							gameMessage = "Not a one digit number.";
						else 
						{
							chkProg = progCount + Number(playersInputTrim[1]);
							if(chkProg > 9)
								gameMessage = "Too high value.";
							else
							{
								progCount = chkProg;
								gameMessage = "Progress upped by " + playersInputTrim[1];
							}
						}
					}
				}
				break;
			}
			case "!!!admdown":
			{
				if(playersInputTrim[1] === undefined)
					gameMessage = "Down by how much?";
				else
				{
					if(isNaN(playersInputTrim[1]))
						gameMessage = "Not a number.";
					else
					{
						if(playersInputTrim[1].length > 1)
							gameMessage = "Not a one digit number.";
						else 
						{
							chkProg = progCount - Number(playersInputTrim[1]);
							if(chkProg < 0)
								gameMessage = "Too low value.";
							else
							{
								progCount = chkProg;
								gameMessage = "Progress downed by " + playersInputTrim[1];
							}
						}
					}
				}
				break;
			}
			case "!!!admdrop":
			{
				objects1[0] = ["key9"];
				objects1[1] = ["key8"];
				objects1[2] = ["key7"];
				objects1[3] = ["key6"];
				objects1[4] = ["key5"];
				objects1[5] = ["key4"];
				objects1[6] = ["key3"];
				objects1[7] = ["key2"];
				objects1[8] = ["key1"];
				gameMessage = "All keys, except key5, dropped in the corresponding room.";
				inventory1.length = 0;
				break;
			}
			case "!!!admlook":
			{
				gameMessage = "Room1: " + objects1[0] + "\n";
				gameMessage += "Room2: " + objects1[1] + "\n";
				gameMessage += "Room3: " + objects1[2] + "\n";
				gameMessage += "Room4: " + objects1[3] + "\n";
				gameMessage += "Room5: " + objects1[4] + "\n";
				gameMessage += "Room6: " + objects1[5] + "\n";
				gameMessage += "Room7: " + objects1[6] + "\n";
				gameMessage += "Room8: " + objects1[7] + "\n";
				gameMessage += "Room9: " + objects1[8] + "\n";
				break;
			}
			case "take":
			{
				if(playersInputTrim[1] === undefined)
					gameMessage = "Take what?";
				else
				{
					if(objects1[mapLocation].length === 0 )
						gameMessage = "There are no keys here.";
					else
					{
						if(playersInputTrim[1] === "all")
						{
							for(counter1 = 0; counter1 < objects1[mapLocation].length; counter1++)
							{
								inventory1.push(objects1[mapLocation][counter1]);
								takeall.push(objects1[mapLocation][counter1]);
								taken = "yes";
							}
							objects1[mapLocation].length = 0;
						}
						else
						{
							for(counter1 = 0; counter1 < objects1[mapLocation].length; counter1++)
							{
								if(playersInputTrim[1] === objects1[mapLocation][counter1])
								{
									inventory1.push(objects1[mapLocation][counter1]);
									takeall.push(objects1[mapLocation][counter1]);
									objects1[mapLocation][counter1] = "eraseme";
									taken = "yes";
								}
							}	
						}
						
						for(counter1 = 0; counter1 < objects1[mapLocation].length; counter1++)
						{
							if(objects1[mapLocation][counter1] === "eraseme")
							{
								if(objects1[mapLocation][counter1+1])
								{
									objects1[mapLocation][counter1] = objects1[mapLocation][counter1+1];
									objects1[mapLocation][counter1+1] = "eraseme";
								}
								else
								{
									objects1[mapLocation].length -= 1;
								}
							}
						}
						if (taken === "yes")
							gameMessage = "You take " +  takeall + " and put it in your inventory.";
						if (taken === "no")
							gameMessage = "There is no " + playersInputMinus + " in that location. Maybe there is another key in that location.";
						taken = "no";
						takeall = [];
						takeall.length = 0;
					}
				}
				break;
			}
			case "drop":
			{
				if(playersInputTrim[1] === undefined)
					gameMessage = "Drop what?";
				else
				{
					if(inventory1.length === 0)
						gameMessage = "You've got nothing in your inventory.";
					else
					{
						if(playersInputTrim[1] === "all")
						{
							for(counter1 = 0; counter1 < inventory1.length; counter1++)
							{
								objects1[mapLocation].push(inventory1[counter1]);
								dropall.push(inventory1[counter1]);
								dropped = "yes";
							}
							inventory1.length = 0;
						}
						else
						{
							for(counter1 = 0; counter1 < inventory1.length; counter1++)
							{
								if (playersInputTrim[1] === inventory1[counter1])
								{
									objects1[mapLocation].push(inventory1[counter1]);
									dropall.push(inventory1[counter1]);
									inventory1[counter1] = "eraseme";
									dropped = "yes";
								}
							}
						}
						
						for(counter1 = 0; counter1 < inventory1.length; counter1++)
						{
							if(inventory1[counter1] === "eraseme")
							{
								if(inventory1[counter1+1])
								{
									inventory1[counter1] = inventory1[counter1+1];
									inventory1[counter1+1] = "eraseme";
								}
								else
								{
									inventory1.length -= 1;
								}
							}
						}
						if (dropped === "yes")
							gameMessage = "You drop " + dropall + " and put it on the floor.";
						if (dropped === "no")
							gameMessage = "There is no " + playersInputMinus + " in your inventory.";
						dropped = "no";
						dropall = [];
						dropall.length = 0;
					}
				}							
				break;
			}
			case "inventory":
			{
				if(inventory1.length != 0)
					gameMessage = "Your inventory: " + inventory1;
				else
					gameMessage = "Your inventory is empty.";
				break;
			}
			case "north":
			{
				if(mapLocation >= 3)
				{
					mapLocation -= 3;
					gameMessage = "You went " + action;
				}
				else
					gameMessage = "You can't go " + action + " from here!";
				break;
			}
			case "south":
			{
				if(mapLocation <= 5)
				{
					mapLocation += 3;
					gameMessage = "You went " + action;
				}
				else
					gameMessage = "You can't go " + action + " from here!";
				break;
			}
			case "east":
			{
				if(mapLocation % 3 != 2)
				{
					mapLocation += 1;
					gameMessage = "You went " + action;
				}
				else
					gameMessage = "You can't go " + action + " from here!";
				break;
			}
			case "west":
			{
				if(mapLocation % 3 != 0)
				{
					mapLocation -= 1;
					gameMessage = "You went " + action;
				}
				else
					gameMessage = "You can't go " + action + " from here!";
				break;
			}
			default:
				gameMessage = "I don't understand " + playersInput + "!\n\nType help for help!";
		}
		//Updates map images
		if(mapLocation === 0) images2[0] = "New_maps/room001.png";
		if(mapLocation === 1) images2[1] = "New_maps/room002.png";
		if(mapLocation === 2) images2[2] = "New_maps/room003.png";
		if(mapLocation === 3) images2[3] = "New_maps/room004.png";
		if(mapLocation === 5) images2[5] = "New_maps/room006.png";
		if(mapLocation === 6) images2[6] = "New_maps/room007.png";
		if(mapLocation === 7) images2[7] = "New_maps/room008.png";
		if(mapLocation === 8) images2[8] = "New_maps/room009.png";
		
		if(playersInputTrim[0] != "!!!admup")
		{
			if(playersInputTrim[0] != "!!!admdown")
			{
				progCount = 0;
			}
		}
		for(counter1 = 0; counter1 < maps1.length; counter1 ++)
		{
			if(objects1[0][counter1] === "key9")
				progCount += 1;
			if(objects1[1][counter1] === "key8")
				progCount += 1;
			if(objects1[2][counter1] === "key7")
				progCount += 1;
			if(objects1[3][counter1] === "key6")
				progCount += 1;
			if(inventory1[counter1] === "key5")
				progCount += 1;
			if(objects1[5][counter1] === "key4")
				progCount += 1;
			if(objects1[6][counter1] === "key3")
				progCount += 1;
			if(objects1[7][counter1] === "key2")
				progCount += 1;
			if(objects1[8][counter1] === "key1")
				progCount += 1;
		}
		
		for(counter1 = 0; counter1 < maps1.length; counter1 ++)
		{
			if(counter1 < progCount)
				progress1[counter1] = "green";
			else
				progress1[counter1] = "white";
		}
		
		if(progCount === 9)
		{
			document.getElementById("overlay4").style.display = "block";
			heading = "Congratulation on completing the game!\n\nDo you want to play again?"
		}
		
		//Clears input
		document.getElementById("input").value = "";
		
		//Render the game
		render();
	}

	function render()
	{
		//Render the location
		
		//Display the location - text
		//output.innerHTML = maps1[mapLocation];
		
		//Updates paragraph id - output with - output variable
		document.getElementById('output').innerText = maps1[mapLocation];
		
		//This autopopulates room with objects
		//This autopopulates inventory with objects
		for(counter1 = 0; counter1 < maps1.length; counter1++)
		{
			temp1 = "roomObj" + Number(counter1+1);
			temp2 = "invObj" + Number(counter1+1);
			
			if(objects1[mapLocation][counter1])
			{
				document.getElementById(temp1).innerText = objects1[mapLocation][counter1];
				document.getElementById(temp1).style.display = "block";
				document.getElementById(temp1).style.border = "1px solid gray";
			}
			if(!objects1[mapLocation][counter1])
			{
				document.getElementById(temp1).style.backgroundColor = "white";
				document.getElementById(temp1).style.display = "none";
			}
			if(inventory1[counter1])
			{
				document.getElementById(temp2).innerText = inventory1[counter1];
				document.getElementById(temp2).style.display = "block";
				document.getElementById(temp2).style.border = "1px solid gray";
			}
			if(!inventory1[counter1])
			{
				document.getElementById(temp2).style.backgroundColor = "white";
				document.getElementById(temp2).style.display = "none";
			}
		}
		temp1 = "";
		temp2 = "";
		
		//This images on the map and divs in the progress bar
		for(counter1 = 0; counter1 < maps1.length; counter1++)
		{
			temp1 = "image" + Number(counter1+1);
			temp2 = "div" + Number(counter1+1);
			
			document.getElementById(temp1).src = images2[counter1];
			document.getElementById(temp2).style.backgroundColor = progress1[counter1];
		}
		temp1 = "";
		temp2 = "";
		
		//Display the game message
		//output.innerHTML += "<br><em>" + gameMessage + "</em>";
		
		//Updates paragraph id - game message with - gameMessage variable
		document.getElementById('game message').innerText = gameMessage;
		document.getElementById('h1').innerText = heading;
		document.getElementById('h2').innerText = heading;
		document.getElementById('h3').innerText = heading;
		document.getElementById('h4').innerText = heading;
		
		if(document.getElementById("input").style.display === "block")
		{
			if(input.value.length === 0)
			{
				//Places cursor on the input field
				//input.focus();
				//input.setSelectionRange(0, 0);
			}
		}
	}
}