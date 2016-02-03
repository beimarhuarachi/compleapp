(function() {
	'use strict';

	angular
		.module('complejo.common')
		.factory('mapsService', mapsService);

	mapsService.$inject = ['$log', 'REST_API'];

	function mapsService($log, REST_API) {


		var objeto = {
			crearMapa : crearMapa,
			obtenerEstilo : obtenerEstilo,
			cargarComplejos : cargarComplejos
		}

		return objeto;

		function cargarComplejos(mapa, complejos) {
			//BOUNCE, DROP

			_.each(complejos, function(complejo, indice, complejos) {
				var marker = new google.maps.Marker({
					position: new google.maps.LatLng(complejo.latitud, complejo.longitud),
					map: mapa,
					animation : google.maps.Animation.DROP,
					title: complejo.nombre,
					icon: REST_API + 'uploads/marcador.png'
				});

				var infowindow = new google.maps.InfoWindow({
					content:'<h3>' + complejo.nombre + '</h3><img class="img img-rounded" src="'+ REST_API + complejo.foto +'" width="200px" height="200px" />'
				});

				google.maps.event.addListener(marker, 'click', function() { 
					infowindow.open(mapa,marker); 
				});
			});
		}

		function crearMapa(mapDiv, options) {
			var stylez = obtenerEstilo();

			var mapa = new google.maps.Map(mapDiv, options);

			var styledMapType = new google.maps.StyledMapType(stylez, {name: "Edited"});
			mapa.mapTypes.set("Edited", styledMapType);
        	mapa.setMapTypeId('Edited');

        	return mapa;
		}

		function obtenerEstilo() {
			return [
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
		}
	}
})();