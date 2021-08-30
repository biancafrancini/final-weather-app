function showCitySelected(event) {
  event.preventDefault();
  let city = document.querySelector("#city");
  let citySelected = document.querySelector("#inputCity");
  city.innerHTML = citySelected.value;
  showCity(citySelected.value);
}

showCity("London");
let form = document.querySelector("#search-form");
form.addEventListener("submit", showCitySelected);

function showCity(city) {
  let apiKey = "15311e86ae668422281f7a4353f9243b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayTemperatureToday);
}

function formatDate(dt) {
  let today = new Date(dt * 1000);
  console.log(today);
  console.log(dt);
  let hours = today.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = today.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let weekDate = today.getDate();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let dayNow = days[today.getDay()];

  return `${dayNow} ${weekDate}, ${hours}:${minutes}`;
}

function displayTemperatureToday(response) {
  console.log(response.data);
  celsiusTemperature = response.data.main.temp;
  let temperatureElement = document.querySelector("#degrees");
  let cityElement = document.querySelector("#city");
  let iconElement = document.querySelector("#IconEmoji");
  let weatherDescriptionElement = document.querySelector(
    ".weather-description"
  );
  let windElement = document.querySelector(".windSpeedNumber");
  let humidityElement = document.querySelector(".humidityLevel");
  let dateTodayElement = document.querySelector(".todayDate");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherDescriptionElement.innerHTML = response.data.weather[0].description;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  humidityElement.innerHTML = Math.round(response.data.main.humidity);
  dateTodayElement.innerHTML = formatDate(response.data.dt);
}

function turnsIntoFahrenheit(event) {
  event.preventDefault();
  let degreesInFahrenheit = Math.round((celsiusTemperature * 9) / 5 + 32);
  let temperatureFahrenheitElement = document.querySelector("#degrees");
  temperatureFahrenheitElement.innerHTML = degreesInFahrenheit;
}
let fahrenheit = document.querySelector(".fahrenheit");
fahrenheit.addEventListener("click", turnsIntoFahrenheit);

function showCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureCelsiusElement = document.querySelector("#degrees");
  temperatureCelsiusElement.innerHTML = Math.round(celsiusTemperature);
}
let celsius = document.querySelector(".celsius");
celsius.addEventListener("click", showCelsiusTemperature);

let celsiusTemperature = null;

function displayWeekForecast() {
  let forecastElement = document.querySelector("#week-forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
              <div class="weather-forecast-date">${day}</div>
              <img
                src="https://openweathermap.org/img/wn/10d@2x.png"
                id="forecast-icons"
                alt=""
                width="50"
              />
              <div class="temperature-forecast">
                <span class="max-temperature"> 20°</span> -
                <span class="min-temperature">12°</span>
              </div>
            </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

displayWeekForecast();
