<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class donaciones extends CI_Controller {

	/**
	 * 
	 * @author josego
	 */
	public function __construct(){
		parent::__construct();
		$this->load->model('donaciones_m', 'donaciones');
	}
	
	/**
	 *
	 */
	public function index(){
	}	
	
	/**
	 *
	 */
	public function listarDonaciones(){
		$r = $this->donaciones->listarDonaciones();
		$v_geojson = $this->listar_donaciones($r);
		header("Content-Type:application/json", true);
		echo json_encode($v_geojson);
	}
	
	public function listarDonaciones_jsonp(){
		$r = $this->donaciones->listarDonaciones();
		$v_geojson = $this->listar_donaciones($r);
		
		if(isset($_GET['callback'])){
			header("Content-Type: application/json");
			echo $_GET['callback']."(".json_encode($v_geojson).")";
		}
	}
	
	
	/*
	 * Metodos Privados.
	 */
	private function listar_donaciones($p_r){
		// Marcadores en formato GeoJSON.
		$v_geojson = array(
			'type' => 'FeatureCollection',
			'features' => array()
		);
	
		if($p_r->num_rows() > 0){
			$v_donaciones = $p_r->result();
	
			foreach($v_donaciones as $p_donacion) {	
				$v_donacion = array(
					'type' => 'Feature',
					'geometry' => array(
					    'type' => 'Point',
						'coordinates' => array($p_donacion->donacion_longitud, $p_donacion->donacion_latitud)
					),
					'properties' => array(
					    'descripcion' => $p_donacion->donacion_desc
					)
				);
				array_push($v_geojson['features'], $v_donacion);
			};
		}
		return $v_geojson;
	}
	
	/**
	 *
	 */
	public function agregarDonacion(){
		$p_donacion_desc = $this->input->post('donacion_desc', true);
		$p_donacion_latitud = $this->input->post('donacion_latitud', true);
		$p_donacion_longitud = $this->input->post('donacion_longitud', true);
		
		$v_datos = array(
			'donacion_nombre' => $p_donacion_desc,
			'donacion_latitud' => $p_donacion_latitud,
			'donacion_longitud' => $p_donacion_longitud,
		);
		
		if($this->donaciones->insertarDonacion($v_datos)){
			echo "Inserto Correctamente.";
		}else{
			 echo "NO inserto Correctamente.";
		}
	}
}
/* End of file donaciones.php */