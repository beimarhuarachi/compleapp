angular
	.module('complejo.admin')
	.controller('AdminLayoutController', AdminLayoutController);

AdminLayoutController.$inject = ['$scope', '$log', 'autorizacionService', 'complejoService'];

function AdminLayoutController($scope, $log, autorizacionService, complejoService) {
	$log.debug("AdminLayoutController : inicializado");
	$log.debug(autorizacionService.getUsuarioActual());

	complejoService.query({id : 1}, function(res) {
		$log.debug(res.response);
	});
}