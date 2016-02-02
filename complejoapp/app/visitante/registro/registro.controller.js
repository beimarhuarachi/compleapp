(function() {
	'use strict';

	angular
		.module('complejo.visitante')
		.controller('RegistroController', RegistroController);

	RegistroController.$inject = ['$log', '$scope', '$timeout', 'REST_API', 
			'$http', 'geolocalizacion'];

	function RegistroController($log, $scope, $timeout, REST_API, $http, geolocalizacion) {
		var vm = this;

		vm.titulo = "Mapas de google";

		$timeout(cargarMapa, 1000);

		function cargarMapa() {
			var stylez = [
		      {
		        featureType: "all",
		        stylers: [
		          { hue: "#34B5A7" },
		          { saturation: -75 }
		        ]
		      },
		      {
		        featureType: "poi",
		        elementType: "label",
		        stylers: [
		          { visibility: "off" }
		        ]
		      }
		    ];

			var mapDiv = $('#map')[0];
			$log.debug(mapDiv);
			
			var catalunya = new google.maps.LatLng(41.652393,1.691895);
			var beimar = new google.maps.LatLng(-17.413976599999998,-66.1653224);

			var options = {
				center: beimar,
				zoom: 12,
				mapTypeControlOptions: {
	                mapTypeIds: [google.maps.MapTypeId.ROADMAP, "Edited"] 
	            }
			};

			var mapa = new google.maps.Map(mapDiv, options);

			var styledMapType = new google.maps.StyledMapType(stylez, {name: "Edited"});
			mapa.mapTypes.set("Edited", styledMapType);
        	mapa.setMapTypeId('Edited');
			
			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(-17.413976599999998,-66.1653224),
				map: mapa,
				title: 'Complejo San Simon'
				// icon: REST_API + 'uploads/imagen001.jpg'
			});

			var infowindow = new google.maps.InfoWindow({
				content:'<h3>Complejo San Simon</h3><img class="img img-rounded" src="'+ REST_API + 'uploads/imagen001.jpg" width="200px" height="200px" />'
			});

			google.maps.event.addListener(marker, 'click', function() { 
				infowindow.open(mapa,marker); 
			}); 

			google.maps.event.addListener(mapa, 'click', function( event ) {
			 //   	var marker = new google.maps.Marker({
				// 	position: event.latLng,
				// 	map: mapa,
				// 	title: 'Otro Complejo'
				// 	// icon: REST_API + 'uploads/imagen001.jpg'
				// });
				marker.setOptions({
					position : event.latLng,
					map : mapa,
					title : "Cambiado"
				});
			   $log.debug( "Latitude: "+event.latLng.lat()+" "+", longitude: "+event.latLng.lng() ); 
			});

			initialize();


			
			function initialize() {
				var marcadores = [
				['Barcelona',41.385064,2.173404,'Barcelona'],
				['Tarragona',41.119019,1.245212,'Tarragona'],
				['Girona',41.9794,2.821426,'Girona'],
				['Lleida',41.60034,0.609762,'Lleida'],
				];
				 
				var infowindow;
				function setMarkers(map, marcadores) {
				 
					for (var i = 0; i < marcadores.length; i++) {
						var myLatLng = new google.maps.LatLng(marcadores[i][1], marcadores[i][2]);
						var marker = new google.maps.Marker({
							position: myLatLng,
							map: mapa,
							title: marcadores[i][0],
						});

						(function(i, marker) {
							google.maps.event.addListener(marker,'click',function() {
								if (!infowindow) {
									infowindow = new google.maps.InfoWindow();
								}
								infowindow.setContent(marcadores[i][3]);
								infowindow.open(mapa, marker);
							});
						})(i, marker);
					}
				};
			
			}
		}	
	}
})();