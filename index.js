var Spider = require('./lib');

var spider = new Spider();

var express = require('express');
var logger = require('morgan');
var errorHandler = require('errorhandler');

var configs = require('./config');

var app = express();

var port = process.env.PORT || configs.services.port;

app.set('port', port);
app.use(logger('dev'));

var router = express.Router();

router.get('/', function (req ,res) {
  res.json(configs.apis);
});

router.get('/categories', function (req, res) {
  spider.crawlCategory(function (err, categories) {
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(200).send(categories);
  })
});

router.get('/diseases', function (req, res) {

  var categories = [{
    name: '水稻',
    url: 'http://bcch.ahnw.gov.cn/Show.aspx?id=30&type=crop'
  }];

  spider.crawlDisease(categories, function (err, diseases) {
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(200).send(diseases);
  });

});

router.get('/diseases/detail', function (req, res) {
  var diseases = [{
    name: '稻瘟病',
    url: 'http://bcch.ahnw.gov.cn/CropContent.aspx?id=3393'
  }];
  spider.crawlDiseaseDetail(diseases, function (err, detail) {
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(200).send(detail);
  });
});

// development only
if ('development' == app.get('env')) {
  app.use(errorHandler());
}

app.use('/', router);

app.listen(port, function () {
  console.log('Agriculture Spider API running at ' + port + ' port!');
});