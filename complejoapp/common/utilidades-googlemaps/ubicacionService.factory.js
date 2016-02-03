(function() {
	'use strict';

	angular
		.module('complejo.common')
		.factory('ubicacionService', ubicacionService);

	ubicacionService.$inject = ['$log', '$http', '$q'];

	function ubicacionService($log, $http, $q) {
		var GOOGLEMAPS_API = 'http://maps.googleapis.com/maps/api/geocode/json';
		var latitud = '?latlng=';
		var longitud = ',%20';
		var sensor = '&sensor=false';

		var objeto = {
			getDatos : getDatos
		};

		return objeto;

		/**
		 * Obtiene los datos {direccion, provincia, ciudad, pais url}
		 * @param  {float} lat latitud de la ubicacion
		 * @param  {float} lng longitud de la ubicacion en el mapa
		 * @return {promise}     retorna una promesa
		 */
		function getDatos(lat, lng) {
			var defered = $q.defer();
			var urlcompleta = getUrlCompleta(lat, lng);
			// https://freegeoip.net/json/  (para obterner ip, timezone, ubicacion ciudad, pais mediante(pero la ubicacion actual))
			$http.get(urlcompleta)
				.success(function(response) {
					if(response.status === 'OK') {
						var ciudad = buscarpropiedad("administrative_area_level_1", response.results);
						var pais = buscarpropiedad("country", response.results);
						var direccion = buscarpropiedad("route", response.results);


						var datos = {
							url : urlcompleta,
							direccion : direccion,
							ciudad : ciudad,
							pais : pais
						}
						defered.resolve(datos);	
					} else {
						defered.resolve(null);	
					}
					// console.log(response);
					
				}).error(function(response) {
					defered.reject(response);
				});

			return defered.promise;
		}

		function buscarpropiedad(nombrepropiedad, results) {
			var valorpropiedad = null; 
			 for (var i=0; i<results[0].address_components.length; i++) {
	            for (var b=0;b<results[0].address_components[i].types.length;b++) {

	            //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
	                if (results[0].address_components[i].types[b] == nombrepropiedad) {
	                    //this is the object you are looking for
	                    valorpropiedad= results[0].address_components[i];
	                    break;
	                }
	            }
        	}
        	return valorpropiedad.long_name;
		}

		//metodo privado
		function getUrlCompleta(lat, lng) {
			return GOOGLEMAPS_API + latitud + lat + longitud + lng + sensor;
		}

	}
})();