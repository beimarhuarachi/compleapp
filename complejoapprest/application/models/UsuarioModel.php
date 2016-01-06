<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class UsuarioModel extends CI_Model {

	public function __construct() {
		parent::__construct();
	}

	public function existeUsuario($cliente) {
		$correo = $cliente['email'];

		$consulta = $this->db->select("*")
							 ->from("usuario")
							 ->where("Correo", $correo)
							 ->get();

		if($consulta->num_rows() >= 1) {
			return TRUE;
		}

		return FALSE;
	}	

	public function crearUsuario($usuario, $idrol) {
		$datos = array(
				"Correo" => $usuario['email'],
				"Contrasena" => $usuario['ci'],
				"IdRol" => $idrol,
				"NombreUsuario" => $usuario['email']
			);

		$this->db->insert("usuario", $datos);

		if($this->db->affected_rows() === 1) {
			return $this->db->insert_id();
		}

		return NULL;

	}
			

}

/* End of file usuarioModel.php */
/* Location: ./application/models/usuarioModel.php */