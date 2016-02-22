var WINOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;
var RADIUS = 8;
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;

const endTime = new Date(2016,02,22,19,47,52);
var curTime = 0;

window.onload = function(){
	var canvas = document.getElementById("canvas");
	canvas.width=WINOW_WIDTH;
	canvas.height=WINDOW_HEIGHT;
	if( canvas.getContext("2d")){
		var context = canvas.getContext("2d");
	}else{
		alert("当前浏览器不支持canvas，请更换浏览器然后再试试！");
	}
	curTime = getCurTime();
	console.log(curTime)
	render(context);
}
function getCurTime(){
	var cur = new Date();
	var ret = endTime.getTime() - cur.getTime();
	ret = Math.round( ret/1000);
	
	return ret >=0 ? ret : 0;
}
function render(cxt){
	var hours =parseInt(curTime/3600);
	var minutes = parseInt((curTime-hours*3600)/60);
	var seconds = curTime%60;
	//console.log(hours);
	
	renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10),cxt);
	renderDigit(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(hours%10),cxt);
	renderDigit(MARGIN_LEFT+30*(RADIUS+1),MARGIN_TOP,10,cxt);
	renderDigit(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(minutes/10),cxt);
	renderDigit(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(minutes%10),cxt);
	renderDigit(MARGIN_LEFT+69*(RADIUS+1),MARGIN_TOP,10,cxt);
	renderDigit(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(seconds/10),cxt);
	renderDigit(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(seconds%10),cxt);
}
function renderDigit(x,y,num,cxt){
	cxt.fillStyle = "rgb(0,102,153)";
	for(var i=0; i<digit[num].length; i++){
		for(var j=0; j<digit[num][i].length; j++){
			if(digit[num][i][j] == 1){
				cxt.beginPath();
				cxt.arc(x+j*2*(RADIUS+1)+(RADIUS+1),y+i*2*(RADIUS+1)+(RADIUS+1),RADIUS,0,2*Math.PI);
				cxt.closePath();
				
				cxt.fill();	
			}
		}
	}
}
/*
	第（i,j）个圆的圆心位置：
	CenterX : x+j*2*(R+1)+(R+1)
	CenterY : y+i*2*(R+1)+(R+1)
*/