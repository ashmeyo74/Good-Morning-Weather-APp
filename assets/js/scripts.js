let APIKey = `107a79069fc3e6e45233bc4755b41581`;
//  Declares an empty array for weather info.

let citySearch = document.getElementById("citySearch");

let currentDay = new Date();
let date = `${
  currentDay.getMonth() + 1
}/${currentDay.getDate()}/${currentDay.getFullYear()}`;

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
let fiveDayForecast = [];

// Listens for the form submit on city search, then runs checkWeather. Sets the selected city to local storage.
function cityAdd() {
  let cityInput = document.getElementById("citySubmit").value;

  // Ensures there's only 5 items in the array
  while (city.length > 10) {
    city.pop();
  }

  //  If element "citySearch"  has input and doesn't exist in the array already, pushes result to local storage.
  if (cityInput && !city.includes(cityInput)) {
    city.unshift(cityInput);
    localStorage.setItem("cities", JSON.stringify(city));

    // For debugging: log the current value of city
    console.log("Currently selected city:", city);

    checkWeather(cityInput);
  } else {
    console.log("Input already exists in array!");
    console.log("Currently selected city:", city);
    checkWeather(cityInput);
  }
}

//  Function to establish weather data and save into local storage
async function checkWeather(cityName) {
  const queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIKey}&units=imperial&cnt=40`;
  const response = await fetch(queryURL);
  let data = await response.json();
  let currentIndex = 0;
  console.log(data);

  localStorage.setItem("data", JSON.stringify(data));

  // Includes all the information for the header and pushes it into the WeatherInfo array
  let currentCityInfo = {
    CityName: data.city.name,
    WeatherIcon: "https://openweathermap.org/img/wn/" + data.list[+currentIndex].weather[0].icon + ".png",
    WeatherDescription: data.list[+currentIndex].weather[0].description,
    Temp: data.list[+currentIndex].main.temp.toFixed(1),
    Humidity: data.list[+currentIndex].main.humidity.toFixed(1),
    WindSpeed: Math.round(data.list[+currentIndex].wind.speed),
  };
  weatherInfo.push(currentCityInfo);
  localStorage.setItem("cityInfo", JSON.stringify(weatherInfo));

  renderWeather();
  renderFiveDay();
  loadSearchBar();
}

//   Function to draw info from local storage and render onto top header
function renderWeather() {
  let cityArray = JSON.parse(localStorage.getItem("cityInfo"));
  if (!cityArray || cityArray.length === 0) {
    console.error("No city information found in local storage.");
    return;
  }
  // Sets currentCity to the first index of the array
  let currentCity = cityArray[cityArray.length - 1];
  let cityDiv = document.getElementById("cityDiv");

  // Clear previous content
  cityDiv.innerHTML = "";

  let headerContainer = document.createElement("div");
  headerContainer.classList.add("headerContainer");

  let cityName = document.createElement("h1");
  cityName.textContent = `${currentCity.CityName} (${date})`;

  let weatherDescription = document.createElement("p");
  weatherDescription.textContent = `"${currentCity.WeatherDescription}"`;

  let weatherIcon = document.createElement("img");
  weatherIcon.src = currentCity.WeatherIcon

  let basicInfoContainer = document.createElement("div");
  basicInfoContainer.classList.add("basicInfo");

  let temp = document.createElement("h3");
  temp.textContent = `Temperature: ${currentCity.Temp}°F`;

  let wind = document.createElement("h3");
  wind.textContent = `Wind Speed: ${currentCity.WindSpeed} MPH`;

  let humidity = document.createElement("h3");
  humidity.textContent = `Humidity: ${currentCity.Humidity}%`;

  basicInfoContainer.appendChild(temp);
  basicInfoContainer.appendChild(wind);
  basicInfoContainer.appendChild(humidity);
 
  
  headerContainer.appendChild(cityName);
  headerContainer.appendChild(weatherIcon);
  headerContainer.appendChild(weatherDescription);

  cityDiv.appendChild(headerContainer);
  cityDiv.appendChild(basicInfoContainer);

  loadSearchBar();
}

//  Establishes days of the week to a certain index number, then runs through the getDay function.
const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const d = new Date();

//  Checks to ensure the days are correctly calculated to the correct index
function checkDay(day) {
  let newDayIndex = (day + d.getDay()) % 7;
  return newDayIndex;
}

//   Function meant to render weather into five cards
async function renderFiveDay() {
  //  Retrieves data from local storage
  let data = JSON.parse(localStorage.getItem("data"));
  let fivedayContainer = document.getElementById("fiveday");

  // Ensures the data is in a valid array
  if (!data || !data.list || !Array.isArray(data.list)) {
    console.error("No valid data found in local storage.");
    return;
  }

  let filteredDay = data.list.filter(forecast => {
    let forecastDate = new Date(forecast.dt * 1000);
    return forecastDate > currentDay;
  })


  // Clear previous content
  fivedayContainer.innerHTML = "";

  //  Loops through each item in the data array.
  for (let i = 0; i < 5; i++) {
    let forecastIndex = i * 8;
    let forecast = filteredDay[forecastIndex];

    // Includes all the information for the header and pushes it into the WeatherInfo array
    let forecastInfo = {
      Temp: forecast.main.temp,
      Humidity: forecast.main.humidity,
      WindSpeed: forecast.wind.speed,
      WeatherIcon: "https://openweathermap.org/img/wn/" + forecast.weather[0].icon + ".png",
    WeatherDescription: forecast.weather[0].description,
    };

    let timestamp = forecast.dt;
    let date = new Date(timestamp * 1000); // Convert to milliseconds
    let localTime = date.toLocaleString();

    // Create elements to display the forecast information
    let forecastDiv = document.createElement("div");
    forecastDiv.classList.add("border", "w-25", "h-25", "d-inline-block");

    let day = document.createElement("h1");
    day.textContent = `${weekday[checkDay(i)]}`;

    let localTimeofDay = document.createElement("h4");
    localTimeofDay.textContent = `${localTime}`;

    let weatherDescription = document.createElement("p");
    weatherDescription.textContent = `"${forecastInfo.WeatherDescription}"`;
  
    let weatherIcon = document.createElement("img");
    weatherIcon.src = forecastInfo.WeatherIcon
  

    let temp = document.createElement("h3");
    temp.textContent = `Temperature: ${forecastInfo.Temp.toFixed(1)}°F`;

    let wind = document.createElement("h3");
    wind.textContent = `Wind Speed: ${Math.round(forecastInfo.WindSpeed)} MPH`;

    let humidity = document.createElement("h3");
    humidity.textContent = `Humidity: ${forecastInfo.Humidity.toFixed(1)}%`;

    let basicInfoContainer = document.createElement("div");
    basicInfoContainer.classList.add("basicInfo");
    basicInfoContainer.appendChild(temp);
    basicInfoContainer.appendChild(wind);
    basicInfoContainer.appendChild(humidity);

    forecastDiv.appendChild(day);
    forecastDiv.appendChild(localTimeofDay);
    forecastDiv.appendChild(weatherIcon);
    forecastDiv.appendChild(weatherDescription);
    forecastDiv.appendChild(basicInfoContainer);
    fivedayContainer.appendChild(forecastDiv);
  }
}

//  Renders search bar, taking names from city array.
function loadSearchBar() {
  let sidebar = document.getElementById("sidebar");

  // Clear previous content
  sidebar.innerHTML = "";

  for (let i = 0; i < city.length; i++) {
    let searchHistory = document.createElement("a");
    searchHistory.classList.add(
      "list-group-item",
      "list-group-item-action",
      "list-group-item-light",
      "p-3"
    );
    searchHistory.textContent = `${city[i]}`;
    sidebar.appendChild(searchHistory);

    //  Listens for a click on any of the city elements, then loads results
    searchHistory.addEventListener("click", function () {
      checkWeather(city[i]);
    });
  }
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
