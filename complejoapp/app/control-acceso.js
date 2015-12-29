angular
	.module('complejo')
	.run(ControlarAcceso);

ControlarAcceso.$inject = ['$rootScope', '$state', '$log'];

function ControlarAcceso($rootScope, $state, $log) {

	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
			// if(toState.name == "app.visitante.inicio") {
			// 	$log.debug("entrando al IF");
			// 	return;
			// }

			// if(toState.name == "app.admin.inicio") {
			// 	event.preventDefault();
			// 	$log.info("No tienes permiso");
			// 	return $state.go("app.visitante.inicio");
			// }
		event.preventDefault();
		
		$log.debug("Esto es el estado"+toState.name);
	});
}	