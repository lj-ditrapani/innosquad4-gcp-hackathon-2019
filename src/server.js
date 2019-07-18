const express = require('express')
const contentType = require('content-type')
const getRawBody = require('raw-body')
const app = express()
const port = 3000

const onUpload = (request, response) => {
  console.log(request.headers['content-type'])
  getRawBody(request, {
    length: request.headers['content-length'],
    limit: '5gb',
    encoding: contentType.parse(request).parameters.charset
  }, function (err, zipData) {
    if (err) return next(err)
    response.send(`Hello World! Size is ${zipData.length}\n`)
  })
}


app.use(express.static('frontend/public'))
app.post('/upload', onUpload)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
