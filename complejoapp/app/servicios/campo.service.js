angular
	.module('complejo.servicios')
	.factory('campoService', campoService);

campoService.$inject = ['$resource', 'REST_API'];

function campoService($resource, REST_API) {
	var nombreservicio = 'complejo/';

	var servicio = $resource(REST_API + "complejos/:com/campos/:id", {com : "@_com", id: '@_id'}, {
		save : {
			method : 'POST',
			params : {com : "@_com"},
			//skipAuthorization :true,
			transformRequest: angular.identity,
			//El content type lo seteamos porque por defecto envia datos json
			//(con undefined podemos enviar en formato de FormData)
			headers: { 'Content-Type': undefined }
		},
		update : {
			method : 'POST',
			params : {com : '@_com', id : '@_id'},
			transformRequest : angular.identity,
			headers : {'Content-Type' : undefined}
		}

	});

	return servicio;
}