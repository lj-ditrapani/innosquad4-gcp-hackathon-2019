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
