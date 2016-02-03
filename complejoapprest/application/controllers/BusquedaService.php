<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . '/libraries/REST_Controller.php';

class BusquedaService extends REST_Controller {

	public function __construct() {
		parent::__construct();
		$this->load->model('busquedaModel');
		$this->load->library('email');
	}

	public function realizarBusqueda_get() {
		$tipo = $this->get('tipobusqueda');
		$textobusqueda = $this->get('textobusqueda');

		$complejos = $this->busquedaModel->obtenerResultados($textobusqueda, $tipo);

		if($complejos === NULL) {
			$this->response(array("response"=>"Hay un error en la consulta"), 412);
		}

		$this->response(array("response"=>$complejos), 200);
	}

	public function enviar_get() {
		$config['protocol'] = 'smtp';
	    $config['smtp_host'] = 'ssl://smtp.gmail.com';
	    $config['smtp_port'] = '465';
	    $config['smtp_user'] = 'saadssoft@gmail.com'; // email id
	    $config['smtp_pass'] = 'ProyectoTIS'; // email password
	    $config['mailtype'] = 'html';
	    $config['wordwrap'] = TRUE;
	    $config['charset'] = 'iso-8859-1';
	    $config['newline'] = "\r\n"; //use double quotes here
	    $this->email->initialize($config);




		    //send mail
	    $this->email->from("saadssoft@gmail.com", "beimar");
	    $this->email->to("beimar020@gmail.com");
	    $this->email->subject("umss");
	    $this->email->message("datos");
	    if ($this->email->send())
	    {
	        // mail sent
	       // $this->session->set_flashdata('msg','<div class="alert alert-success text-center">Your mail has been sent successfully!</div>');
	    	$this->response(array("response"=>"todo bien"), 200);
	        //redirect('contactform/index');
	    }
	    else
	    {
	        //error
	        // $this->session->set_flashdata('msg','<div class="alert alert-danger text-center">There is error in sending mail! Please try again later</div>');
	        // redirect('contactform/index');

	        $this->response(array("response"=>"todo mal"), 200);
	    }
	}
}

/* End of file BusquedaService.php */
/* Location: ./application/controllers/BusquedaService.php */