const legendPrice = document.querySelector('#legend_price');

const config = {    
  accessToken: 'pk.eyJ1Ijoia2xlZTA1MTEiLCJhIjoiY2xrYnFibnNjMGV4cjNrbzRqdGg1d21sYiJ9.nN0pE1qocGhTLnD_xPuYdg',
  style: 'mapbox://styles/klee0511/cll1kf5on00vw01p7aiwn31m9',
  theme: 'light',
  chapters: [
      {
        id: 'low_land_price',
        title: '2015 | low land price',
        image: '',
        description: `Gyeonglidan-gil is situated near the Itaewon area, which is known for its international and multicultural atmosphere. Since the rent fee was relatively cheap compared to Itaewon, Gyeonglidan-gil attracted many young enterpreneurs and creative individuals who opened businesses catering to modern tastes. This way, the area underwent a transformation from a more traditional neighborhood to a trendy and stylish corridor.<br><br>
          <div id="legend_price" class="legend">
            <h4>Land Price per m2</h4>
            <div><span style="background-color: #ff002a"></span>$14,000 +</div>
            <div><span style="background-color: #f86c1e"></span>$11,000 - $14,000</div>
            <div><span style="background-color: #ed9d35"></span>$8,000 - $11,000</div>
            <div><span style="background-color: #e3c464"></span>$5,000 - $8,000</div>
            <div><span style="background-color: #e0e49d"></span>$2,000 - $5,000</div>
            <div><span style="background-color: #ebffd7"></span>Less than $2,000</div>
          </div>`,
        location: {
          center: [126.98257, 37.53905],
          zoom: 14.9,
          pitch: 0,
          bearing: 0
        },
        alignment: 'left',
        onChapterEnter: [
          { layer: 'priceData_2016', opacity: 0.7 },
          { layer: 'gyeonglidan_gil', opacity: 1 },
        ],
        onChapterExit: [
          { layer: 'priceData_2016', opacity: 0 },
          { layer: 'gyeonglidan_gil', opacity: 0 }
        ],
      },
      {
        id: 'street_network',
        title: '2015 | proximity to attractions and subway',
        image: '',
        description: `the convenient subway access and its adjacency to urban attractions create a symbiotic relationship that propels Gyeonglidan-gil's popularity, making it a vibrant and sought-after location for both local residents and tourists.
          <div id="legend_price" class="legend">
            <h4>The sum of distances to attractions and subways</h4>
            <div><span style="background-color: #ff002a"></span>4550 m +</div>
            <div><span style="background-color: #ea5400"></span>4000 - 4550 m</div>
            <div><span style="background-color: #ca7900"></span>3450 - 4000 m</div>
            <div><span style="background-color: #a39400"></span>2900 - 3450 m</div>
            <div><span style="background-color: #74a800"></span>2350 - 2900 m</div>
            <div><span style="background-color: #25b72b"></span>Less than 2350 m</div>
          </div>`,
        location: {
          center: [126.98257, 37.53905],
          zoom: 14.9,
          pitch: 0,
          bearing: 0
      },
        alignment: 'left',
        onChapterEnter: [
          { layer: 'streets_distance_attractions', opacity: 0.7 }
        ],
        onChapterExit: [
          { layer: 'streets_distance_attractions', opacity: 0 }
        ]
      },
      {
        id: 'social_media_rise',
        title: '2015 | rise in social media trends',
        image: 'images/trends00.png',
        description: `the proximity to subways and urban attractions has likely led to increased exposure on platforms like Instagram and other social media. As visitors share their experiences online, the area gains visibility and reputation, attracting even more attention and footfall.
          <div id="legend_price" class="legend">
            <h4>The number of review posts</h4>
            <div><span style="background-color: #ff002a"></span>150 +</div>
            <div><span style="background-color: #ff5220"></span>120 - 150</div>
            <div><span style="background-color: #ff7a1d"></span>90 - 120</div>
            <div><span style="background-color: #ff9b27"></span>60 - 90</div>
            <div><span style="background-color: #ffb93c"></span>30 - 60</div>
            <div><span style="background-color: #ffd458"></span>15 - 30</div>
            <div><span style="background-color: #ffee78"></span>Less than 5</div>
          </div>`,
        location: {
          center: [126.98654, 37.54055],
          zoom: 15.6,
          pitch: 0,
          bearing: 0
        },
        alignment: 'left',
        onChapterEnter: [
          { layer: 'gyeonglidan_gil', opacity: 0.5 },
          { layer: 'places_reviews', opacity: 1 }
        ],
        onChapterExit: [
          { layer: 'gyeonglidan_gil', opacity: 0 },
          { layer: 'places_reviews', opacity: 0 }
        ]
      },
      {
        id: 'popular_district',
        title: '2015 | emerging food district',
        image: 'images/Gyeonlidan_gil.jpg',
        description: `Gyeonglidan-gil's rise as a popular food district was fueled by a combination of factors. Its strategic location in the trendy Itaewon area, known for its international atmosphere, attracted a diverse crowd seeking unique dining experiences. The influx of young entrepreneurs brought innovative concepts, leading to the opening of diverse restaurants and cafes.
          <div id="legend_price" class="legend">
            <h4>The sum of review posts on cafes in the street</h4>
            <div><span style="background-color: #ff002a"></span>140 +</div>
            <div><span style="background-color: #f86c1e"></span>110 - 140</div>
            <div><span style="background-color: #ed9d35"></span>80 - 110</div>
            <div><span style="background-color: #e3c464"></span>50 - 80</div>
            <div><span style="background-color: #e0e49d"></span>20 - 50</div>
            <div><span style="background-color: #ebffd7"></span>Less than 20</div>
          </div>`,
        location: {
            center: [126.991008, 37.537876],
            zoom: 16.5,
            pitch: 49.5,
            bearing: 48.8
        },
        alignment: 'right',
        onChapterEnter: [
          { layer: 'streets_reviews_2016', opacity: 0.65 }
        ],
        onChapterExit: [
          { layer: 'streets_reviews_2016', opacity: 0 }
        ]
      },
      {
        id: 'gentrification',
        title: '2020 | Gentrification',
        image: '',
        description: `The sudden social media fame of Gyeonglidan-gil led to a rush of entrepreneurs entering the food business scene. The area's popularity attracted newcomers, resulting in a surge of new eateries and businesses. While this diversified the food offerings and brought economic growth, it also drove up property values and commercial rents. As a consequence, longstanding businesses and residents faced displacement due to affordability challenges. This phenomenon highlights the complex interplay between social media trends, business competition, and the potential gentrification of urban areas.<br><br>
          <div id="legend_price" class="legend">
            <h4>Land Price per m2</h4>
            <div><span style="background-color: #ff002a"></span>$14,000 +</div>
            <div><span style="background-color: #f86c1e"></span>$11,000 - $14,000</div>
            <div><span style="background-color: #ed9d35"></span>$8,000 - $11,000</div>
            <div><span style="background-color: #e3c464"></span>$5,000 - $8,000</div>
            <div><span style="background-color: #e0e49d"></span>$2,000 - $5,000</div>
            <div><span style="background-color: #ebffd7"></span>Less than $2,000</div>
          </div>`,
        location: {
            center: [126.991008, 37.537876],
            zoom: 16.5,
            pitch: 49.5,
            bearing: 48.8
        },
        alignment: 'right',
        onChapterEnter: [
          { layer: 'priceData_2020', opacity: 0.7 }
        ],
        onChapterExit: [
          { layer: 'priceData_2020', opacity: 0 }
        ]
      },
      {
        id: 'haebang-chon',
        title: '2020 | haebang-chon, new social media trends',
        image: 'images/trends01.png',
        description: `After Gyeonglidan-gil's gentrification, social media food trends shifted to Haebang-chon, driven by a quest for authenticity and affordability. This transition showcased Haebang-chon's distinct appeal and diverse eateries as an alternative to Gyeonglidan-gil's upscale vibe. Social media platforms amplified this shift, promoting Haebang-chon's culinary scene. This pattern emphasizes the influence of social media on urban trends, while also raising concerns about potential gentrification recurrence.
          <div id="legend_price" class="legend">
            <h4>The sum of review posts on cafes in the street</h4>
            <div><span style="background-color: #ff002a"></span>140 +</div>
            <div><span style="background-color: #f86c1e"></span>110 - 140</div>
            <div><span style="background-color: #ed9d35"></span>80 - 110</div>
            <div><span style="background-color: #e3c464"></span>50 - 80</div>
            <div><span style="background-color: #e0e49d"></span>20 - 50</div>
            <div><span style="background-color: #ebffd7"></span>Less than 20</div>
          </div>`,
        location: {
            center: [126.987466, 37.540145],
            zoom: 18,
            pitch: 54.22,
            bearing: 56
        },
        alignment: 'right',
        onChapterEnter: [
          { layer: 'streets_reviews_2020', opacity: 0.7 },
        ],
        onChapterExit: [
          { layer: 'streets_reviews_2020', opacity: 0 },
        ]
      },
      {
        id: 'forecast_streets',
        title: '2023 | forecast popularity of alleyways',
        image: 'images/correlation01.png',
        description: `Based on the analysis of datasets from Gyeonlidan-gil, I built a model to forecast the popularity of the streets to give foremost warning signs to the stakeholders of the system. It will stop other enterpreneurs from joining the food business in the area by informing them that the food business in the alleyways is already saturated. Especially with the real-time social media trends data, the digital tool will provide changes in trends and events happening in the streets in real-time.
          <div id="legend_price" class="legend">
            <h4>Popularity score based on proximity, land price, and social media trends</h4>
            <div><span style="background-color: #25b72b"></span>80 +</div>
            <div><span style="background-color: #74a800"></span>70 - 80</div>
            <div><span style="background-color: #a39400"></span>60 - 70</div>
            <div><span style="background-color: #ca7900"></span>50 - 60</div>
            <div><span style="background-color: #ea5400"></span>40 - 50</div>
            <div><span style="background-color: #ff002a"></span>Less than 30</div>
          </div>`,
        location: {
            center: [127.00309, 37.53900],
            zoom: 14.5,
            pitch: 0,
            bearing: 0
        },
        alignment: 'right',
        onChapterEnter: [
          { layer: 'streets_viability', opacity: 1 },
          { layer: 'priceData_2020', opacity: 0.15 }
        ],
        onChapterExit: [
          { layer: 'streets_viability', opacity: 0 },
          { layer: 'priceData_2020', opacity: 0 }
        ]
      }
  ]
};
