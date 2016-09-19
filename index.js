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
      .get(this.options.site.host + '/Right.aspx')
      .set('User-Agent', this.options.site.headers['User-Agent'])
      .set('Cookie', this.options.site.headers.Cookie)
      .set('Host', this.options.site.headers.Host)
      .charset('gbk')
      .end(function (err, res) {
        if (err) {
          console.log('Error:', err);
          return cb(err);
        }
        var $ = utils.$.load(res.text);
        var results = []
        var categories = $('font.bgfont');
        categories.each(function () {
          var result = {};
          var category = $(this);
          var carr = category.text().replace(/[\s|\r|\n]+/g, '').split('—');
          result.tag = carr[0] || '';
          result.name = carr[1] || '';
          result.subs = [];
          var subCategories = category.nextAll();
          subCategories.each(function () {
            var subCategory = $(this);
            var subResult = {};
            var subName = subCategory.text().replace(/[\s|\r|\n]+/g, '');
            subResult.name = subName;
            subResult.url = configs.site.host + '/' + subCategory.attr('href');
            result.subs.push(subResult);
          });
          results.push(result);
        });
        cb(null, results);
      });
  }
})


var spider = new Spider();

spider.crawl(function (err, results) {
  console.log(err, results);
});