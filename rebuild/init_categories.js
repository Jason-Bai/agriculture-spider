var _ = require('lodash'),
    async = require('async'),
		categoryData = require('../data/categories');

var Category = require('../models').Category;

var initCategories = {
	'农作物': {
		children: []
	},
	'水果蔬菜': {
		children: []
	},
	'果树': {
		children: []
	},
	'其他': {
		children: []
	}
};

var keys = _.keys(initCategories);


_.each(categoryData, function (c) {

	_.each(c.subs, function (sc) {

					var obj = {
						name: sc.name
					};
					
					if (c.c1 === '农作物') {

						initCategories['农作物'].children.push(obj);
						
					} else if (c.c1 === '水果' || c.c1 === '蔬菜') {

						initCategories['水果蔬菜'].children.push(obj);
					
					} else if (c.c1 === '果树') {

						initCategories['果树'].children.push(obj);
						
					} else {
						initCategories['其他'].children.push(obj);
					}
	});

});

var createCategories = function (categories, cb) {
	
	async.map(categories, function (c, cb2) {

		Category.create(c, function (err, m) {

			if (err) {
				return cb2(err);
			}

			return cb2(null, m)
			
		});
		
	}, function (err, results) {
		if (err) {
			return cb(err);
		}

		return cb(null, results);
	
	});

};


var create01 = function () {

  var cArr = [];

  _.each(keys, function (key) {
	
	  var obj = {
		  name: key
	  };

	  cArr.push(obj);

  })

	createCategories(cArr, function (err, results) {
		if (err) {
			console.log(err);
			return;
		}
		console.log(results);
	})

}

_.each(keys, function (key) {

	console.log('------------------------------------------------');
	console.log(key);
	console.log(initCategories[key].children);
	console.log('------------------------------------------------');

})
