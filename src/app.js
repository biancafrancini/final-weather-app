function showCitySelected(event) {
  event.preventDefault();
  let h1City = document.querySelector("h1");
  let citySelected = document.querySelector("#inputCity");
  h1City.innerHTML = citySelected.value;
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", showCitySelected);

let today = new Date();

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

let dateToday = document.querySelector(".todayDate");
dateToday.innerHTML = `${dayNow} ${weekDate}, ${hours}:${minutes}`;
