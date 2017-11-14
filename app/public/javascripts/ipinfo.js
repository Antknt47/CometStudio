/* global $ */
// just for Traffic Analysis
$.ajax({
	type : "get",
	async:false,
	url : "https://ipinfo.io",
	dataType : "jsonp",

	success : function(ipjson){
		$.post('/access', ipjson);
	},
	error:function(){
		alert('fail');
	}
});

