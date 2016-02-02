(function() {
	'use strict';

	angular
		.module('complejo.common')
		.factory('distanciaEntrePuntos', distanciaEntrePuntos);

	distanciaEntrePuntos.$inject = [];

	function distanciaEntrePuntos() {
		// Earth’s mean radius in meter
		var R = 6378137; 
		var rad = rad;

		var objeto = {
			calcular : calcular
		};

		return objeto;

		/**
		 * Calcula la distancia entre dos puntos de la tierra
		 * @param  {LatLng} p1 el punto de inicio
		 * @param  {LatLng} p2 el punto de fin
		 * @return {[type]}    Retorna la distancia en metros
		 */
		function calcular(p1, p2) {

			var dLat = rad(p2.lat() - p1.lat());
			var dLong = rad(p2.lng() - p1.lng());

			var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			  Math.cos(rad(p1.lat())) * Math.cos(rad(p2.lat())) *
			  Math.sin(dLong / 2) * Math.sin(dLong / 2);

			var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
			var d = R * c;

			return d;
		}

		/**
		 * Calcula el radio(Funcion Privada)
		 */
		function rad(x) {
		  return x * Math.PI / 180;
		}
	}
})();