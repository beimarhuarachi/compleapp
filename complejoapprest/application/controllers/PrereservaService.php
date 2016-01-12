<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . "/libraries/REST_Controller.php";
require APPPATH . "/libraries/Verificador.php";

class PrereservaService extends REST_Controller {

	public function __construct() {
		parent::__construct();
		$this->load->model('clienteModel');
		$this->load->model('facturaModel');
		$this->load->model('prereservaModel');
	}

	public function guardar_post() {
		$usuario = Verificador::verificacionCompleta($this);

		$prereserva = $this->post('prereserva');

		if(!$prereserva) {
			$this->response(array("response"=> "Debe enviarse una reserva"), 400);
		}

		$idcliente = $this->clienteModel->getCliente($usuario->idusuario)->idcliente;

		if($this->clienteModel->verificarClientePorId($idcliente) == FALSE) {
			$this->response(array("response"=> "No Existe ese cliente"), 412);
		}

		if($this->prereservaModel->tienePrereservas($idcliente, $prereserva['fecha'])) {
			$this->response(array("response"=> "Solo puede realizar una prereserva"), 412);
		}

		/**
		 * factura
		 */
		$idfactura = $this->facturaModel->crearFactura($idcliente, $prereserva['fecha']);
		if(is_null($idfactura)) {
			$this->response(array("response"=> "No se pudo crear factura"), 412);
		}

		$idprereserva = $this->prereservaModel->registrarPrereserva($prereserva, $idfactura);

		if(is_null($idprereserva)) {
			$this->response(array("response"=>"Error en los datos, no se pudo insertar"), 400);
		}

		$this->response(array("response"=>$idprereserva), 200);
	}

}

/* End of file prereservaService.php */
/* Location: ./application/controllers/prereservaService.php */