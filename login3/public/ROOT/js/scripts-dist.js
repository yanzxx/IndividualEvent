function toggleFullscreen() {
	document.fullScreenElement && null !== document.fullScreenElement || !document.mozFullScreen && !document.webkitIsFullScreen ? document.documentElement.requestFullScreen ? document.documentElement.requestFullScreen() : document.documentElement.mozRequestFullScreen ? document.documentElement.mozRequestFullScreen() : document.documentElement.webkitRequestFullScreen && document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT) : document.cancelFullScreen ? document.cancelFullScreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitCancelFullScreen && document.webkitCancelFullScreen()
}

function showPanel(what) {
	return ga("send", "pageview", {
		page: what + "/",
		title: "Panel"
	}), $(".panels article").removeClass("show"), $("html, body").animate({
		scrollTop: 0
	}, 0), $("#" + what).addClass("show"), TweenMax.to("body", .1, {
		onComplete: function() {
			$("#" + what + " .msg").addClass("show"), $("#" + what + " .hl6").addClass("show")
		}
	}), TweenMax.to("#" + what, 1, {
		opacity: 1,
		delay: .6
	}), $.fn.image = function(src, f) {
		return this.each(function() {
			var i = new Image;
			i.src = src, i.onload = f, this.appendChild(i)
		})
	}, $(".panels-img").image("assets/img/panels/" + what + ".jpg", function() {
		$(".panels-img").css("display", "block"), TweenMax.to(".panels-img img", .7, {
			autoAlpha: 1
		}), TweenMax.to(".panels-img img", 6, {
			scaleX: 1.1,
			scaleY: 1.1,
			ease: Power4.easeOut
		})
	}), $("body").addClass("panels--open"), $(".nav-ico").off("click"), $(".nav-ico").on("click", closePanel), !1
}

function closePanel() {
	return $(".panels .msg").removeClass("show"), $(".panels .hl6").removeClass("show"), closePanelIn(), $(".nav-ico").off("click"), $(".nav-ico").on("click", openNav), !1
}

function closePanelIn() {
	TweenMax.to(".panels-img img", .5, {
		autoAlpha: 0,
		scaleX: 1.05,
		scaleY: 1.05,
		ease: Expo.easeOut,
		onComplete: function() {
			$(".panels-img img").removeClass("show"), $(".panels-img").css("display", "none"), $(".panels-img img").remove(), $("body").removeClass("panels--open")
		}
	}), TweenMax.to(".panels article", .5, {
		opacity: 0,
		onComplete: function() {
			$(".panels article").removeClass("show")
		}
	}), $(".nav-ico").off("click", closePanel)
}

function openNav() {
	return $("body").hasClass("nav--open") ? $("body").removeClass("nav--open") : $("body").addClass("nav--open"), !1
}
var vtLoaded = !1,
	gotoExplore = !1,
	body = $("body");
