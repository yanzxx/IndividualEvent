function checkAssets() {
	return $("body").addClass("page-is-changing"), $(".quick").addClass("quick--show"), aT > aL ? void setTimeout("checkAssets();", 300) : (vtLoaded = !0, $(".intro").addClass("intro--vt"), $("body").removeClass("page-is-changing"), $(".quick").addClass("quick--show"), 1 == gotoExplore && moveCamera(), void 0)
}

function msieversion() {
	var ua = window.navigator.userAgent,
		msie = ua.indexOf("MSIE "),
		edge = ua.indexOf("Edge"),
		safari = ua.indexOf("Safari");
	return (msie > 0 || navigator.userAgent.match(/Trident.*rv\:11\./)) && (isie = !0), edge > 0 && (isie = !0), isie = safari > 0 ? !0 : !1, !1
}

function init() {
	var container, cube;
	container = document.getElementById("vt"), camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 1, 1e3), camera.target = new THREE.Vector3(1e3, 0, 0), camera.position.set(480, 0, 0), camera.lookAt(camera.target), scene = new THREE.Scene;
	cube = new THREE.Mesh(new THREE.BoxGeometry(1024, 1024, 1024, 7, 7, 7), new THREE.MeshFaceMaterial(null)), cube.scale.x = -1, cube.name = "cube", cube.x = 0, cube.y = 0, cube.z = 0, scene.add(cube), createRoom("room1"), renderer = new THREE.WebGLRenderer({
		antialias: !0,
		alpha: !0
	}), renderer.setSize(window.innerWidth, window.innerHeight), container.appendChild(renderer.domElement), projector = new THREE.Projector, window.addEventListener("resize", onWindowResize, !1), $(".expl").on("click", moveCamera), TweenMax.to(camera.position, 6, {
		x: 400,
		onUpdate: function() {
			camera.updateProjectionMatrix()
		}
	}), animate()
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight, camera.updateProjectionMatrix(), renderer.setSize(window.innerWidth, window.innerHeight)
}

function onDocumentMouseMove(event) {
	isUserInteracting && (lon = .12 * (onPointerDownPointerX - event.clientX) + onPointerDownLon, lat = .12 * (event.clientY - onPointerDownPointerY) + onPointerDownLat);
	var vector = new THREE.Vector3(event.clientX / window.innerWidth * 2 - 1, 2 * -(event.clientY / window.innerHeight) + 1, .5);
	projector.unprojectVector(vector, camera);
	var ray = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize()),
		intersects = ray.intersectObjects(objects);
	intersects.length > 0 ? (document.body.style.cursor = "pointer", intersected = intersects[0].object, "pop" == intersected.directto.substring(0, 3) && TweenMax.to(intersected.scale, .3, {
		x: 40,
		y: 40,
		overwrite: 0,
		onUpdate: function() {
			camera.updateProjectionMatrix(), TweenMax.to(intersected.scale, .4, {
				x: 34,
				y: 34
			})
		}
	})) : document.body.style.cursor = "auto"
}

function onDocumentMouseDown(event) {
	event.preventDefault(), isUserInteracting = !0, $("#vt").addClass("cursorChange"), onPointerDownPointerX = event.clientX, onPointerDownPointerY = event.clientY, onPointerDownLon = lon, onPointerDownLat = lat;
	var vector = new THREE.Vector3(event.clientX / window.innerWidth * 2 - 1, 2 * -(event.clientY / window.innerHeight) + 1, .5);
	projector.unprojectVector(vector, camera);
	var ray = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize()),
		intersects = ray.intersectObjects(objects);
	intersects.length > 0 && (intersects[0].object.callback(), document.body.style.cursor = "auto"), chillin = !1
}

function onDocumentMouseUp(event) {
	isUserInteracting = !1, $("#vt").removeClass("cursorChange"), setTimeout(function() {
		chillin = !0
	}, 200);
	new THREE.Vector3(event.clientX / window.innerWidth * 2 - 1, 2 * -(event.clientY / window.innerHeight) + 1, .5)
}

