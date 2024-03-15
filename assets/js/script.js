var button = document.querySelector(".search")
var input = document.querySelector(".input")
var fivedaycards = document.querySelector("#five-day-forecast")
var apiKey = "409871a44bb3e3aa5098d1ea472cba80"

var weatherCard = (weatherData) => {
    return `<section id="card">
    <h5>Date:${weatherData.dt_txt.split(" ")[0]}</h4>
    <p>Temp:${weatherData.main.temp}</p>
    <p>${weatherData.wind.speed} MPH</p>
    <p>${weatherData.main.humidity} %</p>
</section>`;
}
var weatherdetails = (cityName, lat, lon) => {
    var cityUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`

    fetch(cityUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            //filters for only one forecast per day due to the new forecast every 3 hours
            var days = [];
            var fivedaycast = data.list.filter(forecast => {
                var date = new Date(forecast.dt_txt).getDate();
                if (!days.includes(date)) {
                    return days.push(date);
                }
            })
            console.log(fivedaycast);
            fivedaycast.forEach(weatherData => {
                fivedaycards.insertAdjacentHTML("beforeend", weatherCard(weatherData));
            })
        })
}

function getCoords() {
    //entered city name, with removed spaces
    var cityName = input.value.trim();
    var coordUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`;
    //gets the coords and city name from the response
    fetch(coordUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var { name, lat, lon } = data[0];
            weatherdetails(name, lat, lon);
        })

}

button.addEventListener("click", getCoords);