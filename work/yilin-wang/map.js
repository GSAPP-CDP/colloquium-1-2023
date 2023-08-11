mapboxgl.accessToken = 'pk.eyJ1Ijoiam9zaHdvbmciLCJhIjoiY2xra2JzYmMwMDRoODNkbW01cWQ5a3YxZyJ9.9FkG10VE5UOlc6BZhD2_zA';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/joshwong/cll14ij3900u101qpdml9a1u2',
    zoom: 10,
    center: [-74, 40.725],
    maxZoom: 15,
    minZoom: 8,
    maxBounds: [[-74.45, 40.45],[-73.55, 41]]
});

/* First, create two variables that will hold:
1. The different types of layers available to Mapbox and their respective
opacity attributes
2. The possible alignments which could be applied to the vignettes */
var layerTypes = {
    'fill': ['fill-opacity'],
    'line': ['line-opacity'],
    'circle': ['circle-opacity', 'circle-stroke-opacity'],
    'symbol': ['icon-opacity', 'text-opacity'],
    'raster': ['raster-opacity'],
    'fill-extrusion': ['fill-extrusion-opacity']
}
var alignments = {
    'left': 'lefty',
    'center': 'centered',
    'right': 'righty'
}

/* These two functions help turn on and off individual layers (through their
opacity attributes):
The first one gets the type of layer (from a name specified on the config.js file)
The second one adjusts the layer's opacity */
function getLayerPaintType(layer) {
    var layerType = map.getLayer(layer).type;
    return layerTypes[layerType];
}
function setLayerOpacity(layer) {
    var paintProps = getLayerPaintType(layer.layer);
    paintProps.forEach(function (prop) {
        map.setPaintProperty(layer.layer, prop, layer.opacity);
    });
}

/* Next, these variables and functions create the story and vignette html
elements, and populate them with the content from the config.js file.
They also assign a css class to certain elements, also based on the
config.js file */

// Main 'story' and 'features' elements
var story = document.getElementById('story');
var features = document.createElement('div');
features.classList.add(alignments[config.alignment]);
features.setAttribute('id', 'features');

// Main 'header' element
var header = document.createElement('div');

// If the content exists, assign it to the 'header' element
if (config.toptitle) {
    var toptitle = document.createElement('h4');
    toptitle.innerText = config.toptitle;
    header.appendChild(toptitle);
}
if (config.title) {
    var titleText = document.createElement('h1');
    titleText.innerText = config.title;
    header.appendChild(titleText);
}
if (config.byline) {
    var bylineText = document.createElement('p');
    bylineText.classList.add("byline");
    bylineText.innerText = config.byline;
    header.appendChild(bylineText);
}
if (config.description) {
    var descriptionText = document.createElement('p');
    descriptionText.innerHTML = config.description;
    header.appendChild(descriptionText);
}

// If the header has anything in it, it gets appended to the story
if (header.innerText.length > 0) {
    header.classList.add(config.theme);
    header.setAttribute('id', 'header');
    story.appendChild(header);
}

/* After building the elements and assigning content to the header these
functions will loop through the chapters in the config.js file,
create the vignette elements and assign them their respective content */

config.chapters.forEach((record, idx) => {
    /* These first two variables will hold each vignette, the chapter
    element will go in the container element */
    var container = document.createElement('div');
    var chapter = document.createElement('div');
    // Creates the title for the vignettes
    if (record.title) {
        var title = document.createElement('h3');
        title.innerText = record.title;
        chapter.appendChild(title);
    }
    // Creates the image for the vignette
    if (record.image) {
        var image = new Image();
        image.src = record.image;
        chapter.appendChild(image);
    }
    // Creates the image credit for the vignette
    if (record.imageCredit) {
        var imageCredit = document.createElement('p');
        imageCredit.classList.add('imageCredit');
        imageCredit.innerHTML = 'Image credit: ' + record.imageCredit;
        chapter.appendChild(imageCredit);
    }
    // Creates the description for the vignette
    if (record.description) {
        var story = document.createElement('p');
        story.innerHTML = record.description;
        chapter.appendChild(story);
    }
    // Sets the id for the vignette and adds the step css attribute
    container.setAttribute('id', record.id);
    container.classList.add('step');
    if (idx === 0) {
        container.classList.add('active');
    }
    // Sets the overall theme to the chapter element
    chapter.classList.add(config.theme);
    /* Appends the chapter to the container element and the container
    element to the features element */
    container.appendChild(chapter);
    features.appendChild(container);
});