function moveCamera() {
	$(".intro").addClass("intro--hide"), TweenMax.to(".intro", .5, {
		autoAlpha: 0,
		delay: .5,
		onComplete: function() {
			$("body").hasClass("exploring") || ($(".intro-info-desktop").removeClass("hide"), $("body").addClass("exploring"))
		}
	}), TweenMax.to(camera.position, 1, {
		x: 0,
		ease: Power4.easeOut,
		onComplete: function() {
			initView = !1, elvt.addEventListener("mousedown", onDocumentMouseDown, !1), elvt.addEventListener("mousemove", onDocumentMouseMove, !1), elvt.addEventListener("mouseup", onDocumentMouseUp, !1), chillin = !0
		}
	}), scene.remove(planePic), camera.updateProjectionMatrix(), TweenMax.to(camera, 2, {
		fov: "70",
		ease: Back.easeOut,
		onUpdate: function() {
			camera.updateProjectionMatrix()
		}
	})
}

function animate() {
	requestAnimationFrame(animate), render()
}

function render() {
	if (1 == initView);
	else if (lat = Math.max(-40, Math.min(40, lat)), phi = THREE.Math.degToRad(90 - lat), theta = THREE.Math.degToRad(lon), gotoX = Math.sin(phi) * Math.cos(theta), gotoY = Math.cos(phi), gotoZ = Math.sin(phi) * Math.sin(theta), 1 == chillin) {
		time = .001 * Date.now();
		TweenMax.to(camera.target, 2, {
			x: gotoX + .01 * Math.sin(1 * time),
			y: gotoY + .01 * Math.sin(2 * time),
			z: gotoZ
		}), camera.lookAt(camera.target)
	} else TweenMax.to(camera.target, .2, {
		x: gotoX,
		y: gotoY,
		z: gotoZ
	}), camera.lookAt(camera.target);
	"room1" == curRoom && (videoA1.readyState === videoA1.HAVE_ENOUGH_DATA && (videoImageContextA1.drawImage(videoA1, 0, 0), videoTextureA1 && (videoTextureA1.needsUpdate = !0)), videoA2.readyState === videoA2.HAVE_ENOUGH_DATA && (videoImageContextA2.drawImage(videoA2, 0, 0), videoTextureA2 && (videoTextureA2.needsUpdate = !0))), "room2" == curRoom && video2A.readyState === video2A.HAVE_ENOUGH_DATA && (videoImageContext2A.drawImage(video2A, 0, 0), videoTexture2A && (videoTexture2A.needsUpdate = !0)), "room3" == curRoom && video3A.readyState === video3A.HAVE_ENOUGH_DATA && (videoImageContext3A.drawImage(video3A, 0, 0), videoTexture3A && (videoTexture3A.needsUpdate = !0)), renderer.render(scene, camera)
}
//创建房间
function createRoom(r) {
	switch (curRoom = r, removeElements(), aT = 0, aL = 0, r) {
		case "room1":
			ga("send", "pageview", {
				page: "/room1/",
				title: "MapRoom"                                    //前往room2箭头的位置
			}), aT = 7, checkAssets(), createIntroPic(), createArrow(203, -180, -392, "room2"), createArrow(-133, -90, -429, "pop1A"), createArrow(445, 0, -145, "pop1B"), createArrow(-363, -50, -262, "pop1C"), loadRoom1Vids(), $(".vt-scene .msg").removeClass("show"), $(".vt-scene .room1").addClass("show");
			break;
		case "room2":
			ga("send", "pageview", {
				page: "/room2/",
				title: "TheHub"                        //前往room1箭头位置控制
			}), aT = 7, checkAssets(), createArrow(40, -143, -452, "room1"), createArrow(-304, -143, -281, "room3"),createArrow(5, -143, 201, "room4"), createArrow(-316, 0, 340, "pop2A"), createArrow(-306, 0, -351, "pop2B"), createArrow(-462, 10, 55, "pop2C"), createArrow(-457, 0, -108, "pop2D"), loadRoom2Vids(), $(".vt-scene .msg").removeClass("show"), $(".vt-scene .room2").addClass("show");
			break;
		case "room3":
			ga("send", "pageview", {
				page: "/room3/",
				title: "BoardRoom"                  //room3前往room2 
			}), aT = 7, checkAssets(), createArrow(-389, -120, 23, "room2"), createArrow(-157, -130, 422, "pop3A"), createArrow(-317, 0, -341, "pop3B"), createArrow(-414, -70, 213, "pop3C"), loadRoom3Vids(), $(".vt-scene .msg").removeClass("show"), $(".vt-scene .room3").addClass("show")
	        break;
	    case "room4":
			ga("send", "pageview", {
				page: "/room4/",
				title: "ExRoom"                  //room4前往room3
			}), aT = 7, checkAssets(), createArrow(-389, -120, 203, "room2"), createArrow(-127, -130, 422, "pop3A"), createArrow(-317, 0, -341, "pop3B"), createArrow(-414, -70, 213, "pop3C"), loadRoom3Vids(), $(".vt-scene .msg").removeClass("show"), $(".vt-scene .room3").addClass("show")
	      
	}
	for (wc = 0; 6 > wc; wc++) scene.children[0].material.materials[wc] = loadTexture("assets-three/" + r + "/wall" + wc + ".jpg", 1)
}

