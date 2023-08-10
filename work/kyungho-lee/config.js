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
        description: `Gyeonglidan-gil is situated near the Itaewon area, which is known for its international and multicultural atmosphere. It's easily accessible and has attracted a diverse crowd due to its unique character. Since the rent fee was relatively cheap compared to Itaewon, Gyeonglidan-gil attracted many young enterpreneurs and creative individuals who opened businesses catering to modern tastes. This way, the area underwent a transformation from a more traditional neighborhood to a trendy and stylish corridor.<br><br>
          <div id="legend_price" class="legend">
            <h4>2015 / Land Price per m2</h4>
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
        description: 'The large part of the city has evolved organically without extensive centralized urban planning. Instead, it has been growing based on the natural actions and decisions of its inhabitants. In result, dynamic and flexible urban fabric became one of the characteristics of Seoul. villas, high density low-rise residential blocks, is the most common building type in spontaneous urban fabric and today they take up almost 40% area of Seoul. So a balanced approach combining spontaneous growth and thoughtful urban planning can lead to a more sustainable and inclusive city. Collaborating with local communities is essential to understand their needs and guide development accordingly. Then what are the driving forces?',
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
        description: 'The large part of the city has evolved organically without extensive centralized urban planning. Instead, it has been growing based on the natural actions and decisions of its inhabitants. In result, dynamic and flexible urban fabric became one of the characteristics of Seoul. villas, high density low-rise residential blocks, is the most common building type in spontaneous urban fabric and today they take up almost 40% area of Seoul. So a balanced approach combining spontaneous growth and thoughtful urban planning can lead to a more sustainable and inclusive city. Collaborating with local communities is essential to understand their needs and guide development accordingly. Then what are the driving forces?',
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
        description: `Gyeonglidan-gil's rise as a popular food district was fueled by a combination of factors. Its strategic location in the trendy Itaewon area, known for its international atmosphere, attracted a diverse crowd seeking unique dining experiences. The influx of young entrepreneurs brought innovative concepts, leading to the opening of diverse restaurants and cafes.<br><br>
          Data source: google places API`,
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
        description: `The large part of the city has evolved organically without extensive centralized urban planning. Instead, it has been growing based on the natural actions and decisions of its inhabitants. In result, dynamic and flexible urban fabric became one of the characteristics of Seoul. villas, high density low-rise residential blocks, is the most common building type in spontaneous urban fabric and today they take up almost 40% area of Seoul. So a balanced approach combining spontaneous growth and thoughtful urban planning can lead to a more sustainable and inclusive city. Collaborating with local communities is essential to understand their needs and guide development accordingly. Then what are the driving forces?<br><br>
          <div id="legend_price" class="legend">
            <h4>2015 / Land Price per m2</h4>
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
        description: 'The large part of the city has evolved organically without extensive centralized urban planning. Instead, it has been growing based on the natural actions and decisions of its inhabitants. In result, dynamic and flexible urban fabric became one of the characteristics of Seoul. villas, high density low-rise residential blocks, is the most common building type in spontaneous urban fabric and today they take up almost 40% area of Seoul. So a balanced approach combining spontaneous growth and thoughtful urban planning can lead to a more sustainable and inclusive city. Collaborating with local communities is essential to understand their needs and guide development accordingly. Then what are the driving forces?',
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
        title: '2023 | forecast viability of corridors',
        image: 'images/correlation01.png',
        description: 'The large part of the city has evolved organically without extensive centralized urban planning. Instead, it has been growing based on the natural actions and decisions of its inhabitants. In result, dynamic and flexible urban fabric became one of the characteristics of Seoul. villas, high density low-rise residential blocks, is the most common building type in spontaneous urban fabric and today they take up almost 40% area of Seoul. So a balanced approach combining spontaneous growth and thoughtful urban planning can lead to a more sustainable and inclusive city. Collaborating with local communities is essential to understand their needs and guide development accordingly. Then what are the driving forces?',
        location: {
            center: [127.00309, 37.53900],
            zoom: 14.5,
            pitch: 0,
            bearing: 0
        },
        alignment: 'right',
        onChapterEnter: [
          { layer: 'streets_distance_attractions', opacity: 0.7 }
        ],
        onChapterExit: [
          { layer: 'streets_distance_attractions', opacity: 0 }
        ]
      }
  ]
};
