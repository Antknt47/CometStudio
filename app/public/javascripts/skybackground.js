/* global $ */

function DateToLight(dateValue)
{
    var hour = dateValue.getHours();
    
    if(hour >= 8 && hour < 16)
    {
        return 100;
    }
    else if(hour >= 20 || hour < 4)
    {
        return 0;
    }
    else if(hour >= 4 && hour < 8)
    {
        return (hour - 4) * 25; 
    }
    else
    {
        return (20 - hour) * 25;
    }
}


// this value for debug
var oldColorLightness = -1;

function secClock()
{
    // fresh time
    var dateValue = new Date();
    
    // calculate lightness
    var lightness = DateToLight(dateValue);
    var colorLightness = lightness / 100 * 59 + 15;
    $('body').css('background-color', 'hsl(205, 61%, ' + colorLightness.toString() + '%)');
    
    // debug
    if(oldColorLightness != colorLightness)
    {
        console.log("oldColorLightness: " + oldColorLightness);
        console.log('colorLightness: ' + colorLightness);
        console.log(dateValue.toLocaleTimeString());
        oldColorLightness = colorLightness;
    }


}
secClock();

var intv=self.setInterval("secClock()",1000);

document.addEventListener('DOMContentLoaded', function () {
  particleground(document.getElementById('particles'), {
    dotColor: '#ffffff',
    lineColor: '#ffffff',
    density: 10000
    
  });
  var intro = document.getElementById('intro');
  intro.style.marginTop = - intro.offsetHeight / 2 + 'px';
}, false);
