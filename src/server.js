const express = require('express')
const getRawBody = require('raw-body')
const JSZip = require('jszip')
const fs = require('fs')
const _ = require('lodash')
const app = express()
const port = 3000
const request = require('request-promise-native')

const onUpload = (request, response, next) => {
    console.log(request.headers['content-type'])
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
}

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
    const zips = zip
        .folder('messages/inbox')
        .filter((path, filter) => path.endsWith('message_1.json'))
    const promises = zips.map(zip => zip.async('string'))
    return Promise.all(promises).then(textArray =>
        _.flatten(textArray.map(processMessageText), true)
    )
}

const processMessageText = text => {
    const json = JSON.parse(text)
    const participants = json.participants.map(obj => obj.name)
    console.log(participants)
    return json.messages
        .filter(message => message.content !== undefined)
        .map(input => ({
            participants,
            senderName: input.sender_name,
            timestampMs: input.timestamp_ms,
            size: input.content.length,
            title: input.title
        }))
}

const getSearchHistory = zip =>
    zip
        .file('search_history/your_search_history.json')
        .async('string')
        .then(text => JSON.parse(text).searches.map(obj => obj.data[0].text))

const apiKey = fs.readFileSync('./apiKey.txt', 'utf8')

const ipLocation = ip => {
    const url = `http://api.ipstack.com/${ip}?access_key=${apiKey}`
    return request.get(url).then(response => {
        const json = JSON.parse(response)
        return [json.latitude, json.longitude]
    })
}

const getLocationData = zip => {
    return zip
        .file('security_and_login_information/used_ip_addresses.json')
        .async('string')
        .then(text => {
            const promises = JSON.parse(text).used_ip_address.map(obj =>
                ipLocation(obj.ip)
            )
            return Promise.all(promises)
        })
}

app.use(express.static('frontend/public'))
app.post('/upload', onUpload)

// const file = fs.readFileSync("facebook-mauricenelson12327.zip")
// processZip(file).then(r => console.log(r))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
