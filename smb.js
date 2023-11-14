mapboxgl.accessToken = 'pk.eyJ1IjoiZmVpcG93ZXIiLCJhIjoiY2xrd3J2Nm95MTQ4djNubXFxZTNwOTcwcCJ9.i8v9xvkxubQWnp2Z6vkyFA';
            const map = new mapboxgl.Map({
            container: 'map',
            // Choose from Mapbox's core styles, or make your own style with Mapbox Stu dio
            style: 'mapbox://styles/feipower/clndvd7pb07xw01qih22c4sw2',
            zoom: 14,
            center: [-103.387367, 20.674337]
        });
        // Add controls
        const nav = new mapboxgl.NavigationControl();
        map.addControl(nav, 'bottom-right');

        const scale = new mapboxgl.ScaleControl({
            maxWidth: 500,
            unit: 'metric'
        });
        map.addControl(scale, 'bottom-left');

        const fullscreen = new mapboxgl.FullscreenControl();
        map.addControl(fullscreen, 'bottom-right');

        const geolocate = new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true
        });
        map.addControl(geolocate, 'bottom-right');    
        // Wait until the map has finished loading.

        function addLayers(map, idPrefix, url, sourceLayer, color, textField) {
            const layer1Id = idPrefix;
            const layer2Id = idPrefix + '2';
            const labelLayerId = idPrefix + '_labels';

            const commonLayerProperties = {
                type: 'circle',
                source: {
                    type: 'vector',
                    url: url
                },
                'source-layer': sourceLayer,
                layout: {
                    visibility: 'none'
                }
            };

            const layer1Paint = {
                'circle-radius': [
                    'interpolate', ['linear'], ['zoom'],
                    10, 10,
                    18, 30
                ],
                'circle-color': color,
                'circle-blur': 1,
                'circle-opacity': 0.6
            };

            const layer2Paint = {
                'circle-radius': [
                    'interpolate', ['linear'], ['zoom'],
                    10, 1,
                    18, 1.5
                ],
                'circle-color': color,
                'circle-stroke-color': '#ffffff',
                'circle-stroke-width': .5
            };

            const labelLayerProperties = {
                id: labelLayerId,
                type: 'symbol',
                source: {
                    type: 'vector',
                    url: url
                },
                'source-layer': sourceLayer,
                layout: {
                    'text-field': ["get", "textField"],  // This is the field from your data source that you want to display as text
                    'text-size': 12,
                    'text-allow-overlap': false,
                    visibility: 'none'
                },
                paint: {
                    'text-color': '#ffffff'
                    }
                };

            map.addLayer({
                id: layer1Id,
                paint: layer1Paint,
                ...commonLayerProperties
                });
            map.addLayer({
                id: layer2Id,
                paint: layer2Paint,
                ...commonLayerProperties
                });
            map.addLayer({
                labelLayerProperties
                });
            }

        // Define your unique layer values
        const layerData = [
            { idPrefix: 'routers', url: 'mapbox://feipower.3t693rkq', sourceLayer: 'Modems_Mageova_ubi-6d2ukr', color: '#0af3fd', textField: 'nom_estab'},
            { idPrefix: 'tiendasdeautoservicio', url: 'mapbox://feipower.b73pzax7', sourceLayer: 'AreasInteres_DENUE_TiendasdeA-8z1j9j', color: '#FFC0CB', textField: 'nom_estab'}, // Listo // Light Pink
            { idPrefix: 'tiendasdepartamentales', url: 'mapbox://feipower.77xd6zp1', sourceLayer: 'AreasInteres_DENUE_TiendasDep-2ekexf', color: '#90EE90', textField: 'nom_estab'}, // Listo // Light Green
            { idPrefix: 'tiendasdeconveniencia', url: 'mapbox://feipower.6446s0dr', sourceLayer: 'AreasInteres_DENUE_TiendasdeC-7609vw', color: '#ADD8E6', textField: 'nom_estab'}, // Listo // Light Blue
            { idPrefix: 'tiendasdeconveniencia', url: 'mapbox://feipower.6446s0dr', sourceLayer: 'AreasInteres_DENUE_TiendasdeC-7609vw', color: '#FFFFE0', textField: 'nom_estab'}, // Listo // Light Blue
            { idPrefix: 'restaurantes', url: 'mapbox://feipower.1gf36kl8', sourceLayer: 'AreasInteres_DENUE_Restaurant-7kx24e', color: '#FFD700', textField: 'nom_estab'}, // Listo // Light Yellow
            { idPrefix: 'cafeterias', url: 'mapbox://feipower.d1j2xswb', sourceLayer: 'AreasInteres_DENUE_Cafeterias-70nmnk', color: '#FFA07A', textField: 'nom_estab'}, // Pendiente // Gold
            { idPrefix: 'baresycentrosnocturnos', url: 'mapbox://feipower.2vlw4rfx', sourceLayer: 'AreasInteres_DENUE_Bares-ct21mi', color: '#E0FFFF', textField: 'nom_estab'}, // Listo // Light Salmon
            { idPrefix: 'hospitalesyclinicas', url: 'mapbox://feipower.9kisy3u8', sourceLayer: 'AreasInteres_DENUE_Hospitales-339bv0', color: '#F0E68C', textField: 'nom_estab'}, // Listo // Light Cyan
            { idPrefix: 'farmacias', url: 'mapbox://feipower.25flyp1r', sourceLayer: 'AreasInteres_DENUE_Farmacias-28ohyb', color: '#FFB6C1', textField: 'nom_estab'}, // Listo // Khaki
            { idPrefix: 'clinicasveterinarias', url: 'mapbox://feipower.56m4exnr', sourceLayer: 'AreasInteres_DENUE_Veterinari-9yhsng', color: '#FFDEAD', textField: 'nom_estab'}, // Listo // Light Pink
            { idPrefix: 'bancos', url: 'mapbox://feipower.d5edjmxq', sourceLayer: 'AreasInteres_DENUE_BancosCaje-a7hrke', color: '#B0C4DE', textField: 'nom_estab'}, // Nabajo White
            { idPrefix: 'cajerosautomaticos', url: 'mapbox://feipower.08j9z8rt', sourceLayer: 'AreasInteres_DENUE_CajerosAut-ab9kft', color: '#FFDAB9', textField: 'nom_estab'}, // Listo // Light steel blue
            { idPrefix: 'centrosreligiosos', url: 'mapbox://feipower.85vb8wmo', sourceLayer: 'AreasInteres_DENUE_CentrosRel-ap3ifi', color: '#FFE4E1', textField: 'nom_estab'}, // Listo // Peach Puff
            { idPrefix: 'hoteles', url: 'mapbox://feipower.8tksnbko', sourceLayer: 'AreasInteres_DENUE_Hoteles-0bk2gm', color: '#FFE4B5', textField: 'nom_estab'}, // Listo // Misty Rose
            { idPrefix: 'casinos', url: 'mapbox://feipower.24nzqwf8', sourceLayer: 'AreasInteres_DENUE_Casinos-3bg0r6', color: '#FFF0F5', textField: 'nom_estab'}, // Listo // Moccasin
            { idPrefix: 'gimnasios', url: 'mapbox://feipower.49w96ugw', sourceLayer: 'AreasInteres_DENUE_Gimnasios-6pwur7', color: '#FFF5EE', textField: 'nom_estab'}, // Listo // Lavender Blush
            { idPrefix: 'academiasdeportivas', url: 'mapbox://feipower.30t6n6zt', sourceLayer: 'AreasInteres_DENUE_AcademiasD-8n5h9t', color: '#D8BFD8', textField: 'nom_estab'}, // Listo // Seashell
            { idPrefix: 'camposdegolf', url: 'mapbox://feipower.4tdim1p6', sourceLayer: 'AreasInteres_DENUE_CamposdeGo-3hz7aw', color: '#FFFACD', textField: 'nom_estab'}, // Listo // Thistle
            { idPrefix: 'boliches', url: 'mapbox://feipower.1fmas4kg', sourceLayer: 'AreasInteres_DENUE_Boliche-0e8k5x', color: '#F5FFFA', textField: 'nom_estab'}, // Listo // Lemon Chiffon
            { idPrefix: 'escuelas', url: 'mapbox://feipower.czo2oz6g', sourceLayer: 'AreasInteres_DENUE_Escuelas-bwd3dn', color: '#FAFAD2', textField: 'nom_estab'}, // Listo // Mint Cream
            { idPrefix: 'cines', url: 'mapbox://feipower.agtk0ml1', sourceLayer: 'AreasInteres_DENUE_Cines-9zjp60', color: '#ffffff', textField: 'nom_estab'} // 
            ];

    map.on('load', () => {
        
        layerData.forEach(layer => {
            addLayers(map, layer.idPrefix, layer.url, layer.sourceLayer, layer.color, layer.textField);
        });
        
        layerData.forEach(layer => {
            document.getElementById('toggle' + layer.idPrefix.charAt(0).toUpperCase() + layer.idPrefix.slice(1)).addEventListener('change', function(e) {
                const isChecked = e.target.checked;
                const visibility = isChecked ? 'visible' : 'none';
                map.setLayoutProperty(layer.idPrefix, 'visibility', visibility);
                map.setLayoutProperty(layer.idPrefix + '2', 'visibility', visibility);
                map.setLayoutProperty(layer.idPrefix  + '_labels', 'visibility', visibility);
            });
        });
        // Data driven Routers Mageova x Impactos
        map.addLayer({
        id: 'routersximpactos',
        type: 'circle',
        source: {
            type: 'vector',
            url: 'mapbox://feipower.6me6mt6v'
        },
        'source-layer': 'Routers_Impactos_Agosto2023_i-amvi6f',
        layout: {
            visibility: 'none'
        },
        paint: {
        'circle-radius': [
            'interpolate',
            ['linear'],
            ['get', 'Impacts_num'],
            1,1,
            4000,100     
        ],
        'circle-color': [
            'interpolate',
            ['linear'],
            ['get', 'Impacts_num'],
            1,'#ffffff',
            4000,'#0af3fd'     
        ],
        'circle-opacity': 0.6 
            }
        });
        map.addLayer({
            id: 'aicm_t1',
            type: 'fill',
            source: {
                type: 'vector',
                url: 'mapbox://feipower.4y1dop2e'
            },
            'source-layer': 'AICM_T1_Indoor_pasajeros_v3_l-a6ubn9',
            layout: {
                visibility: 'none'
            },
            paint: {
                'fill-color': '#ffffff'
            }
            });

        map.addLayer({
            id: 'nsezp',
            type: 'fill',
            source: {
                type: 'vector',
                url: 'mapbox://feipower.aabqq35u'
            },
            'source-layer': 'ZP_NSE_Guadalajara-215zdx',
            layout: {
                visibility: 'none'
            },
            paint: {
                'fill-color': [
                    'match',
                    ['get', 'Ageburbf_1'],
                    "('A/B', 1)", '#DF3AF0',
                    "('C+', 2)", '#9E40F7',
                    "('C', 3)", '#3823d0',
                    "('C-', 4)", '#5946e0',
                    "('D+', 5)", '#8072e7',
                    "('D-', 6)", '#a79def',
                    "('E', 7)", '#cfc9f6',
                    '#000000' 
            ],
                'fill-opacity': 0.5
            }
            });
        map.addLayer({
            id: 'nsezp-labels',
            type: 'symbol',
            source: {
                type: 'vector',
                url: 'mapbox://feipower.aabqq35u'
            },
            'source-layer': 'ZP_NSE_Guadalajara-215zdx',
            layout: {
                'text-field': [
                    'match',
                    ['get', 'Ageburbf_1'],
                    "('A/B', 1)", 'A/B',
                    "('C+', 2)", 'C+',
                    "('C', 3)", 'C',
                    "('C-', 4)", 'C-',
                    "('D+', 5)", 'D+',
                    "('D-', 6)", 'D-',
                    "('E', 7)", 'E',
                    ''  // Default label for unmatched values
                ],
                'text-size': 12,  // Adjust as needed
                'text-allow-overlap': false,  // This ensures text doesn't overlap with other features
                visibility: 'none'
            },
            paint: {
                'text-color': '#FFFFFF'  // Adjust text color as needed
            }
        });
        map.addLayer({
            id: 'zonasimu_aicm',
            type: 'fill',
            source: {
                type: 'vector',
                url: 'mapbox://feipower.7gd8thcw'
            },
            'source-layer': 'AICM_T1_ZonasIMU-21773l',
            layout: {
                visibility: 'none'
            },
            paint: {
                'fill-color': [
                    'match',
                    ['get', 'id'],
                    4, '#DF3AF0',
                    3, '#9E40F7',
                    2, '#3823d0',
                    8, '#8072e7',
                    9, '#a79def',
                    10, '#cfc9f6',
                    11, '#5946e0',
                    '#000000' 
            ],
                'fill-opacity': 0.5
            }
            });
            map.addLayer({
            id: 'zonasimu_aicm_labels',
            type: 'symbol',
            source: {
                type: 'vector',
                url: 'mapbox://feipower.7gd8thcw'
            },
            'source-layer': 'AICM_T1_ZonasIMU-21773l',
            layout: {
                'text-field': [
                    'match',
                    ['get', 'id'],
                    4, 'D',
                    3, 'Internacional (Duty Free)',
                    2, 'C (Circuito de frecuencia)',
                    8, 'B (Circuito de frecuencia)',
                    9, 'Zona Golfo',
                    10, 'A',
                    11, 'Llegadas internacionales (PB)',
                    '' // Default label for unmatched values
                ],
                'text-size': 12,  // Adjust as needed
                'text-allow-overlap': false,  // This ensures text doesn't overlap with other features
                visibility: 'none'
            },
            paint: {
                'text-color': '#ffffff'
            }
            });
            map.addLayer({
            id: 'hm_prueba_aicm',
            type: 'raster',
            source: {
                type: 'raster',
                url: 'mapbox://feipower.8qgt99so'
            },
            layout: {
                visibility: 'none'
            }
            });

    });

        // Array of ids
        const ids = [
            'Centroscomerciales',
            'Tiendasdeautoservicio',
            'Tiendasdepartamentales',
            'Tiendasdeconveniencia',
            'Restaurantes',
            'Cafeterias',
            'Baresycentrosnocturnos',
            'Hospitalesyclinicas',
            'Farmacias',
            'Clinicasveterinarias',
            'Bancos',
            'Cajerosautomaticos',
            'Centrosreligiosos',
            'Hoteles',
            'Casinos',
            'Gimnasios',
            'Academiasdeportivas',
            'Camposdegolf',
            'Boliches',
            'Escuelas',
            'Cines',
            'Routers'
        ];

        ids.forEach(id => {
            document.getElementById(`toggle${id}`).addEventListener('change', function() {
                toggleLayer([id.toLowerCase(), `${id.toLowerCase()}2`], this.checked);
            });
        });

        // Minimize/maximize the layer control panel when the button is clicked
        document.getElementById('toggle-panel').addEventListener('click', function() {
            const panel = document.getElementById('layer-control-panel');
            if (panel.classList.contains('minimized')) {
                panel.classList.remove('minimized');
                this.textContent = 'Ocultar';
            } else {
                panel.classList.add('minimized');
                this.textContent = 'Mostrar';
            }
        });
        function changeCenter(longitude, latitude) {
            map.setCenter([longitude, latitude]);
            }

        document.getElementById('citySelector').addEventListener('change', function() {
        switch (this.value) {
            case '1':
                changeCenter(-103.387367, 20.674337);
                break;
            case '2':
                changeCenter(-99.154859, 19.432906);
                break;
            case '3':
                changeCenter(-100.317348, 25.680067);
                break;
            case '4':
                map.jumpTo({
                    center: [-99.0824421557251, 19.435410970889258],
                    zoom: 17
                    });
                    break;
            }
        });

        document.getElementById('toggleRoutersximpactos').addEventListener('change', function() {
            let visibility = map.getLayoutProperty('routersximpactos', 'visibility');
            
            if (visibility === 'visible') {
                map.setLayoutProperty('routersximpactos', 'visibility', 'none');
            } else {
                map.setLayoutProperty('routersximpactos', 'visibility', 'visible');
            }
        });
        document.getElementById('toggleNseZP').addEventListener('change', function() {
            let visibility = map.getLayoutProperty('nsezp', 'visibility');
            
            if (visibility === 'visible') {
                map.setLayoutProperty('nsezp', 'visibility', 'none');
            } else {
                map.setLayoutProperty('nsezp', 'visibility', 'visible');
            }
        });
        document.getElementById('toggleNseZP').addEventListener('change', function() {
            let visibility = map.getLayoutProperty('nsezp-labels', 'visibility');
            
            if (visibility === 'visible') {
                map.setLayoutProperty('nsezp-labels', 'visibility', 'none');
            } else {
                map.setLayoutProperty('nsezp-labels', 'visibility', 'visible');
            }
        });
        document.getElementById('toggleAICM_t1').addEventListener('change', function() {
            let visibility = map.getLayoutProperty('aicm_t1', 'visibility');
            
            if (visibility === 'visible') {
                map.setLayoutProperty('aicm_t1', 'visibility', 'none');
            } else {
                map.setLayoutProperty('aicm_t1', 'visibility', 'visible');
            }
        });
        document.getElementById('togglezonasimu_aicm').addEventListener('change', function() {
            let visibility = map.getLayoutProperty('zonasimu_aicm', 'visibility');
            
            if (visibility === 'visible') {
                map.setLayoutProperty('zonasimu_aicm', 'visibility', 'none');
            } else {
                map.setLayoutProperty('zonasimu_aicm', 'visibility', 'visible');
            }
        });
        document.getElementById('togglezonasimu_aicm').addEventListener('change', function() {
            let visibility = map.getLayoutProperty('zonasimu_aicm_labels', 'visibility');
            
            if (visibility === 'visible') {
                map.setLayoutProperty('zonasimu_aicm_labels', 'visibility', 'none');
            } else {
                map.setLayoutProperty('zonasimu_aicm_labels', 'visibility', 'visible');
            }
        });
        document.getElementById('togglehm_prueba_aicm').addEventListener('change', function() {
            let visibility = map.getLayoutProperty('hm_prueba_aicm', 'visibility');
            
            if (visibility === 'visible') {
                map.setLayoutProperty('hm_prueba_aicm', 'visibility', 'none');
            } else {
                map.setLayoutProperty('hm_prueba_aicm', 'visibility', 'visible');
            }
        });