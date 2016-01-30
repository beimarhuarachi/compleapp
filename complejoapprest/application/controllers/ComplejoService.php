<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . "/libraries/REST_Controller.php";
require APPPATH . "/libraries/Verificador.php";

class ComplejoService extends REST_Controller {

	public function __construct() {
		parent::__construct();
		$this->load->model('complejoModel');

	}

	public function obtenerComplejoDeportivo_get() {
		$idcomplejo = $this->get('id');

		$complejo = $this->complejoModel->obtenerComplejoPorId($idcomplejo);

		if($complejo === false) {
			$this->response(array("response"=>"No existe este complejo"), 404);
		}

		$this->response(array("response"=>$complejo), 200);
	}

	public function index_get() {
		$this->response(array("response"=> "complejos varios"), 200);
	}

	//id del usuario
	public function retornarComplejo_get($idusuario) {
		if(is_null($idusuario)) {
			$this->response(array("response"=>"La peticion tiene errores"), 400);
		}

		$complejo = $this->complejoModel->obtenerComplejoPublico($idusuario);

		if($complejo == false) {
			$this->response(array("response"=>"El complejo no se encuentra"), 404);
		}
		
		$this->response(array("response"=>$complejo), 200);
	}

	public function obtenerPrereservas_get($idusuario) {
		$usuario = Verificador::verificacionCompleta($this);

		$fechaactual = $this->get('fechaactual');
		if(is_null($fechaactual)) {
			$this->response(array("response"=>"No existe la fecha en los parametros"), 400);
		}

		$idcomplejo = $this->complejoModel->obtenerComplejoPublico($idusuario)->idcomplejo;

		$this->load->model('prereservaModel');
		$prereservas = $this->prereservaModel->obtenerPrereservas($idcomplejo, $fechaactual); 

		$this->response(array("response"=>$prereservas), 200);
	}

	public function confirmarPrereserva_put($idcomplejo) {
		$usuario = Verificador::verificacionCompleta($this);

		$prereserva = $this->put('prereserva');

		if(is_null($prereserva)) {
			$this->response(array("response"=>"No se envio la prereserva"), 400);
		}

		$this->load->model('facturaModel');

		$idfactura = $prereserva['numerofactura'];
		$fechaactual = $prereserva['fecha'];

		if(is_null($this->facturaModel->confirmarFactura($idfactura, $fechaactual))) {
			$this->response(array("response"=>"No se pudo modificar la factura"), 412);
		}

		$idprereserva = $prereserva['idreserva'];
		$this->load->model('prereservaModel');
		if(is_null($this->prereservaModel->confirmarPrereserva($idprereserva))) {
			$this->response(array("response"=>"No se pudo modificar la reserva"), 412);
		}
		
		$this->response(array("response"=>$idprereserva), 200);
	}

}

/* End of file complejoService.php */
/* Location: ./application/controllers/complejoService.php */