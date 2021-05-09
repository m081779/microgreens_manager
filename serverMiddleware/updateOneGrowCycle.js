const growCycleController = require('../server/controller/growCycleController');

module.exports = {
	path: '/api/updateOneGrowCycle',
	handler: growCycleController.updateOneGrowCycle
}