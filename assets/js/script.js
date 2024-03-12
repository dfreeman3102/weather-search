var button = document.querySelector(".search")
var input = document.querySelector(".input")
var apiKey = "409871a44bb3e3aa5098d1ea472cba80"

function getCoords() {
    var cityName = input.value.trim();
    var cityUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`;
    
    fetch(cityUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        })

}

button.addEventListener("click", getCoords);