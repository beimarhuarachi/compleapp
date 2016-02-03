<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . "/libraries/REST_Controller.php";
require APPPATH . "/libraries/Verificador.php";
require APPPATH . '/libraries/Uploader.php';

class ComplejoService extends REST_Controller {

	public function __construct() {
		parent::__construct();
		$this->load->model('complejoModel');
		$this->load->model('usuarioModel');
	}

	public function registrar_post() {
		$correo = $this->post('correo');

		$nombre = $this->post('nombre');
		$nombreadmin = $this->post('nombreadmin');
		$apellidosadministrador = $this->post('apellidosadmin');
		$direccion = $this->post('direccion');
		$comollegar = $this->post('comollegar');
		$direccion = $this->post('direccion');
		$telefono = $this->post('telefono');
		$imagen = $this->post('imagen');
		$numeroci = $this->post('numeroci');

		$latitud = $this->post('latitud');
		$longitud = $this->post('longitud');

		$ciudad = $this->post('ciudad');
		$pais = $this->post('pais');

		//verificar usuario TODO tambien que verifique ci de complejo
		if($this->usuarioModel->existeUsuario(array("email"=>$correo))) {
			$this->response(array("response"=>"Ya existe un administrado con ese Correo"), 412);
		}

		//Insertar usuario
		$usuario = array("email"=>$correo, "ci"=>$numeroci);
		$idroladmin = 1;

		$idusuario = $this->usuarioModel->crearUsuario($usuario, $idroladmin); 
		if(is_null($idusuario)) {
			$this->response(array("response"=>"No se pudo insertar"), 412);
		}

		$nombrearchivo = Uploader::subirArchivo($nombre, $this);

		$idcomplejo = $this->complejoModel->registrarComplejo($idusuario, $direccion, $telefono, $nombreadmin, $apellidosadministrador
		, $numeroci, $ciudad, $comollegar, $nombrearchivo, $nombre, $longitud, $latitud, $pais);

		if(is_null($idcomplejo)) {
			$this->response(array("response" => "No se pudo registrar"), 404);			
		} else {
			$this->response(array("response" => $idcomplejo), 201);
		}

		$this->response(array("response"=>$latitud), 200);
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
		$complejos = $this->complejoModel->obtenerComplejos();

		$this->response(array("response"=> $complejos), 200);
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