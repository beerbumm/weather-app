function city(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#search-text-input").value;

  let apiKey = "fe1483f743b581b5520a1b725af03a49";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(function (response) {
    showTemperature(response);
  });
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let currentTemp = document.querySelector(".temperature");
  currentTemp.innerHTML = `${temperature}`;

  let h1 = document.querySelector("h1");
  h1.innerHTML = city;

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

let form = document.querySelector(".search-form");
form.addEventListener("submit", city);
