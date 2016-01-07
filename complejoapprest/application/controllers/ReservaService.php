<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . 'libraries/REST_Controller.php';
require APPPATH . "/libraries/Verificador.php";
require APPPATH . "/libraries/VerificadorReservas.php";

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

	public function guardar_post($idcampo) {
		$usuario = Verificador::verificacionCompleta($this);

		$reserva = $this->post('reserva');

		if(!$reserva) {
			$this->response(array("response"=> "Debe enviarse una reserva"), 400);
		}

		/**
		 * id factura por defecto
		 */
		$idfactura = 1;

		$reservas = VerificadorReservas::verificarYRetornarReservas($this, $reserva);

		$reservasids = array(); 
		foreach ($reservas as $reserva) {
			$idreserva = $this->reservaModel->registrarReserva($reserva, $idfactura);

			if(is_null($idreserva)) {
				$this->response(array("response"=>"Error en los datos, no se pudo insertar"), 400);
			}

			array_push($reservasids, $idreserva);
		}

		$this->response(array("response"=>$reservasids), 201);
	}

}

/* End of file reservaService.php */
/* Location: ./application/controllers/reservaService.php */