const express = require('express')
const contentType = require('content-type')
const getRawBody = require('raw-body')
const app = express()
const port = 3000

const onUpload = (request, response, next) => {
    console.log(request.headers['content-type'])
    getRawBody(request, {
        length: request.headers['content-length'],
        limit: '5gb'
    })
        .then(zipData => {
            console.log(`parsed raw body.  ${zipData.length}`)
            response.send(`Hello World! Size is ${zipData.length}\n`)
        })
        .catch(err => {
            console.err(err)
            next(err)
        })
}

app.use(express.static('frontend/public'))
app.post('/upload', onUpload)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
