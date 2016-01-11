<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . "libraries/REST_Controller.php";
require APPPATH . "/libraries/Verificador.php";

class ClienteService extends REST_Controller {

	public function __construct() {
		parent::__construct();
		$this->load->model('clienteModel');
		$this->load->model('usuarioModel');
	}
	
	public function index_get() {
		$clientes = $this->clienteModel->retornarClientes();

		$this->response(array("response"=>$clientes), 200);
	}

	public function guardar_post() {
		$usuario = Verificador::verificacionCompleta($this);

		$cliente = $this->post('cliente');

		if($this->clienteModel->existeCliente($cliente) || $this->usuarioModel->existeUsuario($cliente)) {
			$this->response(array("response"=>"Ya existe ese cliente con Numero CI o Correo"), 412);
		}

		$idrolcliente = 2;

		$idUsuario = $this->usuarioModel->crearUsuario($cliente, $idrolcliente); 

		if(is_null($idUsuario)) {
			$this->response(array("response"=>"No se pudo insertar"), 412);
		}

		$idcliente = $this->clienteModel->crearCliente($cliente, $idUsuario);

		if(is_null($idcliente)) {
			$this->response(array("response"=>"No se pudo insertar"), 412);	
		}

		$this->response(array("response"=>$idcliente), 200);
	}	

	/**
	 * Servicio que recupera los complejos en los cuales un cliente ha hecho por lo menos una reserva
	 */
	public function obtenerComplejos_get($idusuario) {
		$idcliente = $this->clienteModel->getCliente($idusuario);

		$complejos = $this->clienteModel->obtenerComplejos($idcliente->idcliente);

		$this->response(array("response"=>$complejos), 200);
	}

}

/* End of file clienteService.php */
/* Location: ./application/controllers/clienteService.php */