// Appends the features element (with the vignettes) to the story element
story.appendChild(features);

/* Next, this section creates the footer element and assigns it
its content based on the config.js file */

var footer = document.createElement('div');
// This assigns all the content to the footer element
if (config.footer) {
    var footerText = document.createElement('p');
    footerText.innerHTML = config.footer + '<br>' + config.footerAttribution;
    footer.appendChild(footerText);
}
// If the footer element contains any content, add it to the story
if (footer.innerText.length > 0) {
    footer.classList.add(config.theme);
    footer.setAttribute('id', 'footer');
    story.appendChild(footer);
}

// Adds the Mapbox access token
mapboxgl.accessToken = config.accessToken;

// Honestly, don't know what this does
const transformRequest = (url) => {
    const hasQuery = url.indexOf("?") !== -1;
    const suffix = hasQuery ? "&pluginName=journalismScrollytelling" : "?pluginName=journalismScrollytelling";
    return {
        url: url + suffix
    }
}

/* This section creates the map element with the
attributes from the main section of the config.js file */

var map = new mapboxgl.Map({
    container: 'map',
    style: config.style,
    center: config.chapters[0].location.center,
    zoom: config.chapters[0].location.zoom,
    bearing: config.chapters[0].location.bearing,
    pitch: config.chapters[0].location.pitch,
    scrollZoom: true,
    transformRequest: transformRequest
});

// Instantiates the scrollama function
var scroller = scrollama();

/* Here we add the two extra layers we are using, just like in our previous
tutorial. At the end, however, we setup the functions that will tie the
scrolling to the chapters and move the map from one location to another
while changing the zoom level, pitch and bearing */

