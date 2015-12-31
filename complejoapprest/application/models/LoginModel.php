<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class LoginModel extends CI_Model {

	public function __construct() {
		parent::__construct();
	}

	public function esUsuario($nombreusuario, $contrasena) {
		$consulta = $this->db->select('u.NombreUsuario as nombreusuario, u.Correo as correo, r.NombreRol as rol')
		->from("usuario as u, rol as r")
		->where("u.IdRol = r.IdRol AND u.NombreUsuario = '".$nombreusuario."' AND u.Contrasena = '". $contrasena."'")
		->get();

		if($consulta->num_rows() === 1) {
			return $consulta->row();
		}

		return false;
	}

}

/* End of file loginModel.php */
/* Location: ./application/models/loginModel.php */