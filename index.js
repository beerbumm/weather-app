function showCurrentDay(response) {
  let currentDayElement = document.querySelector("#day");
  let currentTimeElement = document.querySelector("#time");

  let timezoneOffset = response.data.timezone;

  let localTime = new Date((response.data.dt + timezoneOffset) * 1000);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[localTime.getUTCDay()];
  let hours = localTime.getUTCHours();
  let minutes = localTime.getUTCMinutes();
  let ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12;

  currentDayElement.innerHTML = day;
  currentTimeElement.innerHTML = `${hours}:${
    minutes < 10 ? "0" : ""
  }${minutes} ${ampm}`;
}

function city(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#search-text-input").value;

  let apiKey = "5ac70c9d220c7b6695afbf9fb3d15093";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(function (response) {
    showTemperature(response);
    showCurrentDay(response);
  });
}

function showTemperature(response) {
  console.log(response.data);
  let currentTime = document.querySelector("#time");
  let iconElement = document.querySelector("#icon");
  let windElement = document.querySelector("#wind-speed");
  let humidityElement = document.querySelector("#humidity");
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let currentTemp = document.querySelector(".temperature");
  currentTemp.innerHTML = `${temperature}`;

  let h1 = document.querySelector("h1");
  h1.innerHTML = city;

  fahrenheitTemperature = response.data.main.temp;

  let iconUrl = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`;
  iconElement.setAttribute("src", iconUrl);

  windElement.innerHTML = Math.round(response.data.wind.speed);
  humidityElement.innerHTML = response.data.main.humidity;
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".temperature");
  let celsiusTemperature = ((fahrenheitTemperature - 32) * 5) / 9;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitTemperature = null;

let form = document.querySelector(".search-form");
form.addEventListener("submit", city);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);
