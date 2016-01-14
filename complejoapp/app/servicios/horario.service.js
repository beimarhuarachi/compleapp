angular
	.module('complejo.servicios')
	.factory('horarioService', horariosService);

horariosService.$inject = ['$resource', 'REST_API'];

function horariosService($resource, REST_API) {
	var nombreservicio = 'horarios';

	var servicio = $resource(REST_API + nombreservicio, {}, {
		get : {
			method : 'GET',
			skipAuthorization : true
		}
	});

	return servicio;
}