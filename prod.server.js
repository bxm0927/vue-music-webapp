// 测试 dist
// 利用 Express 起一个本地测试服务器

var express = require('express')
var config = require('./config/index')
var axios = require('axios')

var app = express()

// axios 结合 node.js 代理后端请求
var apiRoutes = express.Router()
apiRoutes.get('/getList', function (req, res) {
  var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'

  axios.get(url, {
      headers: {
        referer: 'https://c.y.qq.com/',
        host: 'c.y.qq.com'
      },
      params: req.query
    })
    .then(function (response) {
      res.json(response.data)
    })
    .catch(function (error) {
      console.log(error)
    })
})
apiRoutes.get('/getLyric', function (req, res) {
  var url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'

  axios.get(url, {
      headers: {
        referer: 'https://c.y.qq.com/',
        host: 'c.y.qq.com'
      },
      params: req.query
    })
    .then((response) => {
      // jsonp 数据转为 json 数据
      var result = response.data

      if (typeof result === 'string') {
        var reg = /^\w+\(({[^()]+})\)$/
        var matches = result.match(reg)

        if (matches) {
          result = JSON.parse(matches[1])
        }
      }

      res.json(result)
      // res.json(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
})
app.use('/api', apiRoutes)

app.use(express.static('./dist'))

var port = process.env.PORT || config.build.port

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
