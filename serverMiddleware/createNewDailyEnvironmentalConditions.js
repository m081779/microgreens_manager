const dailyEnvironmentalConditionsController = require('../server/controller/dailyEnvironmentalConditionsController');

module.exports = {
	path: '/api/createNewDailyEnvironmentalConditions',
	handler: dailyEnvironmentalConditionsController.createNewDailyEnvironmentalConditions
}
