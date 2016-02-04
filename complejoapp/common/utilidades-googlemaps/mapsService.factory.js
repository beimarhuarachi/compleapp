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
			cargarComplejos : cargarComplejos,
			centrarMapa : centrarMapa
		}

		return objeto;

		function centrarMapa(map, markers) {
			//var markers = [];//some array
			if(markers.length > 0) {
				var bounds = new google.maps.LatLngBounds();
				for (var i = 0; i < markers.length; i++) {
				 	bounds.extend(markers[i].getPosition());
				}

				map.fitBounds(bounds);		
			} else {
				return;
			}
		}

		function cargarComplejos(mapa, complejos, markers) {
			//BOUNCE, DROP

			_.each(complejos, function(complejo, indice, complejos) {
				if(complejo.latitud == 0 && complejo.longitud == 0) {
					return;
				}

				var marker = new google.maps.Marker({
					position: new google.maps.LatLng(complejo.latitud, complejo.longitud),
					map: mapa,
					animation : google.maps.Animation.DROP,
					title: complejo.nombre,
					icon: REST_API + 'uploads/marcador.png'
				});

				markers.push(marker);

				var infowindow = new google.maps.InfoWindow({
					content:'<h3>' + complejo.nombre + '</h3><div style="margin-bottom : 5px"><a href="#/complejo/'+ complejo.idcomplejo + '" class="btn btn-info">Ir >></a></div><img class="img img-rounded" src="'+ REST_API + complejo.foto +'" width="200px" height="100px" />'
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