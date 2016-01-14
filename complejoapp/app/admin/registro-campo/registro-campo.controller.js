angular
	.module('complejo.admin')
	.controller('RegistroCampoController', RegistroCampoController);

RegistroCampoController.$inject = ['$scope', '$log', '$state', 
					'autorizacionService', 'horarioService',
					'campoService', 'superficieService', 'disciplinaService', 'Notification'];

function RegistroCampoController($scope, $log, $state, autorizacionService, 
	horarioService, campoService, superficieService, disciplinaService, Notification) {
	$log.info("RegistroCampoController : inicio de controlador");
	
	$scope.datospagina = $state.current.data;

	$scope.campo = {};

	$scope.disciplinas = [];
	$scope.superficies = [];
	$scope.horarios = [];
	$scope.submit = submit;

	disciplinaService.query(function(res) {
		$scope.disciplinas = res.response;	
	});

	superficieService.query(function(res) {
		$scope.superficies = res.response;
	});

	horarioService.get(function(res) {
		$scope.horarios = res.response;
		if($state.params.id) {
			campoService.get({com : $scope.complejo.idcomplejo, id : $state.params.id}, function(res) {
				res.response.precio = parseInt(res.response.precio);
				$scope.campo = res.response;
			});
		}
	});

	

	function submit(campo) {
		var formData = new FormData();
		formData.append('nombre', campo.nombre);
		formData.append('precio', campo.precio);
		formData.append('disciplina', campo.disciplina);
		formData.append('superficie', campo.superficie);
		formData.append('idhorario', campo.idhorario);
		formData.append('imagen', campo.imagen);

		if($state.current.name = 'app.admin.editar-campo') {
			actualizar(campo, formData);
		} else {
			registrar(formData);
		}
	}

	function registrar(formData) {

		campoService.save({com : $scope.complejo.idcomplejo}, formData , function(res) {
			$scope.campo = {};
			$scope.campoform.$setPristine();
			Notification.success({title: "Registro de Campo", message : "Se ha registrado el campo Correctamente"});
			autorizacionService.registrarSesion(res.token);
			$log.debug(res.response);
			$state.go('app.admin.campos');
		}, function(error) {
			Notification.error({title: "Registro de Campo", message : error.data.response});
			$log.debug(error);
		});
	}

	function actualizar(campo, formData) {
		//formData.append('idcampo', campo.idcampo);

		campoService.update({com : $scope.complejo.idcomplejo, id : campo.idcampo}, formData , function(res) {
			$scope.campo = {};
			//$scope.campoform.$setPristine();
			Notification.success({title: "Actualizacion de Campo", message : "Se ha Actualizado el campo Correctamente"});
			//@TODO ver que se hace con los tokens
			//autorizacionService.registrarSesion(res.token);
			$log.debug(res.response);
			$state.go('app.admin.campos');
		}, function(error) {
			Notification.error({title: "Actualizacion de Campo", message : error.data.response});
			$log.debug(error);
		});
	}
}