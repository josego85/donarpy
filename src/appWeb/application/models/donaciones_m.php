<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class donaciones_M extends CI_Model {
    /**
     * Modelo para manejo de las donaciones. 
     * @author josego
     */
    public function __construct(){
        parent::__construct();
    }	
    
    /**
     * Metodo para traer todas las donaciones.
     * @return unknown
     */
    public function listarDonaciones(){
    	$v_consulta = $this->db->get('donaciones');
    	return $v_consulta;
    }
    
    /**
     * Recupera la cantidad de filas (reales si se uso sql_calc_found_rows) de la ultima consulta que se haya ejecutado.
     * @return integer
     */
    public function get_cantidad_resultados(){
    	return $this->db->query('select FOUND_ROWS() as found_rows')->row()->found_rows;
    }
    
    /**
     * 
     * @param Array $p_datos
     * @return boolean
     */
    public function insertarDonacion($p_datos){
    	if($this->db->insert('donaciones', $p_datos)){
    		return $this->db->insert_id();
    	}
    	return false;
    	
    }
}
/* End of donaciones_m.php */