$(window).load(function() {
	function explode() {
		return 1 != vtLoaded ? !1 : ($("body").removeClass("page-is-changing animall"), void clearInterval(refreshVTflag))
	}

	function closeIntroInfo() {
		$(".intro-info").addClass("hide")
	}

	function closeIntroDesktopInfo() {
		$(".intro-info-desktop").addClass("hide")
	}

	function changeExpl() {
		gotoExplore = !0
	}

	function adjustWH() {
		ww = window.innerWidth, wh = window.innerHeight
	}

	function msieversion() {
		var ua = window.navigator.userAgent,
			msie = ua.indexOf("MSIE ");
		return (msie > 0 || navigator.userAgent.match(/Trident.*rv\:11\./)) && $("html").addClass("isIE"), !1
	}

	function loadJS(file) {
		var jsElm = document.createElement("script");
		jsElm.type = "application/javascript", jsElm.src = file, document.body.appendChild(jsElm)
	}

	function loadThree() {
		var timestamp = +new Date;
		if (System.support.webgl) {
			$(".quick").addClass("quick--show"), closePanel();
			var ssize = Math.max(window.screen.availHeight, window.screen.availWidth);
			loadJS(ssize > 1024 ? "js/dynamic-load-dist.js?t=" + timestamp : "js/dynamic-load-mobile-deviceorient.js?t=" + timestamp)
		} else $("body").removeClass("animall"), $("body").addClass("noWebgl")
	}

	function activateScrollHeader() {
		function checkScrollMagic() {
			controller.enabled($(window).width() < 701 ? !1 : !0)
		}
		var doit, controller = new ScrollMagic.Controller,
			controllerHeader = new ScrollMagic.Controller;
		new ScrollMagic.Scene({
			duration: 600
		}).setTween(".bg-cont img", {
			opacity: 0,
			y: -20
		}).addTo(controllerHeader), new ScrollMagic.Scene({
			duration: 200
		}).setClassToggle(".bt", "noborder").addTo(controllerHeader), new ScrollMagic.Scene({
			triggerElement: "blockquote",
			duration: "100%",
			offset: -200
		}).setTween("blockquote", {
			y: "30%"
		}).addTo(controllerHeader), new ScrollMagic.Scene({
			triggerElement: "#service1",
			duration: "200%",
			offset: -100
		}).setTween("#service1 .img-float-right_img", {
			y: "10%"
		}).addTo(controller), new ScrollMagic.Scene({
			triggerElement: "#service2",
			duration: "200%",
			offset: -300
		}).setTween("#service2 .img-float-left_img", {
			y: "-30%"
		}).addTo(controller), new ScrollMagic.Scene({
			triggerElement: "#service3",
			duration: "200%",
			offset: -300
		}).setTween("#service3 .img-float-right_img", {
			y: "45%"
		}).addTo(controller), new ScrollMagic.Scene({
			triggerElement: "#service4",
			duration: "200%",
			offset: -300
		}).setTween("#service4 .img-float-left_img", {
			y: "-40%"
		}).addTo(controller);
		window.onresize = function() {
			clearTimeout(doit), doit = setTimeout(checkScrollMagic, 100)
		}, checkScrollMagic()
	}

	function scrollToAnchor(event) {
		return event.preventDefault(), $("html, body").animate({
			scrollTop: $($.attr(this, "href")).offset().top - 120
		}, 500), !1
	}
	$("html, body").animate({
		scrollTop: 0
	}, 0), $(".nav-ico, .cover, .js-openNav").on("click", openNav), $(".intro-info-desktop a").on("click", closeIntroDesktopInfo), $(".intro-info a").on("click", closeIntroInfo), $(".panels-img, .js-close-panel").on("click", closePanel), $("a.round").on("click", scrollToAnchor), activateScrollHeader(), $(".vt-fs").on("touchstart", toggleFullscreen), $(".vt-fs").on("click", toggleFullscreen);
	var sM = $(".apt-main-content");
	if (sM.hasClass("apt-home")) {
		loadThree(), "page-transition" == $(".expl").attr("data-type") && ($(".expl").removeAttr("data-type"), $(".expl").removeAttr("href"));
		var refreshVTflag = setInterval(explode, 200)
	} else $("body").removeClass("animall");
	$(".expl").on("click", changeExpl);
	var doit, ww = window.innerWidth,
		wh = window.innerHeight;
	window.onresize = function() {
		clearTimeout(doit), doit = setTimeout(adjustWH, 100)
	}, adjustWH(), msieversion();
	var firstLoad = !1;
	$("body").on("click", '[data-type="page-transition"]', function(event) {
		event.preventDefault(), $("body").removeClass("exploring"), $("body").removeClass("nav--open"), closePanelIn(), $("body").addClass("animall");
		var newPage = $(this).attr("href");
		firstLoad = !0, TweenMax.to("body", .2, {
			onComplete: function() {
				window.location.href = newPage
			}
		})
	}), activateScrollHeader(), $("body").on("click", '[data-type="popup-video"]', function(event) {
		event.preventDefault(), ga("send", "pageview", {
			page: "/homeVideo/",
			title: "homeVideo"
		});
		var openWhat = $(this).attr("href");
		$.magnificPopup.open({
			closeBtnInside: !0,
			preloader: !1,
			midClick: !0,
			removalDelay: 300,
			mainClass: "mfp-vid",
			items: {
				src: openWhat,
				type: "iframe"
			}
		})
	}), $("body").on("click", '[data-type="page-slide"]', scrollToAnchor)
}), window.onunload = function() {};