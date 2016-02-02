(function() {
	'use strict';

	angular
		.module('complejo.common')
		.factory('geolocalizacion', geolocalizacion);

	geolocalizacion.$inject = ['$q'];

	function geolocalizacion($q) {
		var objeto = {
			getLocalizacion : getLocalizacion,
			rastrear : rastrear
		};

		return objeto;

		function getLocalizacion() {
			var defered = $q.defer();

			var localizacion = {};

			if (navigator.geolocation) {
			    navigator.geolocation.getCurrentPosition(function(position) {
			    	localizacion = {
			    		lat : position.coords.latitude,
			    		lng : position.coords.longitude
			    	}

			    	defered.resolve(localizacion);
			    }, function(error) {
			        defered.reject(error);
			    }, {timeout : 10000});
			} else {
				defered.resolve(null);
			}

			return defered.promise;
		}

		function rastrear() {
			var defered = $q.defer();

			var localizacion = {};

			if (navigator.geolocation) {
			    navigator.geolocation.watchPosition(function(position) {
			    	localizacion = {
			    		lat : position.coords.latitude,
			    		lng : position.coords.longitude
			    	}

			    	defered.resolve(localizacion);
			    }, function(error) {
			        defered.reject(error);
			    }, {enableHighAccuracy: true, 
					  maximumAge        : 30000, 
					  timeout           : 27000});
			} else {
				defered.resolve(null);
			}

			return defered.promise;
		}
	}
})();