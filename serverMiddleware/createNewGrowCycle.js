const growCycleController = require('../server/controller/growCycleController');

module.exports = {
	path: '/api/createNewGrowCycle',
	handler: growCycleController.createNewGrowCycle
}
