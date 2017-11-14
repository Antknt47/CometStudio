/* global $ */
$.get("/access_amount", function(data, status){
    $('#access_amount').html("访问总量: " + data['amount']);
});

