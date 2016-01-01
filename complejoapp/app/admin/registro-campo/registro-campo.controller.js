angular
	.module('complejo.admin')
	.controller('RegistroCampoController', RegistroCampoController);

RegistroCampoController.$inject = ['$scope', '$log', '$state', 
					'autorizacionService', 'complejoService', 
					'campoService', 'superficieService', 'disciplinaService'];

function RegistroCampoController($scope, $log, $state, autorizacionService, 
	complejoService, campoService, superficieService, disciplinaService) {
	$log.info("RegistroCampoController : inicio de controlador");
	
	$scope.datospagina = $state.current.data;

	$scope.campo = {};

	$scope.disciplinas = [];
	$scope.superficies = [];
	$scope.registrar = registrarCampo;

	disciplinaService.query(function(res) {
		$scope.disciplinas = res.response;	
	});

	superficieService.query(function(res) {
		$scope.superficies = res.response;
	});

	function registrarCampo(campo) {
		var formData = new FormData();
		formData.append('nombre', campo.nombre);
		formData.append('precio', campo.precio);
		formData.append('disciplina', campo.disciplina);
		formData.append('superficie', campo.superficie);
		formData.append('imagen', campo.imagen);

		campoService.save({com : 1}, formData , function(res) {
		$log.debug(res.response);
		}, function(error) {
			$log.debug(error);
		});
		$log.debug(formData);
	}

	complejoService.query({id : autorizacionService.getIdUsuario()}, function(res) {
		$scope.complejo = res.response;
	}, function(error) {
		$log.error("RegistroCampoController : complejo service error");
	});

	var formulario = new FormData();
	formulario.append('nombre', 'Beimar');
	formulario.append('apellido', 'Huarachi mamani');
	var objeto = {nombre: "beimar", apellido : "haurachi jfdklas"}

	// campoService.save({com : 1}, objeto , function(res) {
	// 	$log.debug(res.response);
	// }, function(error) {
	// 	$log.debug(error);
	// });
}