map.on('load', function () {
    var layers = map.getStyle().layers;
    var firstSymbolId;
    for (var i=0; i<layers.length; i++){
        if (layers[i].type === 'symbol'){
            firstSymbolId = layers[i].id;
            break;
        }
    }
    
    map.addLayer({
        'id': 'Subway_Entrances',
        'type': 'circle',
        'source': {
            'type': 'geojson',
            'data': 'data/Subway Entrances.geojson'
        },
        'paint': {
            'circle-color': '#edde61',
            'circle-stroke-color': '#4d4d4d',
            'circle-stroke-width': 0.5,
            'circle-opacity': 0,
            'circle-stroke-opacity': 0,
        },
        'circle-radius': [
            'interpolate',
            ['linear'],
            ['zoom'],
            10, 15, // 当zoom为10时，半径为5
            15, 35  // 当zoom为15时，半径为15
        ],
        
    }, firstSymbolId);

    map.addLayer({
        'id': 'taxi_mapping',
        'type': 'fill',
        'source': {
            'type': 'geojson',
            'data': 'data/taxi_mapping.geojson'
        },
        'paint': {
            'fill-color': ['interpolate', ['linear'], ['get', 'counts'],
                2, '#4966a0',
                6, '#adcbf9',
                100, '#fdf455',
                500, '#ea7f01',
                2000, '#dd2800',
            ],
            'fill-opacity': 0,
        }
    }, firstSymbolId);

    map.addLayer({
        'id': 'bike_mapping',
        'type': 'fill',
        'source': {
            'type': 'geojson',
            'data': 'data/bike_mapping.geojson'
        },
        'paint': {
            'fill-color': ['interpolate', ['linear'], ['get', 'counts'],
                3, '#4966a0',
                34, '#adcbf9',
                516, '#fdf455',
                1032, '#ea7f01',
                2000, '#dd2800',
            ],
            'fill-opacity': 0,
        }
    }, firstSymbolId);

    map.addLayer({
        'id': 'bus_mapping',
        'type': 'heatmap',
        'source': {
            'type': 'geojson',
            'data': 'data/bus_mapping.geojson'
        },
        'maxzoom': 11,
        'paint': {
            // Increase the heatmap weight based on frequency and property magnitude
            'heatmap-weight': [
                'interpolate',
                ['linear'],
                ['get', 'counts'], // Assuming 'counts' is the property name in your GeoJSON
                0, 0,
                10, 1
            ],
            // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
            'heatmap-color': [
                'interpolate',
                ['linear'],
                ['heatmap-density'],
                0.0, '#4966a0',
                0.2, '#adcbf9',
                0.4, '#fef454',
                0.6, '#ea7f01',
                0.8, '#ea7f01',
                1.0, '#e42a00'
            ],
            'heatmap-opacity': 0.2,
        }
    }, firstSymbolId);
    
    map.addLayer({
        'id': 'subway_mapping',
        'type': 'fill-extrusion',
        'source': {
            'type': 'geojson',
            'data': 'data/subway_mapping.geojson'
        },
        'paint': {
            'fill-extrusion-color': ['interpolate', ['linear'], ['get', 'counts'],
                0, '#4966a0',
                1, '#adcbf9',
                3, '#fef454',
                6, '#ea7f01',
                8, '#e42a00',
            ],
            'fill-extrusion-height': [
                'interpolate',
                ['linear'],
                ['get', 'counts'],
                0, 0,
                1, 1000,
                3, 2000,
                6, 4000,
                8, 7000
            ],
            'fill-extrusion-opacity': 0,
            'fill-extrusion-base': 0,
        }
    }, firstSymbolId);

    map.addLayer({
        'id': 'hex_binning',
        'type': 'fill-extrusion',
        'source': {
            'type': 'geojson',
            'data': 'data/MN_Hex_Binning.geojson'
        },
        'paint': {
            'fill-extrusion-color': ['interpolate', ['linear'], ['get', 'Entrances_in_Equal_Area_Binning'],
                0, '#e2d392',
                5, '#ebd088',
                10, '#e4a850',
                15, '#de7d14',
                20, '#d16b01',
            ],
            'fill-extrusion-opacity': [
                'step',
                ['get', 'Entrances_in_Equal_Area_Binning'],
                0, 0,// 默认值
                5, 1 // 当'Entrances_in_Equal_Area_Binning'大于或等于0.1时，透明度为1
            ],
            'fill-extrusion-height': [
                'interpolate',
                ['linear'],
                ['get', 'Entrances_in_Equal_Area_Binning'],
                0, 0,
                5, 1000,
                10, 2000,
                15, 4000,
                20, 7000
            ],
            'fill-extrusion-opacity': 0,
            'fill-extrusion-base': 0,
        }
    }, firstSymbolId);

    map.addLayer({
        'id': 'MN_105_mobility1',
        'type': 'line',
        'source': {
            'type': 'geojson',
            'data': 'data/MN_105_walkability1.geojson'
        },
        'layout': {
            'line-join': 'round',
            'line-cap': 'round',
        },
        'paint': {
            'line-color': ['interpolate', ['linear'], ['get', 'ShortestPathLineweight'],
                450, '#cd0127',
                900, '#7e0728',
                1350, '#a83593',
                1800, '#7e5ee9',
                2250, '#6d61ed',
            ],
            'line-width': [
                'interpolate',
                ['linear'],
                ['get', 'ShortestPathLineweight'],
                450, 10,  // 0 count corresponds to 1 pixel width
                900, 8,  // 1 count corresponds to 2 pixels width
                1350, 6,  // 3 count corresponds to 4 pixels width
                1800, 4,  // 6 count corresponds to 6 pixels width
                2500, 2   // 8 count corresponds to 8 pixels width
            ],
            'line-opacity': 0
        }
    }, firstSymbolId);

    map.addLayer({
        'id': 'MN_105_mobility2',
        'type': 'line',
        'source': {
            'type': 'geojson',
            'data': 'data/MN_105_walkability2.geojson'
        },
        'layout': {
            'line-join': 'round',
            'line-cap': 'round',
        },
        'paint': {
            'line-color': ['interpolate', ['linear'], ['get', 'walkability2_lineweight'],
                360, '#cd0127',
                720, '#7e0728',
                1080, '#a83593',
                1440, '#7e5ee9',
                1800, '#6d61ed',
            ],
            'line-width': [
                'interpolate',
                ['linear'],
                ['get', 'walkability2_lineweight'],
                360, 10,  // 0 count corresponds to 1 pixel width
                720, 8,  // 1 count corresponds to 2 pixels width
                1080, 6,  // 3 count corresponds to 4 pixels width
                1440, 4,  // 6 count corresponds to 6 pixels width
                1800, 2   // 8 count corresponds to 8 pixels width
            ],
            'line-opacity': 0
        }
    }, firstSymbolId);

    map.addLayer({
        'id': 'MN_105_POI',
        'type': 'fill-extrusion',
        'source': {
            'type': 'geojson',
            'data': 'data/MN_105_O-D_POI.geojson'
        },
        'paint': {
            'fill-extrusion-color': ['interpolate', ['linear'], ['get', 'NearestStationofPOI'],
                30, '#edde9a',
                35, '#dfd090',
                45, '#8b6731',
                55, '#db7002',
                60, '#c73131',
            ],
            'fill-extrusion-height': [
                'interpolate',
                ['linear'],
                ['get', 'NearestStationofPOI'],
                30, 30,  // 0 count corresponds to 1 pixel width
                35, 100,  // 1 count corresponds to 2 pixels width
                45, 170,  // 3 count corresponds to 4 pixels width
                55, 240,  // 6 count corresponds to 6 pixels width
                60, 300   // 8 count corresponds to 8 pixels width
            ],
            'fill-extrusion-opacity': 0,
            'fill-extrusion-base': 0
        }
    }, firstSymbolId);

    map.addLayer({
        'id': 'MN_109_mobility1',
        'type': 'line',
        'source': {
            'type': 'geojson',
            'data': 'data/MN_109_walkability1.geojson'
        },
        'layout': {
            'line-join': 'round',
            'line-cap': 'round',
        },
        'paint': {
            'line-color': ['interpolate', ['linear'], ['get', 'ShortestPathLineweight'],
                450, '#cd0127',
                900, '#7e0728',
                1350, '#a83593',
                1800, '#7e5ee9',
                2250, '#6d61ed',
            ],
            'line-width': [
                'interpolate',
                ['linear'],
                ['get', 'ShortestPathLineweight'],
                450, 10,  // 0 count corresponds to 1 pixel width
                900, 8,  // 1 count corresponds to 2 pixels width
                1350, 6,  // 3 count corresponds to 4 pixels width
                1800, 4,  // 6 count corresponds to 6 pixels width
                2500, 2   // 8 count corresponds to 8 pixels width
            ],
            'line-opacity': 0
        }
    }, firstSymbolId);

    map.addLayer({
        'id': 'MN_109_mobility2',
        'type': 'line',
        'source': {
            'type': 'geojson',
            'data': 'data/MN_109_walkability2.geojson'
        },
        'layout': {
            'line-join': 'round',
            'line-cap': 'round',
        },
        'paint': {
            'line-color': ['interpolate', ['linear'], ['get', 'walkability2_lineweight'],
                450, '#cd0127',
                900, '#7e0728',
                1350, '#a83593',
                1800, '#7e5ee9',
                2300, '#6d61ed',
            ],
            'line-width': [
                'interpolate',
                ['linear'],
                ['get', 'walkability2_lineweight'],
                450, 10,  // 0 count corresponds to 1 pixel width
                900, 8,  // 1 count corresponds to 2 pixels width
                1350, 6,  // 3 count corresponds to 4 pixels width
                1800, 4,  // 6 count corresponds to 6 pixels width
                2300, 2   // 8 count corresponds to 8 pixels width
            ],
            'line-opacity': 0
        }
    }, firstSymbolId);

    map.addLayer({
        'id': 'MN_109_POI',
        'type': 'fill-extrusion',
        'source': {
            'type': 'geojson',
            'data': 'data/MN_109_O-D_POI.geojson'
        },
        'paint': {
            'fill-extrusion-color': ['interpolate', ['linear'], ['get', 'NearestStationofPOI'],
                30, '#edde9a',
                35, '#dfd090',
                45, '#8b6731',
                55, '#db7002',
                60, '#c73131',
            ],
            'fill-extrusion-height': [
                'interpolate',
                ['linear'],
                ['get', 'NearestStationofPOI'],
                30, 30,  // 0 count corresponds to 1 pixel width
                35, 100,  // 1 count corresponds to 2 pixels width
                45, 170,  // 3 count corresponds to 4 pixels width
                55, 240,  // 6 count corresponds to 6 pixels width
                60, 300   // 8 count corresponds to 8 pixels width
            ],
            'fill-extrusion-opacity': 0,
            'fill-extrusion-base': 0
        }
    }, firstSymbolId);


    map.addLayer({
        'id': "medianIncome",
        'type': "fill",
        'source': {
            'type': "geojson",
            'data': "data/medianIncome.geojson",
        },
        'paint': {
            'fill-color': ['step', ['get', 'MHHI'],
                '#ffffff',
                20000, '#ccedf5',
                50000, '#99daea',
                75000, '#66c7e0',
                100000, '#33b5d5',
                150000, '#00a2ca'],
        'fill-opacity': 0
        },
        
    },'waterway');
});

