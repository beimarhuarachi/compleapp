angular
	.module('complejo.common')
	.directive('cdCalendario', cdCalendario);

cdCalendario.$inject = ['$log', '$rootScope', 'campoService', 'reservaService', 'calendarioService'];

function cdCalendario($log, $rootScope, campoService, reservaService, calendarioService) {
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
		calendarioService.inicializarMoment();
		//$log.log("Calendario directive controller : inicializado");
		//lanzar el cambio de reservas desde aqui
		$scope.campoSeleccionado = null;
		$scope.campos = [];

		$scope.horaMinima = '08:00:00';
		$scope.horaMaxima = '21:00:00';

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
			$scope.horaMinima = campo.inicio;
			$scope.horaMaxima = campo.fin;
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
				$scope.reservas = res.response;

				var eventos = [];
				for (var i = 0; i < res.response.length; i++) {
					var evento = {
							id : res.response[i].id,
							title : res.response[i].nombretipo,
							start : res.response[i].inicio,
							end : res.response[i].fin,
							backgroundColor: '#34B5A7',
							textColor : '#FFF'
					}

					eventos.push(evento);
				}; 

				renderizarCalendario(eventos);

			}, function(error) {
				$log.debug("Directiva Calendario Error: reservaService peticion");
			});
		}

		function renderizarCalendario(eventos) {
			$($scope.claseSemanal).remove();
			$($scope.clasePadre).append('<div class="calendarioSemanal" style="width:100%;"></div>');

			var fechaInicio = moment($scope.inicioSemana).format('YYYY-MM-DD');

			$($scope.claseSemanal).easycal({
				startDate : fechaInicio, // OR 2014/10/31
				timeFormat : 'HH:mm',
				columnDateFormat : 'dddd, DD MMM',
				minTime : $scope.horaMinima,
				maxTime : $scope.horaMaxima,
				slotDuration : 60,
				timeGranularity : 60,
				
				dayClick : function(el, startTime){
					var fecha = el[0].parentNode.attributes['data-date'].value;
					
					var fechaInicio = moment(fecha + ' ' + startTime).format(formatoLargo);

					if(moment(fechaInicio).isBefore(moment())) {
						console.log("Esta hora esta antes del Actual, No puede hacer una reserva pasada");
						return;
					}

					var fechaFin = moment(fechaInicio, formatoLargo).add(1,'hours')
												.format(formatoLargo);

					var fechasValidas = retornarHorasValidas($scope.reservas, fechaFin);

					$rootScope.$broadcast('clickCelda', {
						inicio : fechaInicio,
						fin : fechaFin,
						campo : $scope.campoSeleccionado,
						fechasValidas : fechasValidas
					});	

					//console.log(fechaInicio + "===" + fechaFin);
				},
				eventClick : function(eventId){
					var reserva = _.findWhere($scope.reservas, {id : eventId});
					$rootScope.$broadcast('clickReserva',{
						campo : $scope.campoSeleccionado,
						reserva : reserva
					});
				},

				events : eventos,
				
				overlapColor : '#FF0',
				overlapTextColor : '#000',
				overlapTitle : 'Multiple'
			});
		}

		//horas finales validas para la reserva
		function retornarHorasValidas(reservas, fechaFin) {
			var reservasHoy = _.filter(reservas, function(value, i, list) {
				var fechaActual = moment(fechaFin, 'YYYY-MM-DD');

				var fechaComparar = moment(moment(value.inicio).format('YYYY-MM-DD'));

				//console.log(fechaActual.format('YYYY-MM-DD') + "-----" + fechaComparar.format('YYYY-MM-DD'));

				//mismo dia y que el inicio sea mayor a fechaFin
				return fechaComparar.isSame(fechaActual) && 
								(moment(value.inicio).isAfter(fechaFin) || moment(value.inicio).isSame(fechaFin));
			
			});
			
			var primero;
			if(reservasHoy.length > 0) {
				primero = reservasHoy[0];

				_.each(reservasHoy, function(value, key, list) {
					var fecha = moment(value.fin, formatoLargo);

					if(fecha.isBefore(moment(primero.fin))) {
						primero = value;
					}

				});

				primero = moment(primero.inicio);
			} else {
				primero = moment(moment(fechaFin).format("YYYY-MM-DD") + " " + $scope.horaMaxima);
			}

			var horasValidas = [];
			horasValidas.push(fechaFin);

			while(moment(fechaFin).isBefore(primero)) {
				fechaFin = moment(fechaFin).add(1, 'hours').format(formatoLargo);
				horasValidas.push(fechaFin);
			}

			//console.log("Primero : " + primero.fin);
			return horasValidas;
		}
	}
}