jQuery(document).ready(function($) {

	$('#vibrate').click(function(event) {
		navigator.vibrate(1000);
		$('#results').html("Vibration");
	});

	$('#accel').click(function(event) {
		function onAccelSuccess(acceleration) {
			$('#results').html('Acceleration X: ' + acceleration.x + '\n' +
				'Acceleration Y: ' + acceleration.y + '\n' +
				'Acceleration Z: ' + acceleration.z + '\n' +
				'Timestamp: '      + acceleration.timestamp + '\n');
		}

		function onAccelError() {
			alert('onError!');
		}
		var options = { frequency: 1000 };

		var watchID = navigator.accelerometer.watchAcceleration(onAccelSuccess, onAccelError, options);
	});

	$('#compass').click(function(event) {
		function onCompassSuccess(heading) {
			$('#results').html ('Heading: ' + heading.magneticHeading);
		};

		function onCompassError(compassError) {
			alert('Compass error: ' + compassError.code);
		};

		var options = {
			frequency: 1000
		};

		var watchID = navigator.compass.watchHeading(onCompassSuccess, onCompassError, options);
	});
	$('#camera').click(function(event) {
		function cameraSuccess(receivedImage) {
			var image = document.getElementById('myImage');
			console.log(receivedImage);
			image.src = receivedImage;
		}
		function cameraError(cameraError) {
			alert('Camera error: ' + cameraError.code);
		};
		navigator.camera.getPicture(cameraSuccess, cameraError, { quality: 50,
			destinationType: Camera.DestinationType.FILE_URI });
	});
	
	$('#contacts').click(function(event) {
		getContact('', [navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.id], [navigator.contacts.fieldType.id]);
	});

	$('#contact-detail').click(function(event) {
		console.log(getUrlParameter('id'));
		getContact(getUrlParameter('id'));
	});
	function onContactSuccess(contacts) {
		$txt = "<ul>";
		$detail = ($('#results_details').length > 0) ? true : false;
		console.log("detail?", $detail);
		contacts.forEach( function(element, index) {
			console.log("elem", element);
			if ($detail){
				element.phoneNumbers.forEach( function(number, index) {
					console.log(number);
					$txt += "<li>"+number.value+"</li></a>";
				});
				
			}
			else {
				$txt += "<a href='contact_detail.html?id="+element.id+"'><li>"+element.displayName+"</li></a>";
			}
		});
		$txt += "</ul>";
		$detail ? $('#results_details').html($txt) : $('#results').html($txt);
	};

	function onContactError(contactError) {
		alert('onError!');
	};


	function getContact(search){
		var options      = new ContactFindOptions();
		options.filter   = search;
		options.multiple = true;
		options.hasPhoneNumber = true;
		var fields       = [navigator.contacts.fieldType.id];
		navigator.contacts.find(fields, onContactSuccess, onContactError, options);
	}

	$("#geoloc").click(function(event) {
		function onGeolocSuccess(position) {
			$("#results").html('Latitude: '          + position.coords.latitude          + '\n' +
				'Longitude: '         + position.coords.longitude         + '\n' +
				'Altitude: '          + position.coords.altitude          + '\n' +
				'Accuracy: '          + position.coords.accuracy          + '\n' +
				'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
				'Heading: '           + position.coords.heading           + '\n' +
				'Speed: '             + position.coords.speed             + '\n' +
				'Timestamp: '         + position.timestamp                + '\n'
				);
		};
		function onGeolocError(error) {
			alert('code: '    + error.code    + '\n' +
				'message: ' + error.message + '\n');
		}

		navigator.geolocation.getCurrentPosition(onGeolocSuccess, onGeolocError, { timeout: 10000 });
	});

	function getUrlParameter (paramName) {
		var urlParams = window.location.href.split('?')[1];
		if (urlParams) {
			var params = urlParams.split('&');

			for (var i = 0; i <  params.length; i++) {
				var param = params[i].split('=');
				if (param[0] == paramName)
					return param[1];
			}
		}
	}
});