angular
	.module('complejo.common')
	.directive('cdCalendario', cdCalendario);

cdCalendario.$inject = ['$log', '$rootScope', 'campoService'];

function cdCalendario($log, $rootScope, campoService) {
	var calendario = {
		restrict : 'EA',
		replace : true,
		templateUrl : 'common/calendario/calendario.view.html',
		scope : {
			reservas : '=',
		},
		link : link,
		controller : controller
	}

	return calendario;

	function controller($scope) {
		//$log.log("Calendario directive controller : inicializado");
//lanzar el cambio de reservas desde aqui
		$scope.campoSeleccionado = {};
		$scope.campos = [];

		campoService.get({com : 1}, function(res) {
			$log.debug(res.response);
			$scope.campos = res.response;
			$rootScope.$broadcast('exito', "Funcionando desde la");
		}, function(error) {
			$log.debug('Calendario directive Error: peticion de campos');
		});
	}

	function link(scope, element, attrs) {
		var varible = 0;
		$log.debug("Calendario directive :  linking");

		$('#anterior').click(function(event) {
			$('.mycal').remove();
			$log.debug("Calendario Directive :boton anterior");
			varible++;
			$log.log(varible);
			//$rootScope.$broadcast('semanaAnterior', "Evento anterior");
		});

		$('#actual').click(function(event) {
			$('.ho').append('<div class="mycal" style="width:100%;"></div>');
			$('.mycal').easycal({
				startDate : fechaInicio, // OR 2014/10/31
				timeFormat : 'HH:mm',
				columnDateFormat : 'dddd, DD MMM',
				minTime : '08:00:00',
				maxTime : '22:00:00',
				slotDuration : 60,
				timeGranularity : 60,
				
				dayClick : function(el, startTime){
					console.log(el);
				},
				eventClick : function(eventId){
					console.log('Event was clicked with id: ' + eventId);
				},

				events : scope.reservas,
				
				overlapColor : '#FF0',
				overlapTextColor : '#000',
				overlapTitle : 'Multiple'
			});
			$log.debug("Calendario Directive : hola acutal");
			$rootScope.$broadcast('semanaActual', "Evento actual");
		});

		$('#siguiente').click(function(event) {
			$log.debug("Calendario directive : hola siguiente");
			$rootScope.$broadcast('semanaSiguiente', "Evento siguiente");
		});

		var fechaInicio = moment().format("YYYY-MM-DD");

		$('.mycal').easycal({
			startDate : fechaInicio, // OR 2014/10/31
			timeFormat : 'HH:mm',
			columnDateFormat : 'dddd, DD MMM',
			minTime : '08:00:00',
			maxTime : '22:00:00',
			slotDuration : 60,
			timeGranularity : 60,
			
			dayClick : function(el, startTime){
				console.log(el);
			},
			eventClick : function(eventId){
				console.log('Event was clicked with id: ' + eventId);
			},

			events : scope.reservas,
			
			overlapColor : '#FF0',
			overlapTextColor : '#000',
			overlapTitle : 'Multiple'
		});
	}
}