function sendZip(files) {
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
            console.log('response vv')
            console.log(data)
            console.log(Object.keys(data))
            $("#index").hide()
            $(".dashboard").show()
        })
        .fail((jqXHR, textStatus, errorThrown) => {
            console.error(errorThrown)
            console.error(textStatus)
            console.error(jqXHR)
        })
}

function openPage(evt, pageName) {
    // Declare all variables
    let i, tabcontent, tablinks

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName('tabcontent')
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = 'none'
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName('tablinks')
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(' active', '')
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(pageName).style.display = 'block'
    evt.currentTarget.className += ' active'
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

let map

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 1,
        center: new google.maps.LatLng(40.4637, 3.7492),
        mapTypeId: 'terrain'
    })

    // Create a <script> tag and set the USGS URL as the source.
    let script = document.createElement('script')
    script.src =
        'https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js'
    document.getElementsByTagName('head')[0].appendChild(script)
}

// Loop through the results array and place a marker for each
// set of coordinates.
window.eqfeed_callback = function(results) {
    console.log(results)
    for (let i = 0; i < results.features.length; i++) {
        const coords = results.features[i].geometry.coordinates
        const latLng = new google.maps.LatLng(coords[1], coords[0])
        const marker = new google.maps.Marker({
            position: latLng,
            map: map
        })
    }
}