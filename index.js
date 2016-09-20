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
  crawlCategory: function (cb) {
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
          console.log('Category Error : ', err);
          return cb(err);
        }
        var $ = utils.$.load(res.text);
        var results = []
        var categories = $('font.bgfont');
        categories.each(function () {
          var result = {};
          var category = $(this);
          var text = category.text().replace(/[\s|\r|\n]+/g, '');
          var carr = null;
          
          if ('-'.indexOf(text) > -1) {
            carr = category.text().replace(/[\s|\r|\n]+/g, '').split('-');
          } else {
            carr = category.text().replace(/[\s|\r|\n]+/g, '').split('—');
          }   
          result.c1 = carr[0] || '';
          result.c2 = carr[1] || carr[0] || '';
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
  },
  crawlDisease: function (categories, cb) {
    if (!categories || categories.length === 0) {
      return cb(null, []);
    }
    utils.async.map(categories, function (category, cb1) {
      var result = {};
      result.name = category.name;
      result.diseases = [];
      result.pests = [];
      var url = category.url;
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
            console.log('Disease Error : ', err);
            return cb1(err);
          }
          var $ = utils.$.load(res.text);
          result.text = res.text;
          return cb1(null, result);
        });
    }, function (err, results) {
      cb(err, results);
    })
  }
})


var spider = new Spider();

spider.crawlCategory(function (err, results) {
  console.log(err, results);
});