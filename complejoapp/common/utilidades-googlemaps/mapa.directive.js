(function() {
	'use strict';

	angular
		.module('complejo.common')
		.directive('cdMapa', cdMapa);

	cdMapa.$inject = ['$log', 'ubicacionService', 'mapsService', 'REST_API', '$timeout'];

	function cdMapa($log, ubicacionService, mapsService, REST_API, $timeout) {
		
		var directiva = {
			restrict : 'EA',
			replace : true,
			template : '<div><div id="map" style="width: 100%;height: 350px;display: block"></div></div>',
			scope : {
				lat : '=',
				lng : '=',
				ubicacion : '=',
				complejos : '='
			},
			link : link
		};

		return directiva;

		function link($scope, element, attrs) {
			var mapDiv = $('#map')[0];
			// console.log($scope.lat + " ==="+$scope.lng);
		    var beimar = new google.maps.LatLng(-17.413976599999998,-66.1653224);

			var options = {
				center: beimar,
				zoom: 5,
				mapTypeControlOptions: {
	                mapTypeIds: [google.maps.MapTypeId.ROADMAP, "Edited"] 
	            }
			};

			var mapa = mapsService.crearMapa(mapDiv, options);

			if($scope.lat === null || $scope.lng === null)  {
				$timeout(function() {
					var marker = new google.maps.Marker();
					marcadorRegistro(mapa, $scope, ubicacionService, marker);

					mapsService.cargarComplejos(mapa, $scope.complejos);
					
				}, 2500);
			} else {
				$timeout(function() {
					var marker = new google.maps.Marker({
						position: new google.maps.LatLng($scope.lat,$scope.lng),
						map: mapa,
						animation : google.maps.Animation.BOUNCE,
						title: 'Complejo San Simon',
						icon: REST_API + 'uploads/marcador.png'
					});

					mapa.setCenter(marker.position);
					
				}, 2500);
			}
		}

		function marcadorRegistro(mapa, $scope, ubicacionService, marker) {
        	google.maps.event.addListener(mapa, 'click', function( event ) {
				marker.setOptions({
					position : event.latLng,
					map : mapa,
					title : "Cambiado"
				});

			   ubicacionService.getDatos(event.latLng.lat(), event.latLng.lng())
			   .then(function(datos) {
			   		console.log(datos);
					   $scope.ubicacion = datos;
			   });

			   $scope.$apply(function(argument) {
				   $scope.lat = event.latLng.lat();
				   $scope.lng = event.latLng.lng();
			   });
			});
		}	
	}
})();