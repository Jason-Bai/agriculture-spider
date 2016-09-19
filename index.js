var utils = require('./lib/utils'),
    configs = require('./config');

function Spider(options) {
  this.options = utils._.extend({}, options, configs);
}

Spider.extend = function (obj) {
  var extended = obj.extended;

  for(var i in obj) {
    if (!Spider.prototype[i]) {
      Spider.prototype[i] = obj[i];
    }
  }

  if (extended) {
    extended(Spider);
  }
}

Spider.include = function (obj) {
  var included = obj.included;
  for(var i in obj) {
    if (!Spider[i]) {
      Spider[i] = obj[i];
    }
  }

  if (included) {
    included(Spider);
  }
}

Spider.extend({
  crawl: function (cb) {
    console.log('start crawling : ', this.options.site.host);
    var options = {
      url: this.options.site.host,
      method: 'GET',
      headers: this.options.site.headers,
      timeout: this.options.site.timeout
    };
    var request = utils.request;
    utils.charset(request);
    request
      .get(this.options.site.host)
      .set('User-Agent', this.options.site.headers['User-Agent'])
      .set('Cookie', this.options.site.headers.Cookie)
      .set('Host', this.options.site.headers.Host)
      .charset('gbk')
      .end(function (err, res) {
        if (err) {
          console.log('Error:', err);
          return cb(err);
        }
        //var $ = utils.$.load(res.text, {decodeEntities: false});
        var $ = utils.$.load(res.text);
        var results = []
        var categories = $('font.bgtopfont');
        utils._.each(categories, function (category) {
          var result = {};
          console.log(category);
          //result.name = category.text();
          //var subCategories = category.next('table').find('font.bgfont');
          //console.log(subCategories.length);
        })
        cb(null, categories);
      });
  }
})


var spider = new Spider();
setInterval(function () {
  spider.crawl(function (err, result) {
  });
}, 5000);