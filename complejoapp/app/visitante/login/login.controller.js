angular
	.module('complejo.visitante')
	.controller('LoginController', LoginController);

LoginController.$inject = ['$scope', '$log', '$state', 'autorizacionService'];

function LoginController($scope, $log, $state, autorizacionService) {
	$log.info("Login Controller : inicio de controlador");

	$scope.user = {};

	$scope.submitLogin = submitLogin;

	/**
	 * Envio de peticion de login al servidor
	 * @param  {object} user the user to login in 
	 * @return {void}  no retorna valores
	 */
	function submitLogin(user) {
		
		autorizacionService.login(user).then(function(res) {
			if(res.data && res.status === 200) {
				$log.debug("Login Controller : esta retornando un token bueno");
				if(res.data.token) {
					var rol = autorizacionService.registrarSesion(res.data.token);
					//analizar si permanece asi
					if(rol == "Administrador") {
						$state.go('app.admin.inicio');
					}
				}
			}
		}, function(error) {
			if(error.status == 401) {
				$log.debug("Login Controller : No tienes autorizacion");
				$scope.user = {};
				$scope.loginForm.$setPristine();
			} else if(error.status == 400) {
				$log.debug("Login Controller : La peticion tiene errores");
			}
		});
	}
}