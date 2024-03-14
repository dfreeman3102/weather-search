var button = document.querySelector(".search")
var input = document.querySelector(".input")
var apiKey = "409871a44bb3e3aa5098d1ea472cba80"
var weatherdetails = (cityName, lat, lon) => {
    var cityUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`

    fetch(cityUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
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
           var {name, lat, lon} = data[0];
            weatherdetails(name, lat, lon);
        })

}

button.addEventListener("click", getCoords);