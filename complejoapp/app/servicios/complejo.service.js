angular
	.module('complejo.servicios')
	.factory('complejoService', compolejoService);

compolejoService.$inject = ['$resource', 'REST_API'];

function compolejoService($resource, REST_API) {
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