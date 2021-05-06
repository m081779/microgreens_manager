const seedBatchController = require('../server/controller/seedBatchController');

module.exports = {
	path: '/api/getAllSeedBatches',
	handler: seedBatchController.getAllSeedBatches
}