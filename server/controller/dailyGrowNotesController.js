const DailyGrowNotes = require('../models/dailyGrowNotes')

module.exports = {
	createNewDailyGrowNotes: function (req, res) {
		DailyGrowNotes.create(req.body)
			.then(result => {
				res.status(201).json(result)
			})
			.catch(err => res.json(err))
	},
	deleteDailyGrowNotes: function (req, res) {
		DailyGrowNotes.deleteOne({ _id: req.params.id })
			.then(result => {
				res.status(200).json(result)
			})
			.catch(err => res.json(err))
	},
}