<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class ReservaModel extends CI_Model {

	public function __construct() {
		parent::__construct();
	}
	
	public function registrarReserva($reserva, $idfactura) {
		$datos = array(
				"FechaRegistro" => $reserva['fecha'],
				"IdCampo" => $reserva['idcampo'],
				"IdCliente" => $reserva['idcliente'],
				"Inicio" => $reserva['inicio'],
				"Fin" => $reserva['fin'],
				"IdFactura" => $idfactura,
				"Confirmado" => $reserva['confirmado'],
				"PrecioReserva" => $reserva['precio'],
				"IdTipoReserva" => $reserva['idtiporeserva'] 
			);

		$this->db->insert("reserva", $datos);

		if($this->db->affected_rows() === 1) {
			return $this->db->insert_id();
		}

		return NULL;
	}

	public function verificarReservaExistente($reserva) {
		$inicio = $reserva['inicio'];
		$fin = $reserva['fin'];

		$consulta = $this->db->select("*")
							 ->from("reserva")
							 ->where("IdCampo", $reserva['idcampo'])
							 ->where("(('".$inicio."' >= Inicio
										AND '". $inicio."' < Fin) 
										OR ('".$fin."' > Inicio 
  										AND '".$fin."' <= Fin) 
										OR ('".$inicio."' < Inicio
										AND '".$fin."' > Fin))")
							 ->get();

		if($consulta->num_rows() >= 1) {
			return TRUE;
		}

		return NULL;
	}

	public function obtenerReservasCampo($idcampo, $inicio, $fin) {
		$consulta = $this->db->select("r.IdReserva as id, r.IdCampo as idcampo, r.Inicio as inicio
									 , r.Fin as fin, t.NombreTipo as nombretipo")
							 ->from("reserva as r")
							 ->join("tiporeserva as t", "r.IdTipoReserva = t.IdTipo")
							 ->where("IdCampo", $idcampo)
							 ->where("Inicio >=", $inicio)
							 ->where("Inicio <=", $fin)
							 ->get();

		return $consulta->result_array();
	}
}

/* End of file reservaModel.php */
/* Location: ./application/models/reservaModel.php */