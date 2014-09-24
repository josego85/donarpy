// Variables y Objetos globales.
var v_mapa = null;
//var v_cluster_marcadores = null;

function cargarMapa(){
	// Asuncion - Paraguay.
	var v_longitud = -57.6309129;
	var v_latitud = -25.2961407;
	var v_zoom = 13;
	
	v_mapa = L.map('mapa').setView([v_latitud, v_longitud], v_zoom);
	
	// Humanitarian Style.
	L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
		maxZoom: 18,
		attribution: 'Data \u00a9 <a href="http://www.openstreetmap.org/copyright"> OpenStreetMap Contributors </a> Tiles \u00a9 HOT'
	}).addTo(v_mapa);

	// Link de donde se sacan los puntos.
	// Devuelve una estructura json.
	var v_geo_json_url = "http://donarpy.proyectosbeta.net/donaciones/listarDonaciones_jsonp";
	var v_geojsonLayer = new L.GeoJSON();

    function getJson(p_data) {
        v_geojsonLayer = L.geoJson((p_data), {
            onEachFeature: onEachFeature
        }).addTo(v_mapa);
    }

    $.ajax({
        url: v_geo_json_url,
        dataType: 'jsonp',
        jsonpCallback: 'getJson',
        success: getJson
    });
    

//	var v_geojsonFeature = {
//	   	"type" : "FeatureCollection",
//	    "features" : [ {
//		    "type" : "Feature",
//		    "geometry" : {
//			    "type" : "Point",
//			    "coordinates" : [ "-57.6309129", "-25.2961407" ]
//		    },
//		    "properties" : {
//			    "descripcion" : "Tres camas, un televisor, una heladera."
//		    }
//	    },{
//		    "type" : "Feature",
//		    "geometry" : {
//			    "type" : "Point",
//			    "coordinates" : [ "-57.6309129", "-25.2961407" ]
//		    },
//		    "properties" : {
//			    "descripcion" : "Un Snes"
//		    }
//	    },{
//		    "type" : "Feature",
//		    "geometry" : {
//			    "type" : "Point",
//			    "coordinates" : [ "-57.561691", "-25.278030" ]
//		    },
//		    "properties" : {
//			    "descripcion" : "Una PC"
//		    }
//	    },{
//		    "type" : "Feature",
//		    "geometry" : {
//			    "type" : "Point",
//			    "coordinates" : [ "-57.521160", "-25.335239" ]
//		    },
//		    "properties" : {
//			    "descripcion" : "Una heladera"
//		    }
//	    }]
//	};
//	
//	// Layer GeoJSON.
//	var v_geojsonLayer = L.geoJson(v_geojsonFeature, {
//		onEachFeature: onEachFeature
//	});
	
//	// Cluster de marcadores.
//	v_cluster_marcadores = L.markerClusterGroup();					// Se crea un cluster group.
//	v_cluster_marcadores.addLayer(v_geojsonLayer); 					// Agrega el Layer GEOJSON al cluster group.
//	v_mapa.addLayer(v_cluster_marcadores);							// Agrega el cluster group al mapa.

	function onEachFeature(p_feature, p_layer) {
		if (p_feature.properties) {
            var v_popupString = '<div class="popup">';
            
            for(var k in p_feature.properties) {
                var v = p_feature.properties[k];
                
                if(k == 'descripcion'){
                	k = 'Descripci&oacute;n';
                }
                v_popupString += '<b>' + k + '</b>: ' + v + '<br />';
            }
            v_popupString += '</div>';
            p_layer.bindPopup(v_popupString);
        }
	}
} 