<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class ReservaEspecialModel extends CI_Model {

	public function __construct() {
		parent::__construct();
	}

	public function registrarReservaEspecial($reserva) {
		$datos = array(
				"FechaRegistro" => $reserva['fecha'],
				"IdCampo" => $reserva['idcampo'],
				"Inicio" => $reserva['inicio'],
				"Fin" => $reserva['fin'],
				"Confirmado" => $reserva['confirmado'],
				"PrecioReserva" => $reserva['precio'],
				"IdTipoReserva" => $reserva['idtiporeserva'],
				"ReservaEspecial" => $reserva['reservaespecial'] 
			);

		$this->db->insert('reserva', $datos);

		if($this->db->affected_rows() === 1) {
			return $this->db->insert_id();
		}

		return NULL;
	}
	

}

/* End of file reservaEspecialModel.php */
/* Location: ./application/models/reservaEspecialModel.php */