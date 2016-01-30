angular
	.module('complejo.visitante')
	.controller('LoginController', LoginController);

LoginController.$inject = ['$scope', '$log', '$state', 'autorizacionService', 'superficieService', 'Notification'];

function LoginController($scope, $log, $state, autorizacionService, superficieService, Notification) {
	$log.info("Login Controller : inicio de controlador");

	$scope.user = {};

	$scope.submitLogin = submitLogin;
	
	/**
	 * Esta funcion es de prueba
	 * @return {[type]} [description]
	 */
	$scope.salir = function() {
		$state.go('app.visitante.inicio');
	}

	/**
	 * Envio de peticion de login al servidor
	 * @param  {object} user the user to login in 
	 * @return {void}  no retorna valores
	 */
	function submitLogin(user) {
		//$log.debug($scope.user);
		autorizacionService.login(user).then(function(res) {
			if(res.data && res.status === 200) {
				$log.debug("Login Controller : esta retornando un token bueno");
				if(res.data.token) {
					var rol = autorizacionService.registrarSesion(res.data.token);
					//analizar si permanece asi
					if(rol == "Administrador") {
						$state.go('app.admin.inicio');
					} else if(rol == "Cliente") {
						$state.go('app.cliente.inicio');
					}	
				}
			}
		}, function(error) {
			if(error.status == 404) {
				$log.debug("Login Controller : No tienes autorizacion");
				$scope.user = {};
				$scope.loginForm.$setPristine();
				Notification.error({title: "Inicio Sesion", message : "Hay un Error en la contrasena o en el nombre de usuario"});
			} else if(error.status == 400) {
				$log.debug("Login Controller : La peticion tiene errores");
			}
		});
	}
}