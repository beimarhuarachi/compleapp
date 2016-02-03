(function() {
	'use strict';

	angular
		.module('complejo.visitante')
		.controller('RegistroController', RegistroController);

	RegistroController.$inject = ['$log', '$scope', 'complejoService', 'Notification', 'complejos'];

	function RegistroController($log, $scope, complejoService, Notification, complejos) {
		var vm = this;

		vm.complejo = {};

		vm.submit = submit;

		vm.complejo.latitud = null;

		vm.complejo.longitud = null;

		vm.complejos = complejos;

		vm.complejo.ubicacion = {};

		function submit(complejo) {
			var formData = new FormData();

			formData.append('correo', complejo.correo);

			formData.append('nombre', complejo.nombre);
			formData.append('nombreadmin', complejo.nombreadmin);
			formData.append('apellidosadmin', complejo.apellidosadmin);
			formData.append('numeroci', complejo.numeroci);
			formData.append('imagen', complejo.imagen);
			formData.append('telefono', complejo.telefono);
			formData.append('comollegar', complejo.comollegar);
			formData.append('direccion', complejo.direccion);

			formData.append('longitud', complejo.longitud);
			formData.append('latitud', complejo.latitud);

			if(complejo.ubicacion.ciudad && complejo.ubicacion.pais) {
				formData.append('ciudad', complejo.ubicacion.ciudad);
				formData.append('pais', complejo.ubicacion.pais);
			}
			
			complejoService.save({}, formData, function(res) {
				$log.debug(res.response);
				vm.complejo = {};
				$scope.registroForm.$setPristine();
				Notification.success({title: "Registro de Complejo", message : "Se ha registrado el complejo deportivo Correctamente"});
			}, function(res) {
				$log.debug(res);
				//$scope.registroForm.$setPristine();
				Notification.success({title: "Registro de Complejo", message : res.data.response});
			});
		}
	}
})();