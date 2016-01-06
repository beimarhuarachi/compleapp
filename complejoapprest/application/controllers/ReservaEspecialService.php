<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . "/libraries/REST_Controller.php";
require APPPATH . "/libraries/Verificador.php";

class ReservaEspecialService extends REST_Controller {

	public function __construct() {
		parent::__construct();		
	}

	public function guardar_post($idcampo) {
		$usuario = Verificador::verificacionCompleta($this);

		$reserva = $this->post("reserva");

		$this->response(array("response" => $reserva));
	}

}

/* End of file reservaEspecialService.php */
/* Location: ./application/controllers/reservaEspecialService.php */