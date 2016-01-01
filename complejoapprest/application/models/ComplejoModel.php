<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class ComplejoModel extends CI_Model {

	public function __construct() {
		parent::__construct();
	}

	public function obtenerComplejoPublico($idusuario) {
		$consulta = $this->db->select("IdComplejo as idcomplejo, NombreComplejo as nombre, 
			Direccion as direccion, Telefono as telefono, Ciudad as ciudad, FotoPortada as foto, ComoLlegar as comollegar")
		->from("complejo")
		->where("IdUsuario = ".$idusuario)
		->get();

		if($consulta->num_rows() === 1) {
			return $consulta->row();
		}
		return false;
	}

}

/* End of file complejoModel.php */
/* Location: ./application/models/complejoModel.php */