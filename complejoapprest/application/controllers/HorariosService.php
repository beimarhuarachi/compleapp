<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . "/libraries/REST_Controller.php";

class HorariosService extends REST_Controller {

	public function __construct() {
		parent::__construct();
		$this->load->model('horarioModel');
	}

	public function obtener_get() {
		$horarios = $this->horarioModel->obtenerHorarios();

		$this->response(array("response"=>$horarios), 200);
	}

}

/* End of file horariosService.php */
/* Location: ./application/controllers/horariosService.php */