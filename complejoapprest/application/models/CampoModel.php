<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class CampoModel extends CI_Model {

	public function __construct() {
		parent::__construct();
	}

	public function retornarCamposPorIdComplejo($idComplejo) {
		$consulta = $this->db->select("c.IdCampoDeportivo as idcampo, c.NombreCampo as nombre, c.IdComplejo, 
			c.RutaFotoCampo as foto, c.PrecioPorHora as precio, d.NombreDisciplina as disciplina
			, s.NombreSuperficie as superficie")
							 ->from("campo as c")
							 ->join("disciplina as d", "c.IdDisciplina = d.IdDisciplina")
							 ->join("superficie as s", "c.IdSuperficie = s.IdSuperficie")
							 ->where("IdComplejo = ".$idComplejo)
							 ->get();

		if($consulta->num_rows() >= 1) {
			return $consulta->result_array();
		}

		return false;
	}

	public function guardarCampoDeComplejo($idusuario, $idcomplejo, $nombre, $precio, $imagen, $disciplina, $superficie) {
		$datos = array(
				"IdComplejo" => $idcomplejo,
				"NombreCampo" => $nombre,
				"PrecioPorHora" => $precio,
				"RutaFotoCampo" => $imagen,
				"IdDisciplina" => $disciplina,
				"IdSuperficie" => $superficie 
			);

		$this->db->insert("campo", $datos);

		return $this->db->affected_rows() === 1;
	}
}

/* End of file campoModel.php */
/* Location: ./application/models/campoModel.php */