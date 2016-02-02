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
			
			$http.get(urlcompleta)
				.success(function(response) {
					if(response.status === 'OK') {
						var datos = {
							url : urlcompleta,
							direccion : response.results[0].address_components[0].long_name,
							provincia : response.results[0].address_components[3].long_name,
							ciudad : response.results[0].address_components[2].long_name,
							pais : response.results[0].address_components[5].long_name
						}
						defered.resolve(datos);	
					} else {
						defered.resolve(null);	
					}
					
				}).error(function(response) {
					defered.reject(response);
				});

			return defered.promise;
		}

		//metodo privado
		function getUrlCompleta(lat, lng) {
			latitud = '' + latitud + lat;
			longitud = '' + longitud + lng;

			return GOOGLEMAPS_API + latitud + longitud + sensor;
		}

	}
})();