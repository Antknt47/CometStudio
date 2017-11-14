/*global $*/
function roll()
{
    var min = parseInt(document.getElementById("min").value);
    var max = parseInt(document.getElementById("max").value);

    if(isNaN(min) || isNaN(max) || min > max)
    {
        document.getElementById("result").value= '蚂蚁对你的输入很失望';
    }
    else
    {
        var r = Math.floor(Math.random() * (max - min + 1) + min);
    document.getElementById("result").value= r;
    }
    $("#result").animate({textIndent: '10px'}, 100, 'swing');
    $("#result").animate({textIndent: '0'}, 100, 'swing');
}

