<?php
use Carbon\Carbon;
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . '/libraries/Carbon.php';

class Welcome extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see http://codeigniter.com/user_guide/general/urls.html
	 */
	public function index() {
		// $this->load->view('welcome_message');

		$personas = array(
			array("nombre"=>"beimar", "apellido"=>"huarachi"),
			array("nombre"=>"carlos", "apellido"=>"mamani"),
			array("nombre"=>"alison", "apellido"=>"fernandez"),
			array("nombre"=>"diego", "apellido"=>"ortiz")
			);

		foreach ($personas as $persona) {
			foreach ($persona as $key => $value) {
				echo "<br>";
				echo $key . " === " . $value;
			}
			echo "otra Persona<br>";
		}

		$timestamp = '2016-01-06 16:34:00';
		$otro = Carbon::createFromFormat('Y-m-d H:i:s', $timestamp, 'America/La_Paz');
		echo $otro->timezoneName. "<br>";

		echo "==========<br>";
		$moment = Carbon::now();
		echo "" . $moment . "<br>";
 
		echo "" . $moment->timezoneName . "<br>";
		$moment->timezone = "America/La_Paz";
		$moment->timestamp = 169957925;
		echo "" . $moment->timezoneName . "<br>";
		echo "" . $moment . "<br>";

		echo "==========<br>";


		$date = new Carbon("2016-01-06 16:34:00");
		
		$fecha = $date->copy()->addDay();
		echo "<br>" . $fecha;
		$texto = "hola '".$fecha. "'";
		echo "<br>" .$texto;
		if($date) {
			for ($i=0; $i < 4; $i++) { 
				echo "<br>";
				echo "fecha : ";
				$date->addHour();
				echo $date->toDateTimeString();
			}

		}
	}
}
