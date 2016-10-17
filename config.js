var configs = {
  services: {
    name: 'Agriculture-Spider-API',
    host: 'http://spider.boybai.cn',
    port: 5000
  },
  db: {
    host: '',
    port: 27017,
    user: '',
    name: '',
    pass: ''
  },
  site: {
    host: 'http://bcch.ahnw.gov.cn',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.103 Safari/537.36',
      'Cookie': 'CNZZDATA1583786=cnzz_eid%3D1377206991-1474285892-%26ntime%3D1474285892',
      'Host': 'bcch.ahnw.gov.cn'
    },
    timeout: 3000
  },
  apis: [{
    name: '农业分类',
    url: 'http://spider.boybai.cn/categories' 
  }, {
    name: '农业子类',
    url: 'http://spider.boybai.cn/diseases'
  }, {
    name: '病虫害',
    url: 'http://spider.boybai.cn/diseases/detail'
  }],
  init: {
    categories: {
      on: true,
      show: ['果树', '蔬菜', '农作物']
    }
  }
};

module.exports = configs;
