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
  console.log(response);
  let windElement = document.querySelector("#wind-speed");
  let humidityElement = document.querySelector("#humidity");
  let temperature = Math.round(response.data.temperature.current);
  let city = response.data.city;
  let currentTemp = document.querySelector(".temperature");
  currentTemp.innerHTML = `${temperature}`;

  let h1 = document.querySelector("h1");
  h1.innerHTML = city;

  windElement.innerHTML = Math.round(response.data.wind.speed);
  humidityElement.innerHTML = response.data.temperature.humidity;
}

let form = document.querySelector(".search-form");
form.addEventListener("submit", city);
