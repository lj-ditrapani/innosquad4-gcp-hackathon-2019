const express = require('express');
const _ = require('lodash')
const contentType = require('content-type');
const getRawBody = require('raw-body');
const JSZip = require('jszip');
const fs = require('fs')
const app = express();
const port = 3000;
const request = require('request-promise-native')

const onUpload = (request, response, next) => {
    console.log(request.headers['content-type']);
    getRawBody(request, {
        length: request.headers['content-length'],
        limit: '5gb'
    })
        .then(rawZipBytes => processZip(rawZipBytes))
        .then(json => response.json(json))
        .catch(err => {
            console.error(err)
            next(err)
        })
};

const processZip = rawZipBytes =>
    JSZip.loadAsync(rawZipBytes)
        .then(zip => {
            const p1 = getMessageData(zip)
            const p2 = getSearchHistory(zip)
            const p3 = getLocationData(zip)
            return Promise.all([p1, p2, p3])
        })
        .then(values => {
            const [messages, searchHistory, locations] = values
            return {
                rawSize: rawZipBytes.length,
                messages: messages,
                searchHistory: searchHistory,
                locations: locations
            }
        })

const getMessageData = zip => {
    console.log('heer')
    const zips = zip.folder("messages/inbox").filter((path, filter) =>
        _.endsWith(path, "message_1.json")
    )
    const promises = zips.map(zip => zip.async('string').then(json => JSON.parse(json)))
    return Promise.all(promises)
};

const getSearchHistory = zip =>
    zip
        .file('search_history/your_search_history.json')
        .async('string')
        .then(text => JSON.parse(text))

const getLocationData = zip => {
    const fs = require("fs");
    const text = fs.readFileSync("./apiKey.txt", 'utf8');
    console.log(text)
    const url = `http://api.ipstack.com/8.8.8.8?access_key=${text}`
    console.log(url)
    request.get(url).then(response => console.log(response))
    return zip
        .file('security_and_login_information/used_ip_addresses.json')
        .async('string')
        .then(text => JSON.parse(text))
}

app.use(express.static('frontend/public'));
app.post('/upload', onUpload);

// const file = fs.readFileSync("facebook-mauricenelson12327.zip")
// processZip(file).then(r => console.log(r))
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
