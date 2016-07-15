$(function(){
	nav();
	navf();
	login();
	//jiaoyan();
	reg();
});
function nav(){
	$("header nav a").click(function(){
		$(this).css({"color":"#00ee98","border-top":"2px solid #00ee98"});
		$(this).siblings("a").css({"color":"#fff","border-top":"2px solid #3E3E40"});
		var index=$("nav a").index(this);
		
		$("footer nav a").css({"color":"#fff","border-top":"2px solid #3E3E40"});
		$("footer nav a").eq(index).css({"color":"#00ee98","border-top":"2px solid #00ee98"});
		//$("header nav a").css({"color":"#fff","border-top":"2px solid #3E3E40"});
		//$("header nav a").eq(index).css({"color":"#00ee98","border-top":"2px solid #00ee98"});
	});
}
function navf(){
	$("footer nav a").click(function(){
		$(this).css({"color":"#00ee98","border-top":"2px solid #00ee98"});
		$(this).siblings("a").css({"color":"#fff","border-top":"2px solid #3E3E40"});
		var index=$("footer nav a").index(this);
		//alert(index);
		$("header nav a").css({"color":"#fff","border-top":"2px solid #3E3E40"});
		$("header nav a").eq(index).css({"color":"#00ee98","border-top":"2px solid #00ee98"});
	});
}
function login(){
	$(".about").click(function(){
		if($(".about").html()=="登录"){
			$(".htmleaf-container").css({"display":"block"});
		}
		
	});
	
}

function reg(){
	$(".reg").click(function(){
      alert("注册成功");
	});
}