function createArrow(pX, pY, pZ, r) {
	if ("room1" == r || "room2" == r || "room3" == r||"room4" == r) {
		var geometry = new THREE.PlaneGeometry(98, 31);
		geometry.applyMatrix(new THREE.Matrix4);
		var material = new THREE.MeshBasicMaterial({
			map: THREE.ImageUtils.loadTexture("assets-three/img/arrow-go.png"),
			overdraw: !0,
			transparent: !0,
			alphaTest: .9//箭头立体效果
		});
		plane = new THREE.Mesh(geometry, material), plane.material.side = THREE.DoubleSide, plane.position.x = pX, plane.position.y = pY, plane.position.z = pZ;
		var lookAtVector = new THREE.Vector3(0, 0, -1);
		plane.lookAt(lookAtVector)
	} else if ("playvid1" == r || "playvid2" == r || "playvid3" == r|| "playvid4" == r) {
		var geometry = new THREE.PlaneGeometry(34, 34);
		geometry.applyMatrix(new THREE.Matrix4);
		var poiTexture = THREE.ImageUtils.loadTexture("assets-three/img/arrow-video.png"),
			poiMaterial = new THREE.SpriteMaterial({
				map: poiTexture,
				useScreenCoordinates: !1
			}),
			plane = new THREE.Sprite(poiMaterial);
		plane.position.x = pX, plane.position.y = pY, plane.position.z = pZ, plane.scale.set(34, 34, 1)
	} else {
		var geometry = new THREE.PlaneGeometry(34, 34);
		geometry.applyMatrix(new THREE.Matrix4);
		var poiTexture = THREE.ImageUtils.loadTexture("assets-three/img/arrow-poi.png"),
			poiMaterial = new THREE.SpriteMaterial({
				map: poiTexture,
				useScreenCoordinates: !1
			}),
			plane = new THREE.Sprite(poiMaterial);
			//控制位置
		plane.position.x = pX, plane.position.y = pY, plane.position.z = pZ, plane.scale.set(34, 34, 1)
	}
	plane.name = "arrow", plane.directto = r, plane.callback = function() {
		if (onDocumentMouseUp("click"), "playvid1" == this.directto) return playVideoPop("http://vimeo.com/132948057?api=1&player_id=player"), !1;
		if ("pop" == this.directto.substring(0, 3)) return showPanel(this.directto), !1;
		$("body").addClass("page-is-changing");
		var passMe = this.directto;
		setTimeout(function() {
			createRoom(passMe)
		}, 500)
	}, scene.add(plane), objects.push(plane)
}

function playVideoPop(source) {
	$.magnificPopup.open({
		closeBtnInside: !0,
		preloader: !1,
		midClick: !0,
		removalDelay: 300,
		mainClass: "mfp-vid",
		items: {
			src: source,
			type: "iframe"
		},
		callbacks: {
			open: function() {
				elvt.removeEventListener("mousedown", onDocumentMouseDown, !1), elvt.removeEventListener("mousemove", onDocumentMouseMove, !1), elvt.removeEventListener("mouseup", onDocumentMouseUp, !1)
			},
			close: function() {
				elvt.addEventListener("mousedown", onDocumentMouseDown, !1), elvt.addEventListener("mousemove", onDocumentMouseMove, !1), elvt.addEventListener("mouseup", onDocumentMouseUp, !1)
			}
		}
	})
}

