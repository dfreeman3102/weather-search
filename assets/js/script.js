var button = document.querySelector(".search")
var input = document.querySelector(".input")
var fivedaycards = document.querySelector("#five-day-forecast")
var dayCard = document.querySelector("#day-cast")
var apiKey = "409871a44bb3e3aa5098d1ea472cba80"
var listEl = document.getElementById("recent-searches");
var cityArray = JSON.parse(localStorage.getItem("cityInput")) || [];
//adds individual weather data based on parameters listed below.
var weatherCard = (cityName, weatherData, index) => {
    if (index === 0) {
        return ` 
        <section id="day"
        <h3>${cityName}</h3>
        <h3>${weatherData.dt_txt.split(" ")[0]}</h3>
        <img src="https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png">
        <p>Temp: ${weatherData.main.temp} °F</p>
        <p>Wind Speed: ${weatherData.wind.speed}MPH</p>
        <p>Humidity: ${weatherData.main.humidity}%</p>
        </section>`
    } else {
        return `<section id="card">
        <h5>Date:${weatherData.dt_txt.split(" ")[0]}</h4>
        <img src="https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png">
        <p>Temp:${weatherData.main.temp} °F</p>
        <p>Wind Speed: ${weatherData.wind.speed} MPH</p>
        <p>Humidity: ${weatherData.main.humidity} %</p>
        </section>`;
    }
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
            //clears the input and previous forecast data
            input.value = "";
            dayCard.innerHTML = "";
            fivedaycards.innerHTML = "";
            console.log(fivedaycast);

            //a for each loop to add the weather data for however many days speccified
            fivedaycast.forEach((weatherData, index) => {
                //adds the weather data for the current day cast
                if (index === 0) {
                    dayCard.insertAdjacentHTML("beforeend", weatherCard(cityName, weatherData, index));
                } else {
                    fivedaycards.insertAdjacentHTML("beforeend", weatherCard(cityName, weatherData, index));
                }
            })
        })
}

function getCoords(cityName) {
    //entered city name, with removed spaces
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
            retrieveCity(cityName);
        })

}
//setting city to local storage
function retrieveCity(cityName) {
    //get data from storage
    if (!(cityArray && cityArray.includes(cityName))) {
        cityArray.push(cityName)
        localStorage.setItem("cityInput", JSON.stringify(cityArray));
        //displays the list
        displayRecents();
    };
};

//function to display the list under recent search
function displayRecents() {
    listEl.innerHTML = '';
    //creates a button of each recent search
    cityArray.forEach(function (item) {
        var liEl = document.createElement('li');
        var buttonEl = document.createElement("button");
        buttonEl.textContent = item;

        liEl.appendChild(buttonEl);
        listEl.appendChild(liEl);
    })
};
displayRecents()
button.addEventListener("click", function (event) {
    getCoords(input.value)
});
listEl.addEventListener("click", function (event) {
    console.log(event.target);
    var cityName = event.target.innerHTML;
    getCoords(cityName);
});
getCoords(cityArray[0] || "London");