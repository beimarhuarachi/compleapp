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

	public function verificarClientePorId($id) {
		$consulta = $this->db->select("*")
							 ->from("cliente")
							 ->where("IdCliente", $id)
							 ->get();

		if($consulta->num_rows() === 1) {
			return TRUE;
		}

		return FALSE;		
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

	public function getCliente($idusuario) {
		$consulta = $this->db->select("IdCliente as idcliente, Nombres as nombres")
							 ->from("cliente")
							 ->where("IdUsuario", $idusuario)
							 ->get();


		if($consulta->num_rows() === 1) {
			return $consulta->row();	
		} 

		return NULL;
	}

	/*
     * Obtiene los complejos en los cuales el cliente algunar vez hizo una reserva
	 */
	public function obtenerComplejos($idcliente) {
		$consulta = $this->db->select("com.NombreComplejo, com.Ciudad, com.Direccion, com.FotoPortada, 
									   com.Telefono, com.IdComplejo as idcomplejo, com.ComoLlegar")
							 ->from("cliente as c")
							 ->join("factura as f", "f.IdCliente = c.IdCliente")
							 ->join("reserva as r", "r.IdFactura = f.NumeroFactura")
							 ->join("campo as cd", "cd.IdCampoDeportivo = r.IdCampo")
							 ->join("complejo as com", "com.IdComplejo = cd.IdComplejo")
							 ->where("c.IdCliente", $idcliente)
							 ->group_by("com.IdComplejo")
							 ->get();

		return $consulta->result_array();
	}
}

/* End of file clienteModel.php */
/* Location: ./application/models/clienteModel.php */