angular
	.module('complejo.servicios')
	.factory('prereservaService', prereservaService);

prereservaService.$inject = ['$resource', 'REST_API'];

function prereservaService($resource, REST_API) {
	var nombreservicio = 'prereservas';

	var servicio = $resource(REST_API + nombreservicio, {}, {

	});

	return servicio;
}