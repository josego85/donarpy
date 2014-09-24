// Variables y Objetos globales.
var v_mapa = null;

function marcarMapa(){
	// Asuncion - Paraguay.
	var v_longitud = -57.6309129;
	var v_latitud = -25.2961407;
	var v_zoom = 13;
	
	v_mapa = L.map('mapaMarcar').setView([v_latitud, v_longitud], v_zoom);
	
	// Humanitarian Style.
	L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
		maxZoom: 18,
		attribution: 'Data \u00a9 <a href="http://www.openstreetmap.org/copyright"> OpenStreetMap Contributors </a> Tiles \u00a9 HOT'
	}).addTo(v_mapa);

	// Marcar mapa.
//	L.marker(v_longitud, v_latitud], {
//		icon: greenIcon
//	}).addTo(v_mapa);
//	
//	
	
} 