window.onload = function() {
 loadPredefinedPanorama();

	document.getElementById('pano').addEventListener('change', upload, false);
};

// Load the predefined panorama
function loadPredefinedPanorama(   ) {
	var evt=window.event;
	evt.preventDefault();
    var div = document.getElementById('container');
	var PSV = new PhotoSphereViewer({
	panorama: 'house.jpg',
       container: div,
		time_anim: false,
		navbar: true,
		size: {
			width: '45%',
			height: '400px'
		}
	});
}

// Load a panorama stored on the user's computer
function upload() {
	// Retrieve the chosen file and create the FileReader object
	var file = document.getElementById('pano').files[0];
	var reader = new FileReader();
	reader.onload = function() {
		var div = document.getElementById('your-pano');
		var PSV = new PhotoSphereViewer({
		    panorama: reader.result,
			container: div,
			time_anim: false,
			navbar: true,
			size: {
				width: '40%',
				height: '400px'
			}
		});
	};
	reader.readAsDataURL(file);
}
