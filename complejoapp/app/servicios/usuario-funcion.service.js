angular
	.module('complejo.servicios')
	.factory('usuarioFuncionService', usuarioFuncionService);

usuarioFuncionService.$inject = ['$resource', 'REST_API'];

function usuarioFuncionService($resource, REST_API) {
	var nombreservicio = 'usuarios/:id/funciones';

	var servicio = $resource(REST_API + nombreservicio, {id : '@_id'}, {

	});

	return servicio;
}