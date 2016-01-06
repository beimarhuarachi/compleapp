angular
	.module('complejo.servicios')
	.factory('reservaEspecialService', reservaEspecialService);

reservaEspecialService.$inject = ['$resource', 'REST_API'];

function reservaEspecialService($resource, REST_API) {
	var nombreservicio = 'reservasEspeciales';

	var servicio = $resource(REST_API + 'campos/:id/' + nombreservicio, {id : "@_id"}, {

	});

	return servicio;

}