
function numRand() {
	var x = 320; //上限
	var y = 1; //下限
	var rand = parseInt(Math.random() * (x - y + 1) + y);
	return rand;
}
var isBegin = false;
$(function(){
	var u = 265;
	$('.btn').click(function(){
		if(isBegin) return false;
		isBegin = true;
		$(".num").css('backgroundPositionY',0);
		var result = numRand();
		$('#res').text('摇奖结果 = '+result);
		var num_tmp = result;
		
		if (result>=100) var num_tmp = "0" + result;
		else if (result<100 && result>9) var num_tmp = "00" + result;
		else if (result < 10) var num_tmp = "000" + result;
		
		var num_arr = (num_tmp+'').split('');
		$(".num").each(function(index){
			//if ($(this)<100)  var _num = 0;
			var _num = $(this);
			setTimeout(function(){
				_num.animate({ 
					backgroundPositionY: (u*60) - (u*num_arr[index])
				},{
					duration: 6000+index*3000,
					easing: "easeInOutCirc",
					complete: function(){
						if(index==1) isBegin = false;
					}
				});
			}, index * 300);
		});
	});	
});