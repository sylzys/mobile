//La geolocalisation doit être appellée après le trigger de
// l'event deviceready
document.addEventListener("deviceready", onDeviceReady, false);

// déclaration des variables
var cityList = JSON.parse(localStorage.getItem("cityList"));
var currentIndex = 0; //index de la ville  
var notFavorite = false; //la ville en cours est-elle un favoris ou une simple recherce
var current_city = {}; //objet contenant les infos de la ville en cours
var wantGeoloc = 0; //
var OpenWeatherAppKey = '8babbe60f76241126628b43a0ec91996';
var $findUrl = 'http://api.openweathermap.org/data/2.5/find';
function onDeviceReady(){
    if (cityList == null && wantGeoloc == 0){
        //si pas récupéré de liste en localstorage, demande si besoin d'une geoloc ou non
        navigator.notification.confirm(
            'Pas de favoris. Voulez-vous être géolocalisé ?', 
            onDialogConfirm,            
            'Attention',           
            ['Oui','Non']     
            );
    }

    function onDialogConfirm(btnIndex) {
        if (btnIndex == 1){
            //si le user veut etre geolocalisé
            wantGeoloc = 1;
            navigator.geolocation.getCurrentPosition(geolocationSuccess,
                geolocationError, { timeout: 5000 });
        }
    }

    function geolocationSuccess(position) {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        //récupération des latitute et longitude, récupération via l'API des infos
        getWeather(lat, lon);
    }

    function geolocationError(error){
        alert("Erreur de géolocalisation: " + error);
    }

}

$("#autocomplete").on("filterablebeforefilter", function (e, data) {
    //cf documentation de l'element dans la demo de JqueryMobile
    e.stopImmediatePropagation();
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
            data: {appid: OpenWeatherAppKey, q: value, mode: "json"}, //appel API
        })
        .done(function (data) {
            filledListview(data.list);
        })
        .fail(function (data) {
            console.log("error", data.message);
            filledListview('');
        })
        .always(function () {
        });
    }
});
function filledListview(data) {
    $("#autocomplete").html('');
    //une fois les infos recues, génération de la listeview
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


$( document ).on( "click", "#autocomplete a", function(e) {
    //choix d'un element dans la liste
    e.stopImmediatePropagation();
    //récuperation de l'id envoyé par l'API
    current_city.id = $(this).attr("data-id");
    // pas une ville en favoris
    notFavorite = true;
});

//fonction gérant l'affichage principal
$(document).on("pagebeforeshow", '#home', function(e){
    e.stopImmediatePropagation();

    // mon affichage concerne une ville en favori
    if (!notFavorite && null != cityList){
        //je récupére son id dans la liste, en utilisant l'index en cours
        //0 au départ, changeant selon le sens du swipe
        current_city.id = Object.keys(cityList)[currentIndex];
    }

    //si je n'ai pas d'id et que ma liste est vide
    if (current_city.id == null && cityList == null) {
        //j'affiche la vue "pas de favoris)"
        $("#nofav").show();
        $("#main").hide();
    }
    else {
        //sinon j'utilise l'id récupéré et affiche les infos nécessaires
        getWeather({'id': current_city.id});
        $("#main").show();
        $("#nofav").hide();
    }
});

//swipe à droite
$(document).on("swiperight", "#home", function(e){
    e.stopImmediatePropagation();
    //obligatoirement sur une ville en favori
    notFavorite = false;
    //je change d'index courant
    currentIndex--; 
    //gestion de la vue en boucle
    if (currentIndex < 0){
        currentIndex = Object.keys(cityList).length - 1;
    }
    //rappel de la page #home avec transition
    $.mobile.changePage("#home", {transition: "slide", reverse: true, allowSamePageTransition: true});
});

//swipe à gauche, idem
$(document).on("swipeleft", "#home", function(e){
    currentIndex++;
    notFavorite = false;
    e.stopImmediatePropagation();
    if (currentIndex > Object.keys(cityList).length - 1){
        currentIndex = 0;
    }
    $.mobile.changePage("#home", {transition: "slide", reverse: false, allowSamePageTransition: true});
});

//suppression d'un favori
$(document).on("click", ".remove_fav", function(e) {
    e.stopImmediatePropagation();
    navigator.notification.confirm(
        'Êtes-vous sûr de vouloir supprimer ' + $(this).prev().html() + ' de vos favoris ?',
        onDeleteConfirm,            
        'Attention',           
        ['Oui','Non']     
        );

    function onDeleteConfirm() {
        delete cityList[Object.keys(cityList)[currentIndex]];
        localStorage.setItem('cityList', JSON.stringify(cityList));
        if (Object.keys(cityList).length >= 1){
            //s'il reste au moins un item, je simule un swipeleft
            $("#home").trigger("swipeleft");
        }
        else {
            //sinon, affichage de la vue "pas de favoris"
            //et suppression de l'item en localstorage
            $("#nofav").show();
            $("#main").hide();
            localStorage.removeItem("cityList");

        }
    }

});

//Ajout d'une ville aux favoris
$(document).on("click", '#do_not_exist', function(e) {
    e.stopImmediatePropagation();
    //construction d'un nouvel objet
    $newCity = {
        [current_city.id]: {
            "lat": current_city.lat,
            "lon": current_city.lon,
            "real_name": current_city.name
        }
    };
    //si la liste est vide, je la crée avec mon nouvel objet
    if (cityList == null){
        cityList = $newCity;
    }
    //sinon j'ajoute l'objet à ma iste
    else {
        $.extend(cityList, $newCity);
    }

    //et je stocke la nouvelle liste
    localStorage.setItem('cityList', JSON.stringify(cityList));
    $('#do_not_exist').html(current_city.name + " a bien été ajoutée à vos favoris");
    // 1 item de +, modification de l'index courant
    currentIndex = Object.keys(cityList).length - 1;
    setTimeout(function() {
        $('#do_not_exist').hide('fast', function() {});
    }, 2000);
});
