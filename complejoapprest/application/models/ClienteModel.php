<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class ClienteModel extends CI_Model {

	public function __construct() {
		parent::__construct();
	}

	public function retornarClientes() {
		$consulta = $this->db->select("*")
						 	 ->from("cliente")
						 	 ->get();

		return $consulta->result_array();
	}

	public function registrarCliente() {

	}

	public function existeCliente($cliente) {
		$ci = $cliente['ci'];

		$consulta = $this->db->select("*")
							 ->from("cliente")
							 ->where("NumeroCI", $ci)
							 ->get();

		if($consulta->num_rows() >= 1) {
			return TRUE;
		}

		return FALSE;
	}

	public function crearCliente($cliente, $idusuario) {
		$datos = array(
				"IdComplejo" => $cliente['idcomplejo'],
				"IdUsuario" => $idusuario,
				"Nombres" => $cliente['nombres'],
				"Apellidos" => $cliente['apellidos'],
				"NumeroCI" => $cliente['ci'],
				"Telefono" => $cliente['telefono']
 			);

		$this->db->insert("cliente", $datos);

		if($this->db->affected_rows() === 1) {
			return $this->db->insert_id();
		}

		return NULL;
	}
}

/* End of file clienteModel.php */
/* Location: ./application/models/clienteModel.php */