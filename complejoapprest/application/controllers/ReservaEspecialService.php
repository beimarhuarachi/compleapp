<?php
use Carbon\Carbon;
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . "/libraries/REST_Controller.php";
require APPPATH . "/libraries/Verificador.php";
require APPPATH . "/libraries/VerificadorReservas.php";

class ReservaEspecialService extends REST_Controller {

	public function __construct() {
		parent::__construct();
		$this->load->model('reservaModel');	
		$this->load->model('reservaEspecialModel');	
	}

	public function guardar_post($idcampo) {
		$usuario = Verificador::verificacionCompleta($this);

		$reserva = $this->post("reserva");

		if(!$reserva) {
			$this->response(array("response"=> "Debe enviarse una reserva"), 400);
		}
		
		$reservas = VerificadorReservas::verificarYRetornarReservas($this, $reserva);

		$reservasids = array(); 
		foreach ($reservas as $reserva) {
			$idreserva = $this->reservaEspecialModel->registrarReservaEspecial($reserva);

			if(is_null($idreserva)) {
				$this->response(array("response"=>"Error en los datos, no se pudo insertar"), 400);
			}

			array_push($reservasids, $idreserva);
		}

		$this->response(array("response" => $reservasids), 201);

	}

}

/* End of file reservaEspecialService.php */
/* Location: ./application/controllers/reservaEspecialService.php */