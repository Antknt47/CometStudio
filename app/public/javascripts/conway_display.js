/* global $*/
var c=document.getElementById("conway");
var ctx=c.getContext("2d");

var ctnWidth = $("#conway").width();
var ctnHeight = $("#conway").height();

var pixSize = 15;

var pixWidth = parseInt((ctnWidth - 6) / pixSize);
var pixHeight = parseInt((ctnHeight - 6) / pixSize);
var img = new Image();   // 创建一个<img>元素
img.src = '/images/slime.bmp'; // 设置图片源地址


/* boarder line */

console.log(pixWidth);
console.log(pixHeight);


var drawBG = function()
{

    for(var i=1; i<pixWidth; ++i)
    {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#666666';
        
        var x = (ctnWidth - pixWidth*pixSize)/2 + 0.5 + pixSize * i;
        ctx.moveTo(x, (ctnHeight- pixHeight*pixSize)/2 - 1);
        ctx.lineTo(x, pixHeight * pixSize + 1 + ((ctnHeight- pixHeight*pixSize)/2 -1));
        ctx.stroke();
    }
    
    for(i=1; i<pixHeight; ++i)
    {
        ctx.beginPath();
        ctx.lineWidth = 1;
        var y = (ctnHeight - pixHeight*pixSize)/2 + pixSize * i;
        ctx.moveTo((ctnWidth- pixWidth*pixSize)/2 - 1, y);
        ctx.lineTo(pixWidth * pixSize + 1 + ((ctnWidth- pixWidth*pixSize)/2 -1), y);
        ctx.stroke();
    }
    ctx.beginPath();
    ctx.strokeStyle = '#000000';
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeRect( (ctnWidth - pixWidth*pixSize)/2, (ctnHeight- pixHeight*pixSize)/2 - 0.5, pixWidth * pixSize + 1, pixHeight * pixSize + 1); 
    

}

drawBG();

var count=0;

var drawSlime = function(x,y)
{
    ctx.drawImage(img, (ctnWidth - pixWidth*pixSize)/2 + 1 +pixSize*x, (ctnHeight- pixHeight*pixSize)/2 + 0.5 +pixSize*y);
};

var slimes = new Array(pixHeight);
for(var i=0; i<pixHeight; ++i)
{
    slimes[i] = new Array(pixWidth);
    for(var j=0; j<pixWidth; ++j)
    {
        slimes[i][j] = false;
    }
}
slimes[3][2] = true;
slimes[3][3] = true;
slimes[3][4] = true;



var getStat = function(slimes, x, y)
{
    var slimeCount = 0;
    var around = [
            [-1, -1],   // ↖
            [-1,  0],   // ↑
            [-1,  1],   // ↗
            [ 0,  1],   // →
            [ 1,  1],   // ↘
            [ 1,  0],   // ↓
            [ 1, -1],   // ↙
            [ 0, -1],   // ←
        ];
    for(var i=0; i<8; ++i)
    {
        var rX = x + around[i][1];
        var rY = y + around[i][0];
        
        if(rX<0 || rX>=pixWidth || rY<0 || rY>=pixHeight )
        {
            continue;
        }
        
        if(slimes[rY][rX] == true)
        {
            ++slimeCount;
        }

    }
    return slimeCount;
};


var redraw = function()
{
    ctx.clearRect(0,0, ctnWidth, ctnHeight);
    drawBG();
    for(var i=0; i<pixHeight; ++i)
    {
        for(var j=0; j<pixWidth; ++j)
        {
            // draw
            if(slimes[i][j] == true)
            {
                drawSlime(j, i);
            }
        }
    }

};

var tick = 0;
var speed = 1;
var start = false;
$(img).on('load', function() {
    
    redraw();

    setInterval(function(){

        if(tick % parseInt((50/speed)) == 0 && start)
        {
            // copy slimes
            var oldSlimes = new Array(pixHeight);
            for(var i=0; i<pixHeight; ++i)
            {
                oldSlimes[i] = new Array(pixWidth);
                for(var j=0; j<pixWidth; ++j)
                {
                    oldSlimes[i][j] = slimes[i][j];
                }
            }
            
            for(var i=0; i<pixHeight; ++i)
            {
                for(var j=0; j<pixWidth; ++j)
                {
                    // stat ?
                    
                    var slimeCount = getStat(oldSlimes, j, i);
                    if(oldSlimes[i][j] == true)
                    {
                        if(slimeCount < 2 || slimeCount > 3)
                        {
                            slimes[i][j] = false;// die
                        }
                        else
                        {
                            slimes[i][j] = true;// survival
                        }
                    }
                    else
                    {
                        if(slimeCount == 3)
                        {
                            slimes[i][j] = true;// born
                        }
                        else
                        {
                            slimes[i][j] = false;// die
                        }
                    }
                }
            }
        }
        redraw();
        ++tick;
    },20);
});

document.getElementById('conway').addEventListener('click',function(evt){
    
    var x = evt.clientX - $('#conway').offset().left;
    var y = evt.clientY - $('#conway').offset().top;
    
    var px = parseInt((x - ((ctnWidth - pixWidth*pixSize)/2 + 1)) / pixSize);
    var py = parseInt((y - (ctnHeight- pixHeight*pixSize)/2 - 0.5) / pixSize);

    
    slimes[py][px] = !(slimes[py][px]);
    redraw();
},false);

$("#speed").change(function(){

    speed = $("#speed").val();
});

$("#startstop").click(function()
{
    if(start)
    {
        $("#startstop").removeClass("btn-danger");
        $("#startstop").addClass("btn-success");
        $("#playicon").removeClass("glyphicon-pause");
        $("#playicon").addClass("glyphicon-play");
        start = !start;
    }
    else
    {
        $("#startstop").removeClass("btn-success");
        $("#startstop").addClass("btn-danger");
        $("#playicon").removeClass("glyphicon-play");
        $("#playicon").addClass("glyphicon-pause");
        start = !start;
    }
});

$("#clearArea").click(function()
{
    for(var i=0; i<pixHeight; ++i)
    {
        for(var j=0; j<pixWidth; ++j)
        {
            slimes[i][j] = false;
        }
    }
});