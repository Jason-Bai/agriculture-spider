var request = require('superagent'),
    $ = require('cheerio'),
    _ = require('lodash'),
    charset = require('superagent-charset');

var utils = {
  request: request,
  $: $,
  _: _,
  charset: charset
};

module.exports = utils;