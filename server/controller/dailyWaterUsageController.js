const DailyWaterUsage = require('../models/dailyWaterUsage')

module.exports = {
	createNewDailyWaterUsage: function (req, res) {
		DailyWaterUsage.create(req.body)
			.then(result => {
				res.status(201).json(result)
			})
			.catch(err => res.json(err))
	},
	findOneDailyWaterUsage: function (req, res) {
		const searchObject = req.body;
		DailyWaterUsage.findOne(searchObject)
			.then(result => {
				res.status(200).json(result)
			})
			.catch(err => res.json(err))
	},
	getAllDailyWaterUsage: function (req, res) {
		DailyWaterUsage.find({})
			.populate('seedBatch')
			.then(result => {
				res.status(200).json(result)
			})
			.catch(err => console.log(err))
	},
	searchDailyWaterUsage: function (req, res) {
		const searchObject = req.body;
		DailyWaterUsage.find(searchObject)
			.then(result => {
				res.status(200).json(result)
			})
			.catch(err => res.json(err))
	},
	deleteDailyWaterUsage: function (req, res) {
		DailyWaterUsage.deleteOne({ _id: req.params.id })
			.then(result => {
				res.status(200).json(result)
			})
			.catch(err => res.json(err))
	},
	updateOneDailyWaterUsage: function (req, res) {
		const { id, data } = req.body;
		DailyWaterUsage.findOneAndUpdate({ _id: id }, { ...data }, { new: true })
			.then(result => {
				res.status(200).json(result)
			})
			.catch(err => res.json(err))
	},
}
