let topTitleDiv = "";

let titleDiv = '';
  // "<h1>City Sensing</h1>"+
  // "<h1>Using Computer Vision to Probe Urban Perception</h1>"+
  // '<p style="text-align:center">In this study, I integrate 21,703 Google Streetview images with the Place Pulse 2.0 dataset, using advanced computer vision techniques to explore how people perceive urban spaces, sky views, and bicycle-friendly paths. Through this integrated content, we aim to gain a deeper understanding of how urban design influences our daily experiences and emotional responses.</p>' +
  // '<p style="text-align:center">Scroll to continue</p>';

let bylineDiv = "";

let descriptionDiv ='';

let footerDiv ='';

let divChapter1 =
  "<h3>City's Sighs: Exploring Depths of Urban DEPRESSION</h3>" +
  "<p></p>";

let divChapter2 =
  "<h3>The StreetView Image with Highest Depressing Score</h3>" +
  '<img src="data/17022.jpg">' +
  '<img src="data/17022.png">' +
  '<img src="data/17022_6.jpg">' +
  "<p>This image showcases an expansive stretch of buildings, punctuated by scant greenery and dominated by a cold, grey hue — factors that contribute to its pronounced depressing score</p>";

let divChapter3 =
  "<h3>City's Pulse: Feeling the Vibrance of Urban LIVELINESS</h3>" +
  "<p></p>";

let divChapter4 =
  "<h3>The StreetView Image with the Highest Lively Score</h3>" +
  '<img src="data/3945.jpg">' +
  '<img src="data/3945.png">' +
  '<img src="data/3945_6.jpg">' +
  "<p>This image boasts a variety of items and a rich palette of colors, which likely contribute to its vibrant sense of liveliness.</p>";

let divChapter5 =
  "<h3>City's Shield: Seeking Comfort in Urban SAFETY</h3>" +
  "<p></p>";

let divChapter6 =
  "<h3>The StreetView Image with Highest Safety Score</h3>" +
  '<img src="data/6427.jpg">' +
  '<img src="data/6427.png">' +
  '<img src="data/6427_6.jpg">' +
  "<p>This image reveals a narrow street dominated by a warm red hue, potentially evoking feelings of enclosure and protection. </p>";

let divChapter7 =
  "<h3>NYC Skyview</h3>" +
  '<img src="data/skyview.gif">' +
  "<p>Using Grasshopper sky exposure custom analysis tool and derive spatial data skills to analyze the ratio of sky view in each street of Manhattan.Through analysis, it's evident that in Lower Manhattan, the Lower East area boasts a more expansive skyview. In contrast, the Financial District and Soho have a more restricted view of the sky. While the entirety of Midtown generally offers limited skyview, Hudson Yards, Hell's Kitchen, and the East Village stand out with higher skyview ratios. The Upper East Side's skyview ratio is significantly lower than that of the Upper West Side. Meanwhile, Upper Manhattan and Harlem present a moderately high skyview ratio.</p>";

let divChapter8 =
  "<h3>NYC Skyview</h3>" +
  '<img src="data/corsky.png">' +
  "<p>Through correlation analysis, I observed that the sky view ratio is inversely correlated with perceptions of depression, liveliness, and safety. Specifically, as sky visibility increases, people perceive their surroundings as less depressing and less unsafe, which intuitively makes sense. However, intriguingly, as sky visibility goes up, there's also a decreased perception of liveliness. Upon analyzing images rated highest for liveliness, we deduced that a sense of liveliness often demands rich elements and warm colors. This may explain why areas with higher sky visibility might be perceived as less lively.</p>";

let divChapter9 =
  "<h3>NYC Citi Bike</h3>" +
  '<img src="data/bike.gif">' +
  "<p>Using Python, I visualized the trajectories of New York's Citibike in 2019 and the post-pandemic year of 2022 during weekdays and weekends, focusing on the time intervals of 6-12, 12-18, and 18-24. Blue marks the starting points, yellow indicates the endpoints, and the thickness of each route is adjusted based on its frequency to highlight the most popular Citibike routes. Furthermore, the size of the circles for origin-destination (OD) points was adjusted based on their quantity. Interestingly, the consistent size of the 2019 OD points suggests that users might have preferred starting and ending at the same location. In 2022, Midtown emerged as a prominent departure point, while Downtown and the Upper East Side were popular destinations, hinting at potential attractions in these areas. Brooklyn and Queens maintained relatively consistent OD counts, which could be attributed to their residential nature, where the number of departures and returns are balanced.</p>";

