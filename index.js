function city(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#search-text-input").value;

  let apiKey = "b02t1o4abeb6dd3aea6af5f554f10d04";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${searchInput}&key=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(function (response) {
    showTemperature(response);
  });
}

function showTemperature(response) {
  console.log(response.data);
  let currentTime = document.querySelector("#time");
  let iconElement = document.querySelector("#icon");
  let windElement = document.querySelector("#wind-speed");
  let humidityElement = document.querySelector("#humidity");
  let temperature = Math.round(response.data.temperature.current);
  let city = response.data.city;
  let currentTemp = document.querySelector(".temperature");
  currentTemp.innerHTML = `${temperature}`;
  let unixTimestamp = response.data.time;
  let date = new Date(unixTimestamp * 1000);

  console.log(date);

  let h1 = document.querySelector("h1");
  h1.innerHTML = city;
  let hours = date.getHours();
  let minutes = date.getMinutes();

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  currentTime.innerHTML = `${hours}:${minutes}`;

  fahrenheitTemperature = response.data.temperature.current;

  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  windElement.innerHTML = Math.round(response.data.wind.speed);
  humidityElement.innerHTML = response.data.temperature.humidity;
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
