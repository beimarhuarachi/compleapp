(function() {
	'use strict';

	 angular
	 	.module('complejo.common')
	 	.filter('textoMes', textoMesFilter);

	 textoMesFilter.$inject = [];

	 function textoMesFilter() {
	 	return function(value) {
	 		var meses = moment.localeData()._months;

	 		return meses[value - 1];
	 	}
	 }
})();