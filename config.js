var configs = {
  db: {
    host: '',
    port: 27017,
    user: '',
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
  }
};

module.exports = configs;