function removeElements() {
	var obj, i;
	for (i = scene.children.length - 1; i >= 0; i--) obj = scene.children[i], ("arrow" == obj.name || "vid" == obj.name || "planePic" == obj.name || "light1" == obj.name) && (scene.remove(obj), objects = [])
}

function loadTexture(path, counter) {
	var texture = new THREE.Texture(texture_placeholder),
		material = new THREE.MeshBasicMaterial({
			map: texture,
			overdraw: !0,
			transparent: !0
		}),
		image = new Image;
	return image.src = path, image.onload = function() {
		texture.image = this, texture.needsUpdate = !0, aL++, 1 === counter && (wc += 1)
	}, material
}

function createIntroPic() {
	var light1 = new THREE.AmbientLight(16777215);
	light1.name = "light1", scene.add(light1);
	var geometry = new THREE.PlaneGeometry(192, 120);
	geometry.applyMatrix(new THREE.Matrix4);
	var material = new THREE.MeshPhongMaterial({
		map: THREE.ImageUtils.loadTexture("assets-three/img/bg-dual.jpg"),
		transparent: !0
	});
	planePic = new THREE.Mesh(geometry, material), planePic.material.side = THREE.DoubleSide, planePic.position.set(511.5, 0, 0), planePic.lookAt(camera.position), planePic.name = "planePic", scene.add(planePic)
}

function loadRoom1Vids() {
	videoA1 = document.createElement("video"), isie ? videoA1.src = "assets-three/vid/adam-glass.mp4.mp4?v=0.2" : videoA1.src = "assets-three/vid/adam-glass.webmhd.webm?v=0.2", videoA1.load(), videoA1.muted = !0, videoA1.loop = !0, videoA1.play(), videoImageA1 = document.createElement("canvas"), videoImageA1.width = 240, videoImageA1.height = 240, videoImageContextA1 = videoImageA1.getContext("2d"), videoImageContextA1.fillStyle = "#000000", videoImageContextA1.fillRect(0, 0, videoImageA1.width, videoImageA1.height), videoTextureA1 = new THREE.Texture(videoImageA1), videoTextureA1.minFilter = THREE.LinearFilter, videoTextureA1.magFilter = THREE.LinearFilter;
	var movieMaterialA1 = new THREE.MeshBasicMaterial({
			map: videoTextureA1,
			overdraw: !0,
			side: THREE.DoubleSide
		}),
		movieGeometryA1 = new THREE.PlaneGeometry(240, 240, 4, 4),
		movieScreenA1 = new THREE.Mesh(movieGeometryA1, movieMaterialA1);
	movieScreenA1.position.set(-178, -231, -458), movieScreenA1.scale.x = .43, movieScreenA1.scale.y = .43, movieScreenA1.name = "vid", scene.add(movieScreenA1), aL++, movieScreenA1.lookAt(new THREE.Vector3(0, 0, 0)), videoA2 = document.createElement("video"), isie ? videoA2.src = "assets-three/vid/adam-s.mp4.mp4?v=0.4" : videoA2.src = "assets-three/vid/adam-s.webmhd.webm?v=0.4", videoA2.load(), videoA2.muted = !0, videoA2.loop = !0, videoA2.play(), videoImageA2 = document.createElement("canvas"), videoImageA2.width = 300, videoImageA2.height = 400, videoImageContextA2 = videoImageA2.getContext("2d"), videoImageContextA2.fillStyle = "#000000", videoImageContextA2.fillRect(0, 0, videoImageA2.width, videoImageA2.height), videoTextureA2 = new THREE.Texture(videoImageA2), videoTextureA2.minFilter = THREE.LinearFilter, videoTextureA2.magFilter = THREE.LinearFilter;
	var movieMaterialA2 = new THREE.MeshBasicMaterial({
			map: videoTextureA2,
			overdraw: !0,
			side: THREE.DoubleSide
		}),
		movieGeometryA2 = new THREE.PlaneGeometry(300, 400, 4, 4),
		movieScreenA2 = new THREE.Mesh(movieGeometryA2, movieMaterialA2);
	movieScreenA2.position.set(361, -120, 187), movieScreenA2.scale.x = .52, movieScreenA2.scale.y = .52, movieScreenA2.name = "vid", scene.add(movieScreenA2), aL++, movieScreenA2.lookAt(camera.position), movieScreenA2.lookAt(new THREE.Vector3(0, 0, 0))
}

