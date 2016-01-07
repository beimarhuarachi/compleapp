<?php
use Carbon\Carbon;

require APPPATH . '/libraries/Carbon.php';

class VerificadorReservas {

	public static function verificarYRetornarReservas($controller, $reserva) {
		$reservas = array();
		$veces = $reserva['veces'];
		$periodico = $reserva['periodico'];

		$inicio = new Carbon($reserva['inicio']);
		$fin = new Carbon($reserva['fin']);

		for ($i=0; $i < $veces; $i++) {

			array_push($reservas, $reserva);

			$existeReserva = $controller->reservaModel->verificarReservaExistente($reserva);
 
			if($existeReserva) {
				$controller->response(array('response'=>'Existe una reserva en estas horas'), 412);
			} 

			$inicio = self::agregarTiempo($periodico, $inicio);
			$fin =  self::agregarTiempo($periodico, $fin);

			$reserva['inicio'] = $inicio->copy()->toDateTimeString(); 
			$reserva['fin'] = 	$fin->copy()->toDateTimeString();
		}

		return $reservas;
	}

	/**
	 * Agrega un tiempo a la fecha de acuerdo al tipo periodico que se le pase
	 * Estan definidos solo diario y semanal
	 * @param  [string] $periodico el tipo de periocidad
	 * @param  [Carbon] $fecha     la fecha
	 * @return [Carbon]            se retorna un mismo objeto de tipo carbon pero agregado en dias o semanas
	 */
	public static function agregarTiempo($periodico, $fecha) {
		switch ($periodico) {
			case 'Diario':
				return $fecha->addDay();
			case 'Semanal':
				return $fecha->addWeek();
			default:
				break;
		}
	}
}

/* End of file VerificadorReservas.php */
/* Location: ./application/libraries/VerificadorReservas.php */