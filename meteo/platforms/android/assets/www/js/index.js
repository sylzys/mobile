document.addEventListener("deviceready", onDeviceReady, false);
var cityList = JSON.parse(localStorage.getItem("cityList"));
var cityToAdd = "";
var currentIndex = 0;
var notFavorite = false;
var current_city = {};
var wantGeoloc = 0;
var OpenWeatherAppKey = '8babbe60f76241126628b43a0ec91996';
var $findUrl = 'http://api.openweathermap.org/data/2.5/find';
function onDeviceReady(){
    console.log("list", cityList);
    if (cityList == null && wantGeoloc == 0){
        navigator.notification.confirm(
            'Pas de favoris. Voulez-vous être géolocalisé ?', 
            onDialogConfirm,            
            'Attention',           
            ['Oui','Non']     
            );
    }

    function onDialogConfirm(btnIndex) {
        console.log(btnIndex);
        if (btnIndex == 1){
            wantGeoloc = 1;
            navigator.geolocation.getCurrentPosition(geolocationSuccess,
                geolocationError, { timeout: 5000 });
        }
    //     else {
    //         console.log("changing");
    //     // $.mobile.changePage("nofav.html", {transition: "slide"});
    // }
}

function geolocationSuccess(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    getWeather(lat, lon);
}

function geolocationError(error){
    alert("Erreur de géolocalisation: " + error);
}

}

$("#autocomplete").on("filterablebeforefilter", function (e, data) {
    e.stopImmediatePropagation();
    // console.log(data)
    $input = $(data.input);
    value = $input.val();
    if (value && value.length > 2) {
        $.ajax({
            beforeSend: function () {
                $.mobile.loading('show');
            },
            complete: function () {
                $.mobile.loading('hide');
            },
            url: $findUrl,
            type: 'GET',
            dataType: 'json',
            data: {appid: OpenWeatherAppKey, q: value, mode: "json"},
        })
        .done(function (data) {
            filledListview(data.list);
        })
        .fail(function (data) {
            console.log("error", data.message);
            filledListview('');
        })
        .always(function () {
            // console.log("complete");

        });
    }
});
function filledListview(data) {
    $("#autocomplete").html('');
    $.each(data, function (i, city) {
        $("#autocomplete").append(
            '<li  data-icon="plus"><a data-id=' + city.id 
            + ' href="#home">' + city.name + ' (' + city.sys.country + ')</a>'
            + '</li>'
            );
    });
    $("#autocomplete").listview("refresh");
    $("#autocomplete").trigger("updatelayout");
}



// console.log(Object.keys(cityList)[0]);



$( document ).on( "click", "#autocomplete a", function(e) {
    e.stopImmediatePropagation();
    current_city.id = $(this).attr("data-id");
    notFavorite = true;
    console.log("autocomplte", $(this).attr("data-id"));
});
$(document).on("pagebeforeshow", '#home', function(e){
    e.stopImmediatePropagation();
    console.log("current index in home", currentIndex, cityList);
    if (!notFavorite && null != cityList){
        console.log("fetching 1st fav");
        current_city.id = Object.keys(cityList)[currentIndex];
    }
    //console.log(cityList);

    if (current_city.id == null && cityList == null) {
        console.log("no id");
        $("#nofav").show();
        $("#main").hide();
    }
    else {
        console.log("id", current_city.id);
        getWeather({'id': current_city.id});
        $("#main").show();
        $("#nofav").hide();
    }
});
$(document).on("swiperight", "#home", function(e){
    console.log(e.isTrigger);
    e.stopImmediatePropagation();
    notFavorite = false;
    currentIndex--;
    console.log("swipe R");
    if (currentIndex < 0){
        currentIndex = Object.keys(cityList).length - 1;
    }
    $.mobile.changePage("#home", {transition: "slide", reverse: true, allowSamePageTransition: true});
});

$(document).on("swipeleft", "#home", function(e){
    currentIndex++;
    console.log(e.isTrigger);
    notFavorite = false;
    e.stopImmediatePropagation();
    console.log("swipe L");
    if (currentIndex > Object.keys(cityList).length - 1){
        currentIndex = 0;
    }
    $.mobile.changePage("#home", {transition: "slide", reverse: false, allowSamePageTransition: true});
});

$(document).on("click", ".remove_fav", function(e) {
    e.stopImmediatePropagation();
//  navigator.notification.confirm(
//     'Êtes-vous sûr de vouloir supprimer ' + $(this).prev().html() + ' de vos favoris ?',
//     onDeleteConfirm,            
//     'Attention',           
//     ['Oui','Non']     
//     );

// function onDeleteConfirm() {
    delete cityList[Object.keys(cityList)[currentIndex]];
    localStorage.setItem('cityList', JSON.stringify(cityList));
    if (Object.keys(cityList).length >= 1){
        console.log("still fav");
        $("#home").trigger("swipeleft");
    }
    else {
        console.log("no more fav");
        $("#nofav").show();
        $("#main").hide();
        localStorage.removeItem("cityList");
        // $.mobile.changePage("nofav.html", {transition: "slide"});
    }
    //console.log("was removed", Object.keys(cityList).length);
// }

});
// var index = cityList.map(function(o) { return o.attr1; }).indexOf("3029241");
// console.log("looking index", getObjectKeyIndex(cityList, 3029241));
$(document).on("click", '#do_not_exist', function(e) {
    e.stopImmediatePropagation();
    // console.log("adding");
    $newCity = {
        [current_city.id]: {
            "lat": current_city.lat,
            "lon": current_city.lon,
            "real_name": current_city.name
        }
    };
    if (cityList == null){
        cityList = $newCity;
    }
    else {
        $.extend(cityList, $newCity);
    }
    localStorage.setItem('cityList', JSON.stringify(cityList));

    $('#do_not_exist').html(current_city.name + " a bien été ajoutée à vos favoris");
    console.log(currentIndex);
    currentIndex = Object.keys(cityList).length - 1;
    console.log(currentIndex);
    setTimeout(function() {
        $('#do_not_exist').hide('fast', function() {});
    }, 2000);
});

// $(document).on("pagebeforeshow", '#tmpCity', function(){
//     $name = getUrlParameter('name');
//     $("#tmpCity h1").html($name);
// });