var request = require('superagent'),
    $ = require('cheerio'),
    _ = require('lodash'),
    charset = require('superagent-charset'),
    async = require('async');

var utils = {
  request: request,
  $: $,
  _: _,
  charset: charset,
  async: async
};

module.exports = utils;