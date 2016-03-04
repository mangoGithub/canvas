var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;
var RADIUS = 8;
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;

//时间的改造
var endTime = new Date();
endTime.setTime(endTime.getTime()+3600*1000);
var curTime = 0;

//动态小球
var balls = [];//存储生成的小球
const colors = ["#33b5e5","#0099cc","#aa66cc","#9933cc","#99cc00","#669900","#ffbb33","#ff8800","#ff4444","#cc0000"]

window.onload = function(){
	WINDOW_WIDTH = document.body.clientWidth-100;
	WINDOW_HEIGHT = document.documentElement.clientHeight-100;
	
	MARGIN_LEFT = Math.round(WINDOW_WIDTH/10);
	RADIUS = Math.round(WINDOW_WIDTH*4/5/108)-1;
	MARGIN_TOP = Math.round(WINDOW_HEIGHT/5);
	
	var canvas = document.getElementById("canvas");
	
	canvas.width=WINDOW_WIDTH;
	canvas.height=WINDOW_HEIGHT;
	
	if( canvas.getContext("2d")){
		var context = canvas.getContext("2d");
	}else{
		alert("当前浏览器不支持canvas，请更换浏览器然后再试试！");
	}
	curTime = getCurTime();
	//console.log(curTime)
	setInterval(function(){
		render(context);//负责绘制小球
		update();//负责数据的改变
	},50);
	
}
function getCurTime(){
	var cur = new Date();
	var ret = endTime.getTime() - cur.getTime();
	ret = Math.round( ret/1000);
	
	return ret >=0 ? ret : 0;
}

function update(){
	//1，时间的变化 2，产生小球的运动
	var nextShowTimeSeconds = getCurTime();
	
	var nextHours = parseInt(nextShowTimeSeconds/3600);
	var nextMinutes = parseInt((nextShowTimeSeconds-nextHours*3600)/60);
	var nextSeconds = nextShowTimeSeconds%60;
	
	var curhours =parseInt(curTime/3600);
	var curminutes = parseInt((curTime-curhours*3600)/60);
	var curseconds = curTime%60;
	
	if(nextSeconds != curseconds){
		
		//判断时，个位数字和十位数字的变化
		if(parseInt(curhours/10) != parseInt(nextHours/10)){
			addBalls(MARGIN_LEFT+0,MARGIN_TOP,parseInt(nextHours/10));	
		}
		if(parseInt(curhours%10) != parseInt(nextHours%10)){
			addBalls(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(nextHours/10));	
		}
		//判断分
		if(parseInt(curminutes/10) != parseInt(nextMinutes/10)){
			addBalls(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(nextMinutes/10));	
		}
		if(parseInt(curminutes%10) != parseInt(nextMinutes%10)){
			addBalls(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(nextMinutes/10));	
		}
		//判断秒
		if(parseInt(curseconds/10) != parseInt(nextSeconds/10)){
			addBalls(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(nextSeconds/10));	
		}
		if(parseInt(curseconds%10) != parseInt(nextSeconds%10)){
			addBalls(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(nextSeconds/10));	
		}
		
		curTime = nextShowTimeSeconds;//改变时间
	}
	//
	updateBalls();
	//console.log(balls.length);
}
//更新小球,运动
function updateBalls(){
	for(var i=0; i<balls.length; i++){
		balls[i].x += balls[i].vx;	
		balls[i].y += balls[i].vy;
		balls[i].vy += balls[i].g;
		
		if(balls[i].y >= WINDOW_HEIGHT-RADIUS){
			balls[i].y = WINDOW_HEIGHT-RADIUS;
			balls[i].vy = - balls[i].vy*0.75;
		}
	}
	//删除小球 ,遍历看看小球在不在画布内
	var cnt = 0;
	for(var i=0; i<balls.length; i++){
		if( balls[i].x + RADIUS >0 && balls[i].x - RADIUS < WINDOW_WIDTH){
			balls[cnt++] = balls[i];
		}
	}
	while( balls.length > Math.min(300,cnt)){
		balls.pop();	
	}
	
}
//运动小球的创建
function addBalls(x,y,num){
	for(var i = 0 ; i< digit[num].length; i++){
		for(var j = 0 ; j< digit[num][i].length; j++){
			if( digit[num][i][j] == 1){
				var aBall = {
					x:x+j*2*(RADIUS+1)+	(RADIUS+1),
					y:y+i*2*(RADIUS+1)+	(RADIUS+1),
					g:1.5+Math.random(),
					vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,
					vy:-5,
					color:colors[Math.floor(Math.random()*colors.length)]
				}
				balls.push(aBall);
			}	
		}
	}
}
function render(cxt){
	cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
	//刷新
	
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
	/*绘制运动小球*/
	for( var i = 0; i< balls.length; i++){
		cxt.fillStyle= balls[i].color;
		
		cxt.beginPath();
		cxt.arc(balls[i].x , balls[i].y , RADIUS , 0, 2*Math.PI ,true);
		cxt.closePath();
		
		cxt.fill();
	}
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