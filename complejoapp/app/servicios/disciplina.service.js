angular
	.module('complejo.servicios')
	.factory('disciplinaService', disciplinaService);

disciplinaService.$inject = ['$resource', 'REST_API'];

function disciplinaService($resource, REST_API) {
	var servicio = $resource(REST_API + 'disciplinas', {}, {
		query : {
			method : 'GET',
			skipAuthorization : true
		}
	});

	return servicio;
}