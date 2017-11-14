var xinm = new Array();
xinm[0] = "白金香"
xinm[1] = "白应梅"
xinm[2] = "柏仁燕"
xinm[3] = "包颜琳"
xinm[4] = "鲍学梅"
xinm[5] = "鲍  颖"
xinm[6] = "站长素材"
xinm[7] = "蔡  艳"
xinm[8] = "蔡  玉"
xinm[9] = "曹发敏"

var phone = new Array();
phone[0] = "1"
phone[1] = "2"
phone[2] = "3"
phone[4] = "4"
phone[5] = "5"
phone[6] = "6"
phone[7] = "7"
phone[8] = "8"
phone[9] = "9"
phone[10] = "10"
phone[11] = "11"
phone[12] = "12"
phone[13] = "13"
phone[14] = "14"
phone[15] = "15"
phone[16] = "16"

var nametxt = $('.name');
var phonetxt = $('.phone');
var pcount = 400;//xinm.length-1;//参加人数
var runing = true;
var td = 10;//内定中奖,从最小奖开始，共10个名额
var num = 0;
var t;
//开始停止
function start() {
	if (runing) {
		runing = false;
		$('#btntxt').removeClass('start').addClass('stop');
		$('#btntxt').html('停止');
		startNum()
	} else {
		runing = true;
		$('#btntxt').removeClass('stop').addClass('start');
		$('#btntxt').html('开始');
		stop();
		//zd();//内定中奖
	}
}
//循环参加名单
function startNum() {
	num = Math.floor(Math.random() * pcount);
	nametxt.html(xinm[num]);
	phonetxt.html(num);
	t = setTimeout(startNum, 0);
}
//停止跳动
function stop() {
	pcount = 400;
	clearInterval(t);
	t = 0;
}
//从一等奖开始指定前3名
function zd() {
	if(td <= 3){
		if (td == 1) {
			nametxt.html('周一一');
			phonetxt.html('15112345678');
			$('.list').prepend("<p>"+td+' '+"周一一 -- 15112345678</p>");
		}
		if (td == 2) {
			nametxt.html('李二二');
			phonetxt.html('151000000000');
			$('.list').prepend("<p>"+td+' '+"李二二 -- 151000000000</p>");
		}
		if (td == 3) {
			nametxt.html('张三三');
			phonetxt.html('1511111111');
			$('.list').prepend("<p>"+td+' '+"张三三 -- 1511111111</p>");
		}
	}else if(td > 3){
		//打印中奖者名单
		$('.list').prepend("<p>"+td+' '+xinm[num]+" -- "+phone[num]+"</p>");
		if(pcount <= 0){
			alert("投票结束");
		}
		//将已中奖者从数组中"删除",防止二次中奖
		xinm.splice($.inArray(xinm[num], xinm), 1);
		phone.splice($.inArray(phone[num], phone), 1);
	}
	td = td - 1;
}
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
		var num_arr = (result+'').split('');
		$(".num").each(function(index){
			var _num = $(this);
			setTimeout(function(){
				_num.animate({ 
					backgroundPositionY: (u*60) - (u*num_arr[index])
				},{
					duration: 6000+index*3000,
					easing: "easeInOutCirc",
					complete: function(){
						if(index==3) isBegin = false;
					}
				});
			}, index * 300);
		});
	});	
});