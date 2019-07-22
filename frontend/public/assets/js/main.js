$(document).ready(() => {
    $.get('../../../apiKey.txt').then(str => setGoogleMapsScript(str.trim()))
    setupCanvas()
})

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
            addMapPins(data.locations)
            $('#index').hide()
            $('.dashboard').show()
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

const setGoogleMapsScript = key => {
    console.log(key)
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
}

// Loop through the results array and place a marker for each
// set of coordinates.
function addMapPins(results) {
    for (let coords of results) {
        const latLng = new google.maps.LatLng(coords[0], coords[1])
        const marker = new google.maps.Marker({
            position: latLng,
            map: map
        })
    }
}

function setupCanvas() {
    const canvas = document.getElementById('eventChart').getContext('2d')
    const myDoughnutChart = new Chart(canvas, {
        type: 'doughnut',
        data: {
            labels: ['Hackathons', 'Food', 'Networking', 'Other'],
            datasets: [
                {
                    label: 'Events',
                    data: [50, 25, 10, 15],
                    backgroundColor: ['#031926', '#468189', '#77ACA2', '#9DBEBB']
                }
            ]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                position: 'top',
                fontSize: 18,
                fontColor: '#111'
            },
            legend: {
                display: true,
                position: 'bottom',
                labels: {
                    fontColor: '#333',
                    fontSize: 16
                }
            }
        }
    })
}
