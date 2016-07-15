$(function(){
	show();
});
function show(){
	$(".jobs li").click(function(){
		if($(this).next(".xq").css("display")=="none"){
			$(this).next(".xq").css({"display":"block"});
		}else{
			$(this).next(".xq").css({"display":"none"});
		}
	});
}
