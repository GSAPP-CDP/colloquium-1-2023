const MapZoom = 12;
const MapCenter = [-74.03322, 40.74152];
var config = {
    style: 'mapbox://styles/kevinlib/cll5ctztl00e401mfhrnk9d39',
    accessToken: 'pk.eyJ1Ijoia2V2aW5saWIiLCJhIjoiY2pyZ3A4aWw5MWdpejN5cG8xYTFhM3dwcCJ9.aqXOtI48eIJELxrnMwkj9w',
    //projection: 'equirectangular',
    //Read more about available projections here
    //https://docs.mapbox.com/mapbox-gl-js/example/projections/
    theme: 'light',
    auto: false,
    title: false,
    subtitle: false,
    byline: false,
    footer: 'Sources: <a href="https://www.nyc.gov/site/planning/data-maps/open-data/dwn-pluto-mappluto.page">NYC Open Data MapPLUTO Dataset</a>, <a href="https://www.nyc.gov/site/planning/plans/office-reuse-task-force/office-reuse-task-force.page">NYC Office Adaptive Resuse Task Force</a><br>',
    chapters: [
        {
            id: 'slug-style-id',
            alignment: 'left',
            hidden: false,
            title: 'All the Office Buildings',
            description: '<p style="padding-top:1em;">There are <span style="font-size:1.25em"><mark>7,215</mark></span> office buildings in NYC, identified as tax lots with a building-class code corresponding to "Office Buildings".</p><p style="padding-top:1em;font-weight:200;font-size:1rem;line-height: 1.25rem;">Note: these are tax lots where the majority building type is an office building. If there are tax lots with a majority classification of another use type, such as residential, then they are not included.</p>',
            location: {
                center: MapCenter,
                zoom: MapZoom,
                pitch: 0,
                bearing: 0
            },
            legend: [
                {
                    color: '#ababab',
                    description: 'All Office Buildings'
                }
            ],
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [
                {
                    layer: 'all-offices-layer',
                    opacity: 1,
                    duration: 500
                }
            ],
            onChapterExit: [
                {
                    layer: 'all-offices-layer',
                    opacity: 0,
                    duration: 500

                }
            ]
        },
        {
            id: 'second-identifier',
            alignment: 'left',
            hidden: false,
            title: 'As-of-Right Development',
            description: '<p style="padding-top:1em;">Of those, only <span style="font-size:1.25em"><mark>3,427</mark></span> office buildings (in red) are located in a residential zoning district (outlined). They are, in theory, eligible to be converted "as-of-right", meaning they may meet regular residential zoning requirements for new construction, e.g. zoning code ZR 20-00 and the New York State Multiple Dwelling Law (MDL).<br>In reality, most of these buildings will be ruled out because they fail to meet many of the zoning/code regulations.<br><br>For example:<li>there is a residential Floor-to-Area Ratio (FAR) limit of 12</li> <li>Additionally, there must be 30ft of distance from all dwelling units to the rear lot line</li></p>',
            location: {
                center: MapCenter,
                zoom: MapZoom,
                pitch: 0,
                bearing: 0,
            },
            legend: [
                {
                    color: '#db0f00',
                    description: 'Office Buildings located in Residential Zones'
                },
                {
                    color: '#ffb69c',
                    description: 'Residential Zoning Districts'
                }
            ],
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [
                {
                    layer: 'res-zoning-offices-layer',
                    opacity: 1,
                    duration: 500
                },
                {
                    layer: 'res-zones-layer',
                    opacity: 0.3,
                    duration: 500
                }
            ],
            onChapterExit: [
                {
                    layer: 'res-zoning-offices-layer',
                    opacity: 0,
                    duration: 500

                },
                {
                    layer: 'res-zones-layer',
                    opacity: 0,
                    duration: 500
                }
            ]
        },
        {
            id: 'third-identifier',
            alignment: 'left',
            hidden: false,
            title: 'Current Alternatives: Flexible Conversion Zoning Requirements',
            description: '<p style="padding-top:1em;">There have been alternatives put in place designed to make conversion a bit easier for older buildings.<br>Namely, if the building was built before <mark>1961 and is located below 59th St.</mark> (and in certain parts of Brooklyn/Queens) or <mark>1977 and is located in the Financial District</mark>,then it may comply with a more flexible conversion code known as ZR 15-00 and MDL non-residential zoning requirements.</p>',
            location: {
                center: MapCenter,
                zoom: MapZoom,
                pitch: 0,
                bearing: 0
            },
            legend: [
                {
                    color: '#0367fc',
                    description: 'Office Buildings located in Flexible Zoning'
                },
                {
                    color: '#52f7ec',
                    description: 'Flexible Community Districts'
                }
            ],
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [
                {
                    layer: 'flex-zoning-offices-layer',
                    opacity: 1,
                    duration: 500
                },
                {
                    layer: 'flex-zones-layer',
                    opacity: 0.3,
                    duration: 500
                }
            ],
            onChapterExit: [
                {
                    layer: 'flex-zoning-offices-layer',
                    opacity: 0,
                    duration: 500

                },
                {
                    layer: 'flex-zones-layer',
                    opacity: 0,
                    duration: 500
                }
            ]
        },
        {
            id: 'fourth-identifier',
            alignment: 'left',
            hidden: false,
            title: 'Proposed Alternatives',
            description: '<p style="padding-top:1em;">A new city unit called the Adaptive Reuse Task Force was put together to investigate and strategize how to make conversions easier.<br><br>They came up with two main pathways:<br><li>Allow more buildings access by expanding eligibility to younger buildings and expanding geographic applicability (i.e. beyond lower manhattan)<br><br></li><li>Make requirements more lenient for eligible buildings such as modifying light and air requirements.</li></p>',
            location: {
                center: MapCenter,
                zoom: MapZoom,
                pitch: 0,
                bearing: 0
            },
            legend: [
                {
                    color: '#440154',
                    description: 'Buildings Built before 1961'
                },
                {
                    color: '#29af7f',
                    description: 'Buildings Built before 1977'
                },
                {
                    color: '#6ece58',
                    description: 'Buildings Built before 1990'
                },
                {
                    color: '#b5de2b',
                    description: 'Buildings Built before 2000'
                },
                {
                    color: '#fde725',
                    description: 'Buildings Built before 2020'
                }
            ],
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [
                {
                    layer: 'proposed-offices-layer',
                    opacity: 1,
                    duration: 500
                }
            ],
            onChapterExit: [
                {
                    layer: 'proposed-offices-layer',
                    opacity: 0,
                    duration: 500

                }
            ]
        }
    ]
};
