angular
	.module('complejo.servicios')
	.factory('complejoService', complejoService);

complejoService.$inject = ['$resource', 'REST_API'];

function complejoService($resource, REST_API) {
	var nombreServicio = 'complejos';

	var servicio = $resource(REST_API + nombreServicio + '/:id', {id : '@_id'}, {
		query : {
			method : 'GET',
			skipAuthorization : true,
			params : {id : '@_id'}
		}
	}); 

	return servicio;
}	