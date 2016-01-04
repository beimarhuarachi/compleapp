angular
	.module('complejo.common')
	.directive('cdCalendario', cdCalendario);

cdCalendario.$inject = ['$log', '$rootScope', 'campoService', 'reservaService'];

function cdCalendario($log, $rootScope, campoService, reservaService) {
	var directiva = {
		restrict : 'EA',
		replace : true,
		templateUrl : 'common/calendario/calendario.view.html',
		scope : {
			complejo : '='
		},
		link : link,
		controller : controller
	}

	return directiva;

	function controller($scope) {
		//$log.log("Calendario directive controller : inicializado");
		//lanzar el cambio de reservas desde aqui
		$scope.campoSeleccionado = null;
		$scope.campos = [];

		$scope.reservas = [];

		$scope.inicioSemana = moment().startOf("isoweek").format('YYYY-MM-DD HH:mm:ss'); 
		$scope.finSemana =  moment().endOf("isoweek").format('YYYY-MM-DD HH:mm:ss');

		$scope.actualizarReservas = actualizarReservas;
		
		campoService.get({com : $scope.complejo.idcomplejo}, function(res) {
			//$log.debug(res.response);
			$scope.campos = res.response;
		}, function(error) {
			$log.debug('Calendario directive Error: peticion de campos');
		});

		function actualizarReservas(campo) {
			//$log.debug(campo);
			$scope.crearCalendarioSemanal(campo, $scope.inicioSemana, $scope.finSemana);
		}
	}

	function link($scope, element, attrs) {
		$scope.clasePadre = '.calendario';
		$scope.claseSemanal = '.calendarioSemanal';

		var formatoLargo = 'YYYY-MM-DD HH:mm:ss';

		$scope.crearCalendarioSemanal = crearCalendarioSemanal;

		$log.debug("Calendario directive :  linking");

		$('#anterior').click(function(event) {
			$scope.inicioSemana = moment($scope.inicioSemana, formatoLargo).subtract(1, 'weeks')
										.startOf('isoweek').format(formatoLargo);
										
			$scope.finSemana = moment($scope.finSemana, formatoLargo).subtract(1, 'weeks')
										.endOf('isoweek').format(formatoLargo);


			crearCalendarioSemanal($scope.campoSeleccionado, $scope.inicioSemana, $scope.finSemana);
			
			//$log.debug("Calendario Directive :boton anterior");
		});

		$('#actual').click(function(event) {
			$scope.inicioSemana = moment().startOf("isoweek").format(formatoLargo); 
			$scope.finSemana =  moment().endOf("isoweek").format(formatoLargo);

			crearCalendarioSemanal($scope.campoSeleccionado, $scope.inicioSemana, $scope.finSemana);

			//$log.debug("Calendario Directive : hola acutal");
		});

		$('#siguiente').click(function(event) {
			$scope.inicioSemana = moment($scope.inicioSemana, formatoLargo).add(1, 'weeks')
										.startOf('isoweek').format(formatoLargo);

			$scope.finSemana = moment($scope.finSemana, formatoLargo).add(1, 'weeks')
										.endOf('isoweek').format(formatoLargo);

			crearCalendarioSemanal($scope.campoSeleccionado, $scope.inicioSemana, $scope.finSemana);
			//$log.debug("Calendario directive : hola siguiente");
		});

		function  crearCalendarioSemanal(campo, inicio, fin) {
			if(!campo) {
				return;
			}
			// console.log(campo);
			reservaService.get({id : campo.idcampo, inicio: inicio, fin: fin} ,function(res) {
				//$log.debug(res.response);
				$scope.reservas = [];
				for (var i = 0; i < res.response.length; i++) {
					var evento = {
							id : res.response[i].id,
							title : res.response[i].nombretipo,
							start : res.response[i].inicio,
							end : res.response[i].fin,
							backgroundColor: '#34B5A7',
							textColor : '#FFF'
					}

					$scope.reservas.push(evento);
				}; 

				renderizarCalendario($scope.reservas);

			}, function(error) {
				$log.debug("Directiva Calendario Error: reservaService peticion");
			});
		}

		function renderizarCalendario(reservas) {
			$($scope.claseSemanal).remove();
			$($scope.clasePadre).append('<div class="calendarioSemanal" style="width:100%;"></div>');

			var fechaInicio = moment($scope.inicioSemana).format('YYYY-MM-DD');

			$($scope.claseSemanal).easycal({
				startDate : fechaInicio, // OR 2014/10/31
				timeFormat : 'HH:mm',
				columnDateFormat : 'dddd, DD MMM',
				minTime : '08:00:00',
				maxTime : '21:00:00',
				slotDuration : 60,
				timeGranularity : 60,
				
				dayClick : function(el, startTime){
					var fecha = el[0].parentNode.attributes['data-date'].value;
					var fechaInicio = moment(fecha + ' ' + startTime).format('YYYY-MM-DD HH:mm:ss');

					var fechaFin = moment(fechaInicio, 'YYYY-MM-DD HH:mm:ss').add(1,'hours')
												.format('YYYY-MM-DD HH:mm:ss');

					$rootScope.$broadcast('clickCelda', {
						inicio : fechaInicio,
						fin : fechaFin
					});	

					console.log(fechaInicio + "===" + fechaFin);
				},
				eventClick : function(eventId){
					$rootScope.$broadcast('clickReserva', eventId);
				},

				events : reservas,
				
				overlapColor : '#FF0',
				overlapTextColor : '#000',
				overlapTitle : 'Multiple'
			});
		}
	}
}