// Setup the instance, pass callback functions
scroller
    .setup({
        step: '.step',
        offset: 0.5,
        progress: true
    })
    .onStepEnter(response => {
        var chapter = config.chapters.find(chap => chap.id === response.element.id);
        response.element.classList.add('active');
        map.flyTo(chapter.location);
        if (config.showMarkers) {
            marker.setLngLat(chapter.location.center);
        }
        if (chapter.onChapterEnter.length > 0) {
            chapter.onChapterEnter.forEach(setLayerOpacity);
        }
    })
    .onStepExit(response => {
        var chapter = config.chapters.find(chap => chap.id === response.element.id);
        response.element.classList.remove('active');
        if (chapter.onChapterExit.length > 0) {
            chapter.onChapterExit.forEach(setLayerOpacity);
        }
    });
;

/* Here we watch for any resizing of the screen to
adjust our scrolling setup */
window.addEventListener('resize', scroller.resize);

map.on('click', 'turnstileData', function(e){
    var entriesDiff = e.features[0].properties.ENTRIES_DIFF;
    var entries_06 = e.features[0].properties.ENTRIES_06;
    var entries_20 = e.features[0].properties.ENTRIES_20;
    var stationName = e.features[0].properties.stationName;
    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML('<h4>' + stationName + '</h4>'
            + '<p><b>Friday, March 6th:</b> ' + entries_06 + ' entries<br>'
            + '<b>Friday, March 20th:</b> ' + entries_20 + ' entries<br>'
            + '<b>Change:</b> ' + Math.round(entriesDiff * 1000) / 10 + '%</p>')
        .addTo(map);
});

map.on('mouseenter', 'turnstileData', function () {
    map.getCanvas().style.cursor = 'pointer';
});

map.on('mouseleave', 'turnstileData', function () {
    map.getCanvas().style.cursor = '';
});