function loadRoom2Vids() {
	video2A = document.createElement("video"), isie ? video2A.src = "assets-three/vid/vid-creative.mp4.mp4?v=2" : video2A.src = "assets-three/vid/vid-creative.webmhd.webm?v=2", video2A.load(), video2A.muted = !0, video2A.loop = !0, video2A.play(), videoImage2A = document.createElement("canvas"), videoImage2A.width = 350, videoImage2A.height = 600, videoImageContext2A = videoImage2A.getContext("2d"), videoImageContext2A.fillStyle = "#000000", videoImageContext2A.fillRect(0, 0, videoImage2A.width, videoImage2A.height), videoTexture2A = new THREE.Texture(videoImage2A), videoTexture2A.minFilter = THREE.LinearFilter, videoTexture2A.magFilter = THREE.LinearFilter;
	var movieMaterial2A = new THREE.MeshBasicMaterial({
			map: videoTexture2A,
			overdraw: !0,
			side: THREE.DoubleSide
		}),
		movieGeometry2A = new THREE.PlaneGeometry(350, 600, 4, 4),
		movieScreen2A = new THREE.Mesh(movieGeometry2A, movieMaterial2A);
	movieScreen2A.position.set(-221.4, -60, 396.78), movieScreen2A.scale.x = .43, movieScreen2A.scale.y = .43, movieScreen2A.name = "vid", scene.add(movieScreen2A), aL++, movieScreen2A.lookAt(new THREE.Vector3(0, 0, 0))
}

function loadRoom3Vids() {
	video3A = document.createElement("video"), isie ? video3A.src = "assets-three/vid/vid-david.mp4.mp4?v=4" : video3A.src = "assets-three/vid/david-ae.webmhd.webm?v=4", video3A.load(), video3A.muted = !0, video3A.loop = !0, video3A.play(), videoImage3A = document.createElement("canvas"), videoImage3A.width = 240, videoImage3A.height = 380, videoImageContext3A = videoImage3A.getContext("2d"), videoImageContext3A.fillStyle = "#000000", videoImageContext3A.fillRect(0, 0, videoImage3A.width, videoImage3A.height), videoTexture3A = new THREE.Texture(videoImage3A), videoTexture3A.minFilter = THREE.LinearFilter, videoTexture3A.magFilter = THREE.LinearFilter;
	var movieMaterial3A = new THREE.MeshBasicMaterial({
			map: videoTexture3A,
			overdraw: !0,
			side: THREE.DoubleSide
		}),
		movieGeometry3A = new THREE.PlaneGeometry(240, 380, 4, 4),
		movieScreen3A = new THREE.Mesh(movieGeometry3A, movieMaterial3A);
	movieScreen3A.position.set(-400, -170, 134), movieScreen3A.scale.x = .65, movieScreen3A.scale.y = .65, movieScreen3A.name = "vid", scene.add(movieScreen3A), aL++, movieScreen3A.lookAt(new THREE.Vector3(0, 0, 0))
}
var elvt = document.getElementById("vt"),
	camera, scene, renderer, mainCont = $("#vt"),
	innW = mainCont.innerWidth / 2,
	innH = mainCont.innerHeight / 2,
	windowHalfX = innW,
	windowHalfY = innH,
	texture_placeholder, projector, intersected, objects = [],
	videoA1, videoImageA1, videoImageContextA1, videoTextureA1, videoA2, videoImageA2, videoImageContextA2, videoTextureA2, video2A, videoImage2A, videoImageContext2A, videoTexture2A, video2A, videoImage3A, videoImageContext3A, videoTexture3A, isUserInteracting = !1,
	onMouseDownMouseX = 0,
	onMouseDownMouseY = 0,
	lon = 0,
	onMouseDownLon = 0,
	lat = 0,
	onMouseDownLat = 0,
	phi = 0,
	theta = 0,
	gotoX = 0,
	gotoY = 0,
	gotoZ = 0,
	chillin = !0,
	wc = 0,
	aL = 0,
	aT = 0,
	curRoom, isie, initView = !0,
	planePic;
msieversion(), init();