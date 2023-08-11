document.addEventListener("DOMContentLoaded", function() {
    const yearElement = document.getElementById('year');
    const populationElement = document.getElementById('population');
    let startingYear = 2023;
    const targetYear = 2041; // Target year
    let population = 8350000; // Starting population
    const targetPopulation = 9000000; // Target population

    yearElement.textContent = startingYear;
    populationElement.textContent = population.toLocaleString();

    const populationIncrementPerYear = (targetPopulation - population) / (targetYear - startingYear);
    let populationIncrementPerInterval = 100;
    let incrementsPerYear = populationIncrementPerYear / populationIncrementPerInterval;

    let increments = 0;

    const interval = setInterval(() => {
        if (population < targetPopulation) {
        population += populationIncrementPerInterval;
        populationElement.textContent = population.toLocaleString();

        increments++;
        if (increments >= incrementsPerYear) {
            startingYear += 1;
            yearElement.textContent = startingYear;
            increments = 0;
        }
        } else {
        clearInterval(interval);
        }
    }, 5); // Change this value to adjust the animation speed
    });