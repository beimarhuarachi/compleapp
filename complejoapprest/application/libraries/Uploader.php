<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Uploader {

	public static function subirArchivo($nombre, $controller) {
		$config['upload_path']          = './uploads/';
		$config['allowed_types']        = 'gif|jpg|jpeg|png|pdf';
		$config['max_size']             = 2048;
		$config['max_width']            = 1024;
		$config['max_height']           = 768;
		$config['file_name']           = $nombre;

		$controller->load->library('upload', $config);
		$nombrearchivo = "uploads/imagen001.jpg";

		if ( !$controller->upload->do_upload('imagen')) {
			$error = array('error' => $controller->upload->display_errors());
		} else {
			$datos = $controller->upload->data();
			$nombrearchivo = "uploads/".$datos['file_name'];
		}

		return $nombrearchivo;
	}

}

/* End of file uploader.php */
/* Location: ./application/models/uploader.php */