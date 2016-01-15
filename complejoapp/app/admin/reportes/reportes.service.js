angular
	.module('complejo.admin')
	.factory('reportesService', reportesService);

reportesService.$inject = ['$resource', 'REST_API'];

function reportesService($resource, REST_API) {
	/**
	 * El id del complejo
	 * @type {String}
	 */
	var nombreservicio = 'reportes/:id';

	var servicio = $resource(REST_API + nombreservicio, {id : '@_id'} , {
		getCamposPopulares : {
			method : 'GET',
			params : {id : '@_id'}
		},
		gestiones : {
			method : 'GET',
			params : {id : '@_id'}
		}
	});

	return servicio;
}