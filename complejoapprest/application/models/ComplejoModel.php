<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class ComplejoModel extends CI_Model {

	public function __construct() {
		parent::__construct();
	}

	public function obtenerComplejoPorId($idcomplejo) {
		$consulta = $this->db->select("IdComplejo as idcomplejo, NombreComplejo as nombre, 
			Direccion as direccion, Telefono as telefono, Ciudad as ciudad, FotoPortada as foto, ComoLlegar as comollegar")
		->from("complejo")
		->where("IdComplejo", $idcomplejo)
		->get();

		if($consulta->num_rows() === 1) {
			return $consulta->row();
		}
		return false;
	}

	/**
	 * ESTA RETORNANDO EL NOMBRE DE ADMINISTRADOR Y SU CI(TODO)
	 * @param  [type] $idusuario [description]
	 * @return [type]            [description]
	 */
	public function obtenerComplejoPublico($idusuario) {
		$consulta = $this->db->select("IdComplejo as idcomplejo, NombreComplejo as nombre, Direccion as direccion
						, Telefono as telefono, Ciudad as ciudad, FotoPortada as foto, ComoLlegar as comollegar
						, NombreAdministrador as nombreadmin, NumeroCI as numeroci, ApellidosAdministrador as apellidos")
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