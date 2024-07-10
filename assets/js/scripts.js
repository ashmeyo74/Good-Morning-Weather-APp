let APIKey = `107a79069fc3e6e45233bc4755b41581`;
//  Declares an empty array for weather info.

let citySearch = document.getElementById("citySearch");

// Declares city as an empty array to try and assign from localStorage
let city;
try {
  city = JSON.parse(localStorage.getItem("cities")) || [];
   // Checks to see if city is an array. If not, assigns it to an empty array.
  if (!Array.isArray(city)) {
    city = [];
  }
} catch (e) {
  city = [];
}

let weatherInfo = [];

// Listens for the form submit on city search, then runs checkWeather. Sets the selected city to local storage.
function cityAdd() {
  //  If element "citySearch" exists on the page and has input, pushes result to local storage
  let cityInput = document.getElementById("citySubmit").value;
  if (cityInput) {
    city.push(cityInput);
    localStorage.setItem("cities", JSON.stringify(city));

    checkWeather(cityInput);
  }
}

// For debugging: log the current value of city
console.log("Currently selected city:", city);

//  Function to establish weather data and save into local storage
async function checkWeather(cityName) {
const queryURL = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIKey}&units=imperial&cnt=5`;
  const response = await fetch(queryURL);
  let data = await response.json();
  console.log(data);

  // Includes all the information for the header and pushes it into the WeatherInfo array
  let currentCityInfo = {
    CityName: data.city.name,
    Temp: data.list[0].main.temp,
    Humidity: data.list[0].main.humidity,
    WindSpeed: data.list[0].wind.speed,
  };
  weatherInfo.push(currentCityInfo);
  localStorage.setItem("cityInfo", JSON.stringify(weatherInfo));

  renderWeather();
  renderFiveDay();
}

//   Function to draw info from local storage and render onto top header
function renderWeather() {
    let cityArray = JSON.parse(localStorage.getItem("cityInfo"));
  if (!cityArray || cityArray.length === 0) {
    console.error('No city information found in local storage.');
    return;
  }
  // Sets currentCity to the first index of the array
  let currentCity = cityArray[cityArray.length - 1];
  let cityDiv = document.getElementById("cityDiv");

// Clear previous content
    cityDiv.innerHTML = '';

  let headerContainer = document.createElement("div");
  headerContainer.classList.add("headerContainer");

  let cityName = document.createElement("h1");
  cityName.textContent = `${currentCity.CityName}`;

  let basicInfoContainer = document.createElement("div");
  basicInfoContainer.classList.add("basicInfo");

  let temp = document.createElement("h3");
  temp.textContent = `Temperature: ${currentCity.Temp}`;

  let wind = document.createElement("h3");
  wind.textContent = `Wind Speed: ${currentCity.WindSpeed}`;

  let humidity = document.createElement("h3");
  humidity.textContent = `Humidity: ${currentCity.Humidity}`;

  basicInfoContainer.appendChild(humidity);
  basicInfoContainer.appendChild(wind);
  basicInfoContainer.appendChild(temp);

  headerContainer.appendChild(cityName);
  cityDiv.appendChild(headerContainer);
  cityDiv.appendChild(basicInfoContainer);
}

//   Function meant to render weather into five cards
function renderFiveDay() {
  //    Add a forEach for each city, 5 count
  // Draw from local storage
}

function loadSearchBar() {}

function createWeatherDecscription(hourlyWeatherData) {
  const { main, dt } = weatherData;
}

//  When page is loaded, runs listeners and loads sidebar
$(function () {
  citySearch.addEventListener("submit", function (event) {
    event.preventDefault();
    cityAdd();
  });

  // For debugging: log the current value of city
  console.log("Current value of city on load:", city);

  if (city.length === 0) {
    console.log("No City Selected!");
  } else {
    console.log(`Listed City: ${city}`);
  }

  loadSearchBar();
});
