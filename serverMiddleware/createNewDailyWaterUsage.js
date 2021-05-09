const dailyWaterUsageController = require('../server/controller/dailyWaterUsageController');

module.exports = {
	path: '/api/createNewDailyWaterUsage',
	handler: dailyWaterUsageController.createNewDailyWaterUsage
}
