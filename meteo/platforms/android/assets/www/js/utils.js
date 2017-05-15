function parseAjaxOpt(opt){
    // console.log(opt);
    var string = "";
    $.each(opt, function(index, val) {
       // console.log(index, val);
       string += index + "=" + val + "&";
   });
    string = string.slice(0, -1);
    return(string);
}

function getWeather(opt, forecast) {
    var optionString = parseAjaxOpt(opt);
    if (!forecast){
        queryString =
        'http://api.openweathermap.org/data/2.5/weather?' 
        + optionString + 
        '&units=metric&lang=fr&appid=' + OpenWeatherAppKey;
    }
    else {
        queryString =
        'http://api.openweathermap.org/data/2.5/forecast/daily?' 
        + optionString + 
        '&units=metric&lang=fr&appid=' + OpenWeatherAppKey;
    }
    // console.log(queryString);
    $.getJSON(queryString, function (data) {
        if (data) {
            // console.log(data);
            if(!forecast){
                displayDayWeather(data);
                current_city.id = data.id;
                current_city.lat = data.coord.lat;
                current_city.lon = data.coord.lon;
                current_city.name = data.name;
            }
            else {
                displayForecastWeather(data);
            }
        }
    }).fail(function () {
        console.log("error getting location");
    });

}
function displayDayWeather(data){
    current_city.id = data.id;
    $('#cityName').html(data.name);
    // console.log(data);
    $('#weatherType').html('<img src="http://openweathermap.org/img/w/'+
        data.weather[0].icon+ '.png" /><div id="weatherInfos"><h3>'+
        ucwords(data.weather[0].description)+'</h3>'+
        '<p id="temp"><h3>'+data.main.temp.toFixed(0) + '°C</h3></p></div>');
    $city = format_city_name(data.name);
    // console.log(cityList, data.id, data.id in cityList);
    if (cityList == null || !(data.id in cityList)) {
        $msg = data.name+" ne fait pas partie de vos favoris, cliquez ici pour l'ajouter.";
    }
    else {
        $msg = "";
    }
    $('#do_not_exist').show().html($msg);
    getWeather({"id": current_city.id}, true);
}

function displayForecastWeather(data){
    str = "";
    for (i=0; i < 3; i++){
        str += '<div class="day"><h3>'+ timestampToDate(data.list[i].dt) + '</h3> '+
        '<img src="http://openweathermap.org/img/w/'+ data.list[i].weather[0].icon + '.png" class="weather-icon">'+
        '<p class="temp"><span class="min">'+ data.list[i].temp.min.toFixed(0) + '°C / ' +
        '</span><span class="max">' + data.list[i].temp.max.toFixed(0) + '°C</span>' +
        '</p></div>';
    }
    $('#forecast').html(str);
}
var getUrlParameter = function(paramName) {
    var urlParams = window.location.href.split('?')[1];
    if (urlParams) {
        var params = urlParams.split('&');

        for (var i = 0; i <  params.length; i++) {
            var param = params[i].split('=');
            if (param[0] == paramName)
                return param[1];
        }
    }
}
function ucwords (str) {
    return (str + '').replace(/^([a-z])|\s+([a-z])/g, function ($1) {
        return $1.toUpperCase();
    });
}

function timestampToDate(timestamp){
    var year, month, day;
    var dateObj = new Date (timestamp * 1000);

    year    = dateObj.getFullYear ();
    month   = dateObj.getMonth ();
    day     = dateObj.getDate ();
    month      += 1;
    year    = (""  + year) .slice (-2);
    month   = ("0" + month).slice (-2);
    day     = ("0" + day)  .slice (-2);

    return day + "/" + month + "/" + year;
}
function format_city_name(city){
    return city.replace(/\\s/, "-").toLowerCase();
}
