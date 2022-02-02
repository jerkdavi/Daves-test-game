var bckgrndColor = "#FFFFFF";
document.getElementById("body").style.backgroundColor = bckgrndColor;

var txtColor = "#000000";
document.getElementById("body").style.color = txtColor;

for(i = 0; i < (document.getElementsByClassName("half2").length); i++)
{
	document.getElementsByClassName("half2")[i].style.backgroundColor = bckgrndColor;
}
