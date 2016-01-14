<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class CampoModel extends CI_Model {

	public function __construct() {
		parent::__construct();
	}

	public function retornarCamposPorIdComplejo($idComplejo) {
		$consulta = $this->db->select("c.IdCampoDeportivo as idcampo, c.NombreCampo as nombre, c.IdComplejo, 
			c.RutaFotoCampo as foto, c.PrecioPorHora as precio, d.NombreDisciplina as disciplina
			, s.NombreSuperficie as superficie, h.HoraInicio as inicio, h.HoraFin as fin")
							 ->from("campo as c")
							 ->join("disciplina as d", "c.IdDisciplina = d.IdDisciplina")
							 ->join("superficie as s", "c.IdSuperficie = s.IdSuperficie")
							 ->join("horario as h", "c.IdHorario = h.IdHorario")
							 ->where("IdComplejo = ".$idComplejo)
							 ->get();

		if($consulta->num_rows() >= 1) {
			return $consulta->result_array();
		}

		return false;
	}

	public function retornarCampoPorId($idcampo) {
		$consulta = $this->db->select("c.IdCampoDeportivo as idcampo, c.NombreCampo as nombre, c.IdComplejo, 
			c.RutaFotoCampo as foto, c.PrecioPorHora as precio, d.IdDisciplina as disciplina
			, s.IdSuperficie as superficie, h.IdHorario as idhorario")
							 ->from("campo as c")
							 ->join("disciplina as d", "c.IdDisciplina = d.IdDisciplina")
							 ->join("superficie as s", "c.IdSuperficie = s.IdSuperficie")
							 ->join("horario as h", "c.IdHorario = h.IdHorario")
							 ->where("IdCampoDeportivo = ".$idcampo)
							 ->get();

		if($consulta->num_rows() === 1) {
			return $consulta->row();
		}

		return false;
	} 

	public function guardarCampoDeComplejo($idusuario, $idcomplejo, $nombre, $precio, $imagen, $disciplina, $superficie, $idHorario) {
		$datos = array(
				"IdComplejo" => $idcomplejo,
				"NombreCampo" => $nombre,
				"PrecioPorHora" => $precio,
				"RutaFotoCampo" => $imagen,
				"IdDisciplina" => $disciplina,
				"IdSuperficie" => $superficie,
				"IdHorario" => $idHorario 
			);

		$this->db->insert("campo", $datos);

		if($this->db->affected_rows() === 1) {
			return $this->db->insert_id();
		}

		return NULL;
	}

	public function actualizarCampo($idcampo, $nombre, $precio, $disciplina, 
			$nombrearchivo,$superficie, $idhorario) {
		$datos = array(
				"NombreCampo" => $nombre,
				"PrecioPorHora" => $precio,
				"RutaFotoCampo" => $nombrearchivo,
				"IdDisciplina" => $disciplina,
				"IdSuperficie" => $superficie,
				"IdHorario" => $idhorario 
			);

		$this->db->set($datos)
				 ->where('IdCampoDeportivo', $idcampo)
				 ->update('campo');

		if($this->db->affected_rows() === 1) {
			return TRUE;
		}

		return NULL;

	}
}

/* End of file campoModel.php */
/* Location: ./application/models/campoModel.php */