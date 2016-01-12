angular
	.module('complejo.admin')
	.controller('PrereservaAdminController', PrereservaAdminController);

PrereservaAdminController.$inject = ['$log', '$state', '$scope', 'prereservas', 'comPrereservaService', 'Notification'];

function PrereservaAdminController($log, $state, $scope, prereservas, comPrereservaService, Notification) {
	var vm = this;

	vm.datospagina = $state.current.data;

	vm.prereserva = null;

	vm.prereservas = prereservas;

	vm.reset = reset;

	vm.submit = submit;

	function reset() {
		$log.debug("fdsa");
	}

	function submit(prereserva) {
		//$log.debug(prereserva);
		
		if(prereserva.nombres == null) {
			return;
		}

		prereserva.fecha = moment().format("YYYY-MM-DD HH:mm:ss");

		comPrereservaService.update({id: $scope.complejo.idcomplejo}, {prereserva : prereserva}, function(res) {
			$log.debug(res.response);
			Notification.success({title: "Confirmacion de Prereserva", message : "Se ha Confirmado la prereserva correctamente"});
			$state.go('app.admin.impresion-factura', {id : prereserva.numerofactura});
		}, function(error) {
			$log.debug(error);
			Notification.error({title: "Confirmacion de Prereserva", message : error.data.response});
		});
	}

}