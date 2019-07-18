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
        url: "http://" + window.location.host + '/upload',
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

;(function($) {
    var $window = $(window),
        $body = $('body'),
        $header = $('#header'),
        $banner = $('#banner')

    // Breakpoints.
    breakpoints({
        wide: ('1281px', '1680px'),
        normal: ('981px', '1280px'),
        narrow: ('737px', '980px'),
        narrower: ('737px', '840px'),
        mobile: ('481px', '736px'),
        mobilep: (null, '480px')
    })

    // Play initial animations on page load.
    $window.on('load', function() {
        window.setTimeout(function() {
            $body.removeClass('is-preload')
        }, 100)
    })

    // Dropdowns.
    $('#nav > ul').dropotron({
        alignment: 'right'
    })

    // NavPanel.

    // Button.
    $(
        '<div id="navButton">' + '<a href="#navPanel" class="toggle"></a>' + '</div>'
    ).appendTo($body)

    // Panel.
    $('<div id="navPanel">' + '<nav>' + $('#nav').navList() + '</nav>' + '</div>')
        .appendTo($body)
        .panel({
            delay: 500,
            hideOnClick: true,
            hideOnSwipe: true,
            resetScroll: true,
            resetForms: true,
            side: 'left',
            target: $body,
            visibleClass: 'navPanel-visible'
        })

    // Header.
    if (!browser.mobile && $header.hasClass('alt') && $banner.length > 0) {
        $window.on('load', function() {
            $banner.scrollex({
                bottom: $header.outerHeight(),
                terminate: function() {
                    $header.removeClass('alt')
                },
                enter: function() {
                    $header.addClass('alt reveal')
                },
                leave: function() {
                    $header.removeClass('alt')
                }
            })
        })
    }
})(jQuery)
