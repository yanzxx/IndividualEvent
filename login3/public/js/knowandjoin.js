$(function(){
	div();
	//fixed();
});
function div(){
	$(".menu .tabs").hover(function(){
		$(this).css({"color":"#6ad9d3","border-bottom":"2px solid #6ad9d3"});
		$(this).siblings("a").css({"color":"#fff","border-bottom":"none"});
	});
}



//function fixed(){
//	$(parent.window).scroll(function(){
//		$('.menu').css({
//			"top":$(parent.window).scrollTop()
//		});
//	});
//}



//	var oDiv1=Document.getElementById("renshiparking");
//	var oDiv2=Document.getElementById("jiaruparking");
//	var oa1=Document.getElementById("tabs1");
//	var oa2=Document.getElementById("tabs2");
//	oa1.onclick=function a(){
//		oDiv1.style.display="block";
//		oDiv2.style.display="none";
//	}
//	oa2.onclick=function b(){
//		oDiv1.style.display="none";
//		oDiv2.style.display="block";
//	}



