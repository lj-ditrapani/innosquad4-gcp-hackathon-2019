const express = require('express');
const contentType = require('content-type');
const getRawBody = require('raw-body');
const JSZip = require('jszip');
const fs = require('fs')
const app = express();
const port = 3000;

const onUpload = (request, response, next) => {
    console.log(request.headers['content-type']);
    getRawBody(request, {
        length: request.headers['content-length'],
        limit: '5gb'
    })
        .then(rawZipBytes => {
            JSZip.loadAsync(rawZipBytes)
                .then(zip =>
                    zip
                        .file('search_history/your_search_history.json')
                        .async('string')
                        .then(text => [zip, text])
                )
                .then(pair => {
                    const [zip, text] = pair;
                    const json = JSON.parse(text);
                    response.json({
                        greeting: 'hello world',
                        size: rawZipBytes.length,
                        lastSearch: json.searches[0].title,
                        messages: getMessageData(zip),
                        searchHistory: getSearchHistory(zip),
                        locations: getLocationData(zip)
                    })
                })
        })
        .catch(err => {
            console.error(err)
            next(err)
        })
};

const processZip = rawZipBytes =>
    JSZip.loadAsync(rawZipBytes)
        .then(zip =>
            zip
            .file('search_history/your_search_history.json')
            .async('string')
            .then(text => [zip, text])
        )
        .then(pair => {
            const [zip, text] = pair;
            const json = JSON.parse(text);
            return {
                greeting: 'hello world',
                size: rawZipBytes.length,
                lastSearch: json.searches[0].title,
                messages: getMessageData(zip),
                searchHistory: getSearchHistory(zip),
                locations: getLocationData(zip)
            }
        })

const getMessageData = zip => {
    /*
    console.log('heer')
    zip.folder("/messages/inbox/").filter((path, filter) => {
        console.log(path)
        return true
    }).async("string").then(text => {
        console.log('aeoua')
        console.log(text)
        console.log('aeoua')
    })
    console.log('xxx')
    */
    return { m1: 'hi', m2: 'by' }
};

const getSearchHistory = zip => {
    return { m1: 'hi', m2: 'by' }
};

const getLocationData = zip => {
    const json = [
        {
            ip: '208.69.12.36'
        },
        {
            ip: '199.166.14.74'
        },
        {
            ip: '130.15.86.33'
        },
        {
            ip: '130.15.86.116'
        },
        {
            ip: '130.15.86.209'
        },
        {
            ip: '2605:8d80:0542:0786:3d1b:24a8:87ea:9ea3'
        },
        {
            ip: '2001:1970:5229:a200:c514:df35:3929:1a42'
        },
        {
            ip: '130.15.34.141'
        },
        {
            ip: '130.15.86.84'
        },
        {
            ip: '130.15.86.28'
        },
        {
            ip: '130.15.86.82'
        },
        {
            ip: '130.15.86.87'
        },
        {
            ip: '130.15.35.214'
        },
        {
            ip: '130.15.34.51'
        },
        {
            ip: '130.15.164.162'
        },
        {
            ip: '130.15.34.86'
        },
        {
            ip: '130.15.34.160'
        },
        {
            ip: '130.15.34.48'
        },
        {
            ip: '130.15.34.137'
        },
        {
            ip: '24.141.191.119'
        },
        {
            ip: '130.15.65.16'
        },
        {
            ip: '130.15.43.38'
        },
        {
            ip: '130.15.44.75'
        },
        {
            ip: '24.141.185.35'
        },
        {
            ip: '184.151.61.110'
        },
        {
            ip: '24.114.49.88'
        },
        {
            ip: '24.114.71.230'
        },
        {
            ip: '70.53.108.79'
        },
        {
            ip: '24.114.55.23'
        },
        {
            ip: '130.113.126.253'
        },
        {
            ip: '24.114.78.133'
        },
        {
            ip: '24.114.56.130'
        },
        {
            ip: '24.114.107.49'
        },
        {
            ip: '24.114.52.69'
        },
        {
            ip: '24.114.54.39'
        },
        {
            ip: '24.114.71.77'
        },
        {
            ip: '24.114.69.238'
        },
        {
            ip: '24.114.71.86'
        },
        {
            ip: '24.114.79.150'
        },
        {
            ip: '66.66.79.167'
        },
        {
            ip: '24.114.106.184'
        },
        {
            ip: '24.114.50.7'
        },
        {
            ip: '24.114.56.218'
        },
        {
            ip: '24.114.77.86'
        },
        {
            ip: '24.114.56.84'
        },
        {
            ip: '173.243.42.66'
        },
        {
            ip: '24.114.78.209'
        },
        {
            ip: '24.114.50.241'
        },
        {
            ip: '192.186.79.210'
        },
        {
            ip: '24.114.76.248'
        },
        {
            ip: '24.114.72.164'
        },
        {
            ip: '24.114.72.109'
        },
        {
            ip: '24.114.77.219'
        },
        {
            ip: '24.114.64.22'
        },
        {
            ip: '24.114.79.164'
        },
        {
            ip: '24.114.66.235'
        },
        {
            ip: '24.114.73.252'
        },
        {
            ip: '24.114.69.59'
        },
        {
            ip: '24.114.64.7'
        },
        {
            ip: '24.114.70.79'
        },
        {
            ip: '24.114.56.182'
        },
        {
            ip: '24.114.51.13'
        },
        {
            ip: '24.114.64.195'
        },
        {
            ip: '24.114.55.131'
        },
        {
            ip: '24.114.59.249'
        },
        {
            ip: '24.114.54.201'
        },
        {
            ip: '24.114.53.132'
        },
        {
            ip: '24.114.73.191'
        },
        {
            ip: '24.114.72.206'
        },
        {
            ip: '24.114.78.183'
        },
        {
            ip: '24.114.71.44'
        },
        {
            ip: '24.114.74.149'
        },
        {
            ip: '24.114.53.117'
        },
        {
            ip: '24.114.70.40'
        },
        {
            ip: '24.114.49.115'
        },
        {
            ip: '24.114.49.177'
        },
        {
            ip: '24.114.64.53'
        },
        {
            ip: '24.114.82.220'
        },
        {
            ip: '24.114.105.161'
        },
        {
            ip: '208.114.173.147'
        },
        {
            ip: '24.114.65.24'
        },
        {
            ip: '24.141.180.95'
        },
        {
            ip: '24.114.68.200'
        },
        {
            ip: '68.171.231.80'
        },
        {
            ip: '68.171.231.83'
        },
        {
            ip: '24.141.184.86'
        },
        {
            ip: '24.141.200.213'
        }
    ];
    let ipAddresses = [];
    for (i in json)
        ipAddresses.push(json[i]['ip']);
    var fs = require("fs");
    var text = fs.readFileSync("./apiKey.txt", 'utf8');
    // var text =
    console.log("THIS IS A LOG");
    console.log(text.toString());
    return {m1: 'hi', m2: 'by'}

}

app.use(express.static('frontend/public'));
app.post('/upload', onUpload);

// const file = fs.readFileSync("facebook-mauricenelson12327.zip")
// processZip(file)
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
