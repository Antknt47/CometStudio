/* global $*/
function cnvs_getCoordinates(e)
{
var x=e.clientX;
var y=e.clientY;
document.getElementById("canvasDebug").value=x + ', ' + y;
}
 
function cnvs_clearCoordinates()
{
document.getElementById("canvasDebug").value="";
}

/*var canvas = document.getElementById("roller");
var ctx = canvas.getContext("2d");
ctx.font = "80px Consolas";
for( i = 0; i < 5; ++i)
{
  ctx.fillText("0", 10+i*49, 75);
}
*/
/*
function createRoller(canvas) {
  var roller = new Object;
  var ctx = canvas.getContext("2d");
  roller.ctx = ctx;
  roller.show = function(){
    this.ctx.font = "80px Consolas";
    this.ctx.fillText("0", 10, 75);
  };
  roller.change = function(newValue){
    this.ctx.fillText(newValue, 10, 75);
  };
  
  return roller;
}

var unit = createRoller(document.getElementById("roller"));
unit.show();
unit.change("1");
*/
	//在页面加载时进行绘图
	window.onload = function() {

		//创建Kinetic舞台, 绑定我们添加的<div>容器
		var stage = new Kinetic.Stage({
			container: "roller", //<div>的id
			width: 600, //创建的舞台宽度
			height: 100 //创建的舞台高度
		});

		//创建Kinetic用户层
		var layer = new Kinetic.Layer();

		//创建一个Kinetic矩形对象
		var rect = new Kinetic.Rect({
			x: 20, //矩形左上角x坐标
			y: -10, //矩形左上角y坐标
			width: 60, //矩形的宽度
			height: 50, //矩形的高度
			fill: "red", //矩形的填充色
			stroke: "black", //矩形边缘线的颜色
			strokeWidth: 4 //矩形边缘线的宽度
		});

		//向用户层中添加上面的矩形
		layer.add(rect);

		//将上面的用户层添加到舞台上
		stage.add(layer);
	};