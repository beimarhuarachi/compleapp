<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class ComplejoModel extends CI_Model {

	public function __construct() {
		parent::__construct();
	}

	public function registrarComplejo($idusuario, $direccion, $telefono, $nombreadmin, $apellidosadministrador
		, $numeroci, $ciudad, $comollegar, $imagen, $nombre, $longitud, $latitud, $pais) {
		$datos = array(
				"IdUsuario" => $idusuario,
				"Direccion" => $direccion,
				"Telefono" => $telefono,
				"NombreAdministrador" => $nombreadmin,
				"ApellidosAdministrador" => $apellidosadministrador,
				"NumeroCI" => $numeroci,
				"Ciudad" => $ciudad,
				"ComoLlegar" => $comollegar,
				"FotoPortada" => $imagen,
				"NombreComplejo" => $nombre,
				"Longitud" => $longitud,
				"Latitud" => $latitud,
				"Pais" => $pais 
			);

		$this->db->insert("complejo", $datos);

		if($this->db->affected_rows() === 1) {
			return $this->db->insert_id();
		}

		return NULL;
	}

	public function obtenerComplejoPorId($idcomplejo) {
		$consulta = $this->db->select("IdComplejo as idcomplejo, NombreComplejo as nombre, 
			Direccion as direccion, Telefono as telefono, Ciudad as ciudad, FotoPortada as foto
			, ComoLlegar as comollegar, Latitud as latitud, Longitud as longitud")
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
						, NombreAdministrador as nombreadmin, NumeroCI as numeroci, ApellidosAdministrador as apellidos
						, Latitud as latitud, Longitud as longitud")
		->from("complejo")
		->where("IdUsuario = ".$idusuario)
		->get();

		if($consulta->num_rows() === 1) {
			return $consulta->row();
		}
		return false;
	}

	public function obtenerComplejos() {
		$consulta = $this->db->select("IdComplejo as idcomplejo, NombreComplejo as nombre, Direccion as direccion
						, Telefono as telefono, Ciudad as ciudad, FotoPortada as foto, ComoLlegar as comollegar
						, NombreAdministrador as nombreadmin, NumeroCI as numeroci, ApellidosAdministrador as apellidos
						, Latitud as latitud, Longitud as longitud")
							 ->from("complejo")
							 ->get();

		if($consulta->num_rows() >= 1) {
			return $consulta->result_array();
		}

		return false;
	}

}

/* End of file complejoModel.php */
/* Location: ./application/models/complejoModel.php */