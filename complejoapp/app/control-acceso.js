angular
	.module('complejo')
	.run(ControlarAcceso);

ControlarAcceso.$inject = ['$rootScope', '$state', '$log', 'autorizacionService'];

function ControlarAcceso($rootScope, $state, $log, autorizacionService) {

	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
			// Cuando la ruta es  'app.admin.*'
			if(toState.name && toState.name.match(/^app\.admin\./)) {
				if(!autorizacionService.esAdmin() || !autorizacionService.tieneSesion()) {
				    // Cancelar la transicion
				    event.preventDefault();
				    $log.debug("ui-router : No eres Admin "+ toState.name);
				    // Redireccionar a la pagina de inicio
				    return $state.go('app.visitante.inicio');
			 	}  
			}

			if(toState.name && toState.name.match(/^app\.cliente\./)) {
				if(!autorizacionService.esCliente() || !autorizacionService.tieneSesion()) {
					event.preventDefault();
					$log.debug("ui-router : No eres cliente"+toState.name);
					return $state.go('app.visitante.inicio');
				}
			}

			$log.debug('UI-Router : Tienes autorizacion para esta zona');
		
	});
}	