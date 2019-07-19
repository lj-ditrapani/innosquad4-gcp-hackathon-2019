/*
	Alpha by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

function hello(files) {
    console.log('I get files')
    console.log(files)
    const zipFile = files[0]
    console.log(zipFile)
    console.log(window.location.host + '/upload')
    $.ajax({
        url: 'http://' + window.location.host + '/upload',
        type: 'POST',
        contentType: 'application/octet-stream',
        data: zipFile,
        processData: false
    })
        .done(data => {
            console.log(`response ${data}`)
            console.log(Object.keys(data))
        })
        .fail((jqXHR, textStatus, errorThrown) => {
            console.error(errorThrown)
            console.error(textStatus)
            console.error(jqXHR)
        })
}

$(document).ready(() => {
    $.get('../../../apiKey.txt').then(str => setGoogleMapsScript(str.trim()))
})

const setGoogleMapsScript = key => {
    const googleMapScript =
        '<script async defer src="https://maps.googleapis.com/maps/api/js?key=' +
        key +
        '&callback=initMap"></script>'
    $('head').append(googleMapScript)
}

var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 1,
        center: new google.maps.LatLng(40.4637, 3.7492),
        mapTypeId: 'terrain'
    });

    // Create a <script> tag and set the USGS URL as the source.
    var script = document.createElement('script');
    script.src = 'https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js';
    document.getElementsByTagName('head')[0].appendChild(script);
}

// Loop through the results array and place a marker for each
// set of coordinates.
window.eqfeed_callback = function(results) {
    console.log(results)
    for (var i = 0; i < results.features.length; i++) {
        var coords = results.features[i].geometry.coordinates;
        var latLng = new google.maps.LatLng(coords[1],coords[0]);
        var marker = new google.maps.Marker({
        position: latLng,
        map: map
        });
    }
}
