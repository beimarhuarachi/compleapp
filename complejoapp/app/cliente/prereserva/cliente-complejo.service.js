angular
	.module('complejo.cliente')
	.factory('clienteComplejoService', clienteComplejoService);

clienteComplejoService.$inject = ['$resource', 'REST_API'];

function clienteComplejoService($resource, REST_API) {
	var nombreservicio = 'clientes/:id/complejos';

	var servicio = $resource(REST_API + nombreservicio, {id : '@_id'}, {

	});

	return servicio;
}