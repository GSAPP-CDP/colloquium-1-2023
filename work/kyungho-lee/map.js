const layerTypes = {
    'fill': ['fill-opacity'],
    'line': ['line-opacity'],
    'circle': ['circle-opacity', 'circle-stroke-opacity'],
    'symbol': ['icon-opacity', 'text-opacity'],
    'raster': ['raster-opacity'],
    'fill-extrusion': ['fill-extrusion-opacity']
}
const alignments = {
    'left': 'lefty',
    'center': 'centered',
    'right': 'righty'
}

/**
 * Main 'story' and header/footer
 */
const story = document.querySelector('#story');
const header = document.querySelector('#header');
const footer = document.querySelector('#footer');
header.classList.add(config.theme);
footer.classList.add(config.theme);

/**
 * Features
 */
const features = document.createElement('div');
features.classList.add(alignments[config.alignment]);
features.setAttribute('id', 'features');

config.chapters.forEach((record, idx) => {
    const container = document.createElement('div');
    const chapter = document.createElement('div');
    // Creates the title for the vignettes
    if (record.title) {
        const title = document.createElement('h3');
        title.innerText = record.title;
        chapter.appendChild(title);
    }
    // Creates the image for the vignette
    if (record.image) {
        const image = new Image();
        image.src = record.image;
        chapter.appendChild(image);
    }
    // Creates the description for the vignette
    if (record.description) {
        const story = document.createElement('p');
        story.innerHTML = record.description;
        chapter.appendChild(story);
    }
    // Sets the id for the vignette and adds the step css attribute
    container.setAttribute('id', record.id);
    container.classList.add(alignments[record.alignment])
    container.classList.add('step');
    if (idx === 0) {
        container.classList.add('active');
    }
    // Sets the overall theme to the chapter element
    chapter.classList.add(config.theme);
    container.appendChild(chapter);
    features.appendChild(container);
});
// Appends the features element (with the vignettes) to the story element
story.insertBefore(features, footer);



/**
 * Mapbox & Scrollama
 */
mapboxgl.accessToken = config.accessToken;
const transformRequest = (url) => {
    const hasQuery = url.indexOf("?") !== -1;
    const suffix = hasQuery ? "&pluginName=journalismScrollytelling" : "?pluginName=journalismScrollytelling";
    return {
        url: url + suffix
    }
}

const map = new mapboxgl.Map({
    container: 'map',
    style: config.style,
    center: config.chapters[0].location.center,
    zoom: config.chapters[0].location.zoom,
    bearing: config.chapters[0].location.bearing,
    pitch: config.chapters[0].location.pitch,
    scrollZoom: false,
    transformRequest: transformRequest
});

// Instantiates the scrollama function
const scroller = scrollama();

