<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . 'libraries/REST_Controller.php';

class ReservaService extends REST_Controller {


	public function __construct() {
		parent::__construct();
		$this->load->model('reservaModel');
	}
	//rutas antepuesto por /campos/1/reservas =>para el campo tal insetar reserva
	public function index_get($idcampo) {
		$inicio = $this->get("inicio");
		$fin = $this->get("fin");

		if(!$inicio || !$fin) {
			$this->response(array("response"=>"No hay fechas"), 400);
		}

		$reservas = $this->reservaModel->obtenerReservasCampo($idcampo, $inicio, $fin);

		$this->response(array("response" => $reservas), 200);
	}

}

/* End of file reservaService.php */
/* Location: ./application/controllers/reservaService.php */