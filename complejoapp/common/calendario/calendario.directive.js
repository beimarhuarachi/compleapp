angular
	.module('complejo.common')
	.directive('cdCalendario', cdCalendario);

cdCalendario.$inject = ['$log'];

function cdCalendario($log) {
	var calendario = {
		restrict : 'EA',
		replace : true,
		templateUrl : 'common/calendario/calendario.view.html',
		scope : {
			prueba : '=',
			reservas : '=',
		},
		link : link,
		controller : controller
	}

	return calendario;

	function controller($scope) {
		$log.log("Calendario directive controller : inicializado");
	}

	function link(scope, element, attrs) {
		$log.debug("directiva con logs");

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