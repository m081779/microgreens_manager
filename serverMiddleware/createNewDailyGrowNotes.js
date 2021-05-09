const dailyGrowNotesController = require('../server/controller/dailyGrowNotesController');

module.exports = {
	path: '/api/createNewDailyGrowNotes',
	handler: dailyGrowNotesController.createNewDailyGrowNotes
}
