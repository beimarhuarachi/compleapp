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
}

/* End of file clienteModel.php */
/* Location: ./application/models/clienteModel.php */