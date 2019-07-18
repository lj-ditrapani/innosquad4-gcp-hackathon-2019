const express = require('express')
// const contentType = require('content-type')
const getRawBody = require('raw-body')
const app = express()
const port = 3000

const onUpload = (request, response) => {
  const zipData = request.text
  response.send(`Hello World! Size is ${zipData.length}\n`)
}

/*
app.use(function (req, res, next) {
  getRawBody(req, {
    length: req.headers['content-length'],
    limit: '5gb',
    encoding: contentType.parse(req).parameters.charset
  }, function (err, string) {
    if (err) return next(err)
    req.text = string
    next()
  })
})
*/

app.use(express.static('frontend/public'))
app.post('/upload', onUpload)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