let divChapter10 =
  "<h3>NYC Citi Bike</h3>" +
  '<img src="data/corbike.png">' +
  "<p>Based on correlation analysis, the number of bike end stations inversely correlates with the level of perceived depression, indicating that popular stations are located in areas that are not perceived as boring. Interestingly, scores for other perceptions such as safety and liveliness showed no correlation with the bike end stations. This suggests that biking preferences aren't solely determined by urban environments but also influenced by other factors like points of interest (POI), land use, and more.</p>";
  
  var config = {
  style: "mapbox://styles/hongqianli/clkz0gnx000lw01p7375xf0qf",
  accessToken: "pk.eyJ1IjoiaG9uZ3FpYW5saSIsImEiOiJjbGticW84cjIwaGRjM2xvNjNrMjh4cmRyIn0.o65hBMiuqrCXY-3-bxGsUg",
  showMarkers: false,
  markerColor: "#3FB1CE",
  theme: "light",
  use3dTerrain: false,
  topTitle: topTitleDiv,
  title: titleDiv,
  subtitle: "",
  byline: bylineDiv,
  description: descriptionDiv,
  footer: footerDiv,
  chapters: [
    {
      id: "overallMap",
      alignment: "left",
      hidden: false,
      chapterDiv: divChapter1,
      location: {
        center: [-74, 40.725],
        zoom: 10,
        zoomSmall: 9,
        pitch: 0,
        bearing: 0,
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      callback: "",
      onChapterEnter:[
        {
          layer: "depressing",
          opacity: 1,
          duration: 300,
        },
        {
          layer: "lively",
          opacity: 0,
          duration: 300,
        },
        {
          layer: "safety",
          opacity: 0,
          duration: 300,
        },
      ],
      onChapterExit: [
        {
          layer: "depressing",
          opacity: 0,
          duration: 300,
        },
      ],
    },
    {
      id: "depressingPoint",
      alignment: "left",
      hidden: false,
      title: "",
      image: "",
      description: "",
      chapterDiv: divChapter2,
      location: {
        center: [-73.979, 40.751],
        zoom: 18,
        zoomSmall: 9,
        pitch: 60,
        bearing: 20,
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      callback: "",
      onChapterEnter: [
        {
          layer: "perceptionmax",
          opacity: 1,
          duration: 300,
        },
        {
          layer: "lively",
          opacity: 0,
          duration: 300,
        },
        {
          layer: "depressing",
          opacity: 0,
          duration: 300,
        },
        {
          layer: "safety",
          opacity: 0,
          duration: 300,
        },
      ],
      onChapterExit: [
        {
          layer: "perceptionmax",
          opacity: 0,
          duration: 300,
        },
      ],
    },
    {
      id: "incomeUnderlay",
      alignment: "left",
      hidden: false,
      title: "",
      image: "",
      description: "",
      chapterDiv: divChapter3,
      location: {
        center: [-74, 40.725],
        zoom: 10,
        zoomSmall: 9,
        pitch: 0,
        bearing: 0,
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      callback: "",
      onChapterEnter: [
        {
          layer: "lively",
          opacity: 1,
          duration: 300,
        },
        {
          layer: "depressing",
          opacity: 0,
          duration: 300,
        },
        {
          layer: "safety",
          opacity: 0,
          duration: 300,
        },
      ],
      onChapterExit: [
        {
          layer: "lively",
          opacity: 0,
          duration: 300,
        },
      ],
    },
    {
      id: "livelypoint",
      alignment: "left",
      hidden: false,
      title: "",
      image: "",
      description: "",
      chapterDiv: divChapter4,
      location: {
        center: [-73.963, 40.764],
        zoom: 18,
        zoomSmall: 9,
        pitch: 60,
        bearing: -65,
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      callback: "",
      onChapterEnter: [
        {
          layer: "perceptionmax",
          opacity: 1,
          duration: 300,
        },
        {
          layer: "lively",
          opacity: 0,
          duration: 300,
        },
        {
          layer: "depressing",
          opacity: 0,
          duration: 300,
        },
        {
          layer: "safety",
          opacity: 0,
          duration: 300,
        },
      ],
      onChapterExit: [
        {
          layer: "perceptionmax",
          opacity: 0,
          duration: 300,
        },
      ],
    },
    {
      id: "elmhurstHospital",
      alignment: "left",
      hidden: false,
      title: "",
      image: "",
      description: "",
      chapterDiv: divChapter5,
      location: {
        center: [-74, 40.725],
        zoom: 10,
        zoomSmall: 9,
        pitch: 0,
        bearing: 0,
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      callback: "",
      onChapterEnter: [
        {
          layer: "safety",
          opacity: 1,
          duration: 300,
        },
        {
          layer: "lively",
          opacity: 0,
          duration: 300,
        },
        {
          layer: "depressing",
          opacity: 0,
          duration: 300,
        },
      ],
      onChapterExit: [
        {
          layer: "safety",
          opacity: 0,
          duration: 300,
        },
      ],
    },
    {
      id: "sfetypoint",
      alignment: "left",
      hidden: false,
      title: "",
      image: "",
      description: "",
      chapterDiv: divChapter6,
      location: {
        center: [-73.973, 40.796],
        zoom: 18,
        zoomSmall: 9,
        pitch: 60,
        bearing: -60,
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      callback: "",
      onChapterEnter: [
        {
          layer: "perceptionmax",
          opacity: 1,
          duration: 300,
        },
        {
          layer: "lively",
          opacity: 0,
          duration: 300,
        },
        {
          layer: "depressing",
          opacity: 0,
          duration: 300,
        },
        {
          layer: "safety",
          opacity: 0,
          duration: 300,
        },
      ],
      onChapterExit: [
        {
          layer: "perceptionmax",
          opacity: 0,
          duration: 300,
        },
      ],
    },
    {
      id: "skyview",
      alignment: "right",
      hidden: false,
      title: "",
      image: "",
      description: "",
      chapterDiv: divChapter7,
      location: {
        center: [-73.9856, 40.7426],
        zoom: 12.5,
        zoomSmall: 12.5,
        pitch: 60,
        bearing: -20,
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      callback: "",
      onChapterEnter: [
        {
          layer: "skyview",
          opacity: 1,
          duration: 300,
        },
      ],
      onChapterExit: [
        {
          layer: "skyview",
          opacity: 0,
          duration: 300,
        },
      ],
    },
    {
      id: "skyview2",
      alignment: "right",
      hidden: false,
      title: "",
      image: "",
      description: "",
      chapterDiv: divChapter8,
      location: {
        center: [-73.9856, 40.7426],
        zoom: 12.5,
        zoomSmall: 12.5,
        pitch: 60,
        bearing: -20,
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      callback: "",
      onChapterEnter: [
        {
          layer: "skyview",
          opacity: 1,
          duration: 300,
        },
      ],
      onChapterExit: [
        {
          layer: "skyview",
          opacity: 0,
          duration: 300,
        },
      ],
    },
    {
      id: "bikecount",
      alignment: "right",
      hidden: false,
      title: "",
      image: "",
      description: "",
      chapterDiv: divChapter9,
      location: {
        center: [-73.9856, 40.7426],
        zoom: 12.5,
        zoomSmall: 12.5,
        pitch: 60,
        bearing: -20,
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      callback: "",
      onChapterEnter: [
        {
          layer: "bikecount",
          opacity: 1,
          duration: 300,
        },
      ],
      onChapterExit: [
        {
          layer: "bikecount",
          opacity: 0,
          duration: 300,
        },
      ],
    },
    {
      id: "bikecount2",
      alignment: "right",
      hidden: false,
      title: "",
      image: "",
      description: "",
      chapterDiv: divChapter10,
      location: {
        center: [-73.9856, 40.7426],
        zoom: 12.5,
        zoomSmall: 12.5,
        pitch: 60,
        bearing: -20,
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      callback: "",
      onChapterEnter: [
        {
          layer: "bikecount",
          opacity: 1,
          duration: 300,
        },
      ],
      onChapterExit: [
        {
          layer: "bikecount",
          opacity: 0,
          duration: 300,
        },
      ],
    },
  ],
};