map.on('load', function () {
     // This is the function that finds the first symbol layer
    const layers = map.getStyle().layers;
    var firstSymbolId;
    for (let i = 0; i < layers.length; i++) {
        // console.log(layers[i].id);
        if (layers[i].type === 'symbol') {
            firstSymbolId = layers[i].id;
            break;
        }
    }

    map.addLayer({
        'id': 'places_reviews',
        'type': 'circle',
        'source': {
            'type': 'geojson',
            'data': 'data/places_reviews.geojson'
        },
        'paint': {
            'circle-color': '#ff7f50',
            'circle-stroke-color': '#4d4d4d',
            'circle-stroke-width': 0.5,
            'circle-radius': ['step', ['get', 'user_ratings_total'],
                5,
                15, 10,
                30, 15,
                60, 20,
                90, 30,
                120, 40,
                150, 50],
            'circle-opacity': 0,
            'circle-stroke-opacity': 0
        }
    });

    map.addLayer({
        'id': 'priceData_2016',
        'type': 'fill',
        'source': {
            'type': 'geojson',
            'data': 'data/land_price.geojson'
        },
        'paint': {
            'fill-color': ['step', ['get', 'Price_2016'],
                '#ebffd7', 
                2000, '#e0e49d',
                5000, '#e3c464',
                8000, '#ed9d35',
                11000, '#f86c1e',
                14000, '#ff002a'],
            'fill-opacity': ['case', ['==', ['get', 'Price_2016'], null], 0, 0]
        }
    }, 'waterway');

    map.addLayer({
        'id': 'priceData_2020',
        'type': 'fill',
        'source': {
            'type': 'geojson',
            'data': 'data/land_price.geojson'
        },
        'paint': {
            'fill-color': ['step', ['get', 'Price_2020'],
                '#ebffd7', 
                1000, '#e0e49d',
                3000, '#e3c464',
                5000, '#ed9d35',
                7000, '#f86c1e',
                9000, '#ff002a'],
            'fill-opacity': ['case', ['==', ['get', 'Price_2020'], null], 0, 0]
        }
    }, 'waterway');

    map.addLayer({
        'id': 'attractions',
        'type': 'fill',
        'source': {
            'type': 'geojson',
            'data': 'data/attractions.geojson'
        },
        'paint': {
            'fill-color': '#eeeeee',
            'fill-opacity': 1
        }
    }, 'priceData_2020');

    map.addLayer({
        'id': 'attractions_line',
        'type': 'line',
        'source': {
            'type': 'geojson',
            'data': 'data/attractions_line.geojson'
        },
        'paint': {
            'line-color': '#666666',
            'line-width': 1,
            'line-opacity': 1,
            'line-dasharray': [2, 2]
        }
    });

    map.addLayer({
        'id': 'gyeonglidan_gil',
        'type': 'line',
        'source': {
            'type': 'geojson',
            'data': 'data/gyeonglidan_gil.geojson'
        },
        'paint': {
            'line-color': '#666666',
            'line-width': 2,
            'line-opacity': 0
        }
    }, 'road-rail');

    map.addLayer({
        'id': 'streets_distance_attractions',
        'type': 'line',
        'source': {
            'type': 'geojson',
            'data': 'data/streets_distance_attractions.geojson'
        },
        'paint': {
            'line-color': ['step', ['get', 'distance_attractions'],
                '#25b72b', 
                2350, '#74a800',
                2900, '#a39400',
                3450, '#ca7900',
                4000, '#ea5400',
                4550, '#ff002a'],
            'line-width': ['step', ['get', 'distance_attractions'],
                2, 
                2350, 1.8,
                2900, 1.6,
                3450, 1.4,
                4000, 1.2,
                4550, 1],
            'line-opacity': ['case', ['==', ['get', 'distance_attractions'], null], 0, 0]
        }
    }, 'road-rail');
    
    map.addLayer({
        'id': 'streets_reviews_2016',
        'type': 'line',
        'source': {
            'type': 'geojson',
            'data': 'data/streets_reviews.geojson'
        },
        'paint': {
            'line-color': ['step', ['get', 'street_reviews'],
                '#ebffd7', 
                20, '#e0e49d',
                50, '#e3c464',
                80, '#ed9d35',
                110, '#f86c1e',
                140, '#ff002a'],
            'line-width': ['step', ['get', 'street_reviews'],
                4, 
                20, 5,
                50, 6,
                80, 7,
                110, 8,
                140, 10],
            'line-opacity': ['case', ['==', ['get', 'street_reviews'], null], 0, 0]
        }
    });

    map.addLayer({
        'id': 'streets_reviews_2020',
        'type': 'line',
        'source': {
            'type': 'geojson',
            'data': 'data/streets_reviews.geojson'
        },
        'paint': {
            'line-color': ['step', ['get', 'street_reviews'],
                '#e0e49d', 
                20, '#e3c464',
                50, '#ed9d35',
                80, '#f86c1e',
                110, '#f86c1e',
                140, '#ff002a'],
            'line-width': ['step', ['get', 'street_reviews'],
                16, 
                20, 17,
                50, 18,
                80, 19,
                110, 20,
                140, 21],
            'line-opacity': ['case', ['==', ['get', 'street_reviews'], null], 0, 0]
        }
    });


    
    // Setup the instance, pass callback functions
    scroller
        .setup({
            step: '.step',
            offset: 0.5,
            progress: true,
            preventDefault: true,
        })
        .onStepEnter(response => {
            let chapter = config.chapters.find(chap => chap.id === response.element.id);
            map.flyTo(chapter.location);
            if (chapter.onChapterEnter.length > 0) {
                chapter.onChapterEnter.forEach(setLayerOpacity);
            }
            if (chapter.legend) {
                chapter.legend.classList.remove('invisible');
            }
        })
        .onStepExit(response => {
            let chapter = config.chapters.find(chap => chap.id === response.element.id);
            if (chapter.onChapterExit.length > 0) {
                chapter.onChapterExit.forEach(setLayerOpacity);
            }
            if (chapter.legend) {
                chapter.legend.classList.add('invisible');
            }
        });
});

/* Here we watch for any resizing of the screen to
adjust our scrolling setup */
window.addEventListener('resize', scroller.resize);

function getLayerPaintType(layer) {
    const layerType = map.getLayer(layer).type;
    return layerTypes[layerType];
}
function setLayerOpacity(layer) {
    const paintProps = getLayerPaintType(layer.layer);
    paintProps.forEach(function (prop) {
        map.setPaintProperty(layer.layer, prop, layer.opacity);
    });
}