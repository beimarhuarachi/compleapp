angular
	.module('complejo.servicios')
	.factory('clienteService', clienteService);

clienteService.$inject = ['$resource', 'REST_API'];

function clienteService($resource, REST_API) {
	var nombreservicio = 'clientes';

	var servicio = $resource(REST_API + nombreservicio, {id : "@_id"}, {

	});

	return servicio;
}