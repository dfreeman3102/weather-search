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
        //filters for only one forecast per day due to the new forecast every 3 hours
        var days = [];
        var fivedaycast = data.list.filter(forecast => {
            var date = new Date(forecast.dt_txt).getDate();
            if(!days.includes(date)){
                return days.push(date);
            }
        })
        console.log(fivedaycast);

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