(function() {
	'use strict';

	angular
		.module('complejo.visitante')
		.factory('busquedaService', busquedaService);

	busquedaService.$inject = ['$log', 'REST_API', '$resource', '$q'];

	function busquedaService($log, REST_API, $resource, $q) {
		/**
		 * Tipos de Busqueda y el Nombre de servicio
		 * @type {String}
		 */
		var POR_COMPLEJO = 'complejo',
			POR_DISCIPlINA = 'disciplina',
			NOMBRE_SERVICIO = 'busqueda';

		/**
		 * El servicio que se encarga de extraer datos
		 * @type {$resource}
		 */
		var servicio = $resource(REST_API + NOMBRE_SERVICIO, {}, {
			query : {
				method : 'GET',
				skipAuthorization : true
			}
		});

		/**
		 * El Objeto factory que sirve como interfaz
		 * @type {Object}
		 */
		var busquedaFactory = {
			buscar : buscar
		};

		return busquedaFactory;

		/**
		 * Verifica el tipo de criterio que ha sido seleccionado y deacuerdo a eso ejecuta la fucncion 
		 * correspondiente
		 * @param  {string} textoBusqueda palabra clave para la busqueda
		 * @param  {string} criterio      el tipo de busqueda
		 * @return {promise}               retorna una promesa
		 */
		function buscar(textoBusqueda, criterio) {

			return servicio.query({
				tipobusqueda : criterio,
				textobusqueda : textoBusqueda
			}).$promise;
		}
	}
})();
