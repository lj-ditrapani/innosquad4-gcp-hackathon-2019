const express = require('express')
const contentType = require('content-type')
const getRawBody = require('raw-body')
const JSZip = require('jszip')
const app = express()
const port = 3000

const onUpload = (request, response, next) => {
    console.log(request.headers['content-type'])
    getRawBody(request, {
        length: request.headers['content-length'],
        limit: '5gb'
    })
        .then(rawZipBytes => {
            console.log(`parsed raw body.  ${rawZipBytes.length}`)
            JSZip.loadAsync(rawZipBytes)
                .then(zip =>
                    zip
                        .file('search_history/your_search_history.json')
                        .async('string')
                        .then(text => [zip, text])
                )
                .then(pair => {
                    const [zip, text] = pair
                    console.log(text)
                    const json = JSON.parse(text)
                    console.log(json)
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
            console.err(err)
            next(err)
        })
}

const getMessageData = zip => {
    return { m1: 'hi', m2: 'by' }
}

const getSearchHistory = zip => {
    return { m1: 'hi', m2: 'by' }
}

const getLocationData = zip => {
    return { m1: 'hi', m2: 'by' }
}

app.use(express.static('frontend/public'))
app.post('/upload', onUpload)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
