var mongoose = require('mongoose');
var nongzuowuId = mongoose.Types.ObjectId('000000000000000000000001');
var shuiguoshucaiId = mongoose.Types.ObjectId('000000000000000000000002');
var guoshuId = mongoose.Types.ObjectId('000000000000000000000003');
var qitaId = mongoose.Types.ObjectId('000000000000000000000004');

exports.nongzuowuId = nongzuowuId;
exports.shuiguoshucaiId = shuiguoshucaiId;
exports.guoshuId = guoshuId;
exports.qitaId = qitaId;

exports.array = [{
	_id: nongzuowuId,
	name: '农作物',
	isDelete: false,
	level: 1,
	parentId: null,
	createdAt: new Date(),
	updatedAt: new Date()
}, {
	_id: shuiguoshucaiId,
	name: '水果蔬菜',
	isDelete: false,
	level: 1,
	parentId: null,
	createdAt: new Date(),
	updatedAt: new Date()
}, {
	_id: guoshuId,
	name: '果树',
	isDelete: false,
	level: 1,
	parentId: null,
	createdAt: new Date(),
	updatedAt: new Date()
}, {
	_id: qitaId,
	name: '其他',
	isDelete: true,
	level: 1,
	parentId: null,
	createdAt: new Date(),
	updatedAt: new Date()
}];
