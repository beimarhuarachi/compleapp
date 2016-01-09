<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require APPPATH . "/libraries/REST_Controller.php";
require APPPATH . "/libraries/Verificador.php";

class FacturaService extends REST_Controller {

	public function __construct() {
		parent::__construct();
		$this->load->model('facturaModel');
	}

	public function getClientes_get($idfactura) {
		$usuario = Verificador::verificacionCompleta($this);

		if(is_null($idfactura)) {
			$this->response(array("response"=>"No existe el id de la factura"), 400);
		}

		$cliente = $this->facturaModel->obtenerCliente($idfactura);

		$this->response(array("response"=>$cliente), 200);
	}

	public function getReservas_get($idfactura) {
		$usuario = Verificador::verificacionCompleta($this);

		if(is_null($idfactura)) {
			$this->response(array("response"=>"No existe el id de la factura"), 400);
		}

		$reservas = $this->facturaModel->obtenerReservas($idfactura);

		$this->response(array("response"=>$reservas), 200);
	}

}

/* End of file facturaService.php */
/* Location: ./application/controllers/facturaService.php */