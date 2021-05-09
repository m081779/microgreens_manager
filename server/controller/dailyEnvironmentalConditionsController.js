const DailyEnvironmentalConditions = require('../models/dailyEnvironmentalConditions')

module.exports = {
	createNewDailyEnvironmentalConditions: function (req, res) {
		DailyEnvironmentalConditions.create(req.body)
			.then(result => {
				res.status(201).json(result)
			})
			.catch(err => res.json(err))
	},
	findOneDailyEnvironmentalConditions: function (req, res) {
		const searchObject = req.body;
		DailyEnvironmentalConditions.findOne(searchObject)
			.then(result => {
				res.status(200).json(result)
			})
			.catch(err => res.json(err))
	},
	getAllDailyEnvironmentalConditions: function (req, res) {
		DailyEnvironmentalConditions.find({})
			.populate('seedBatch')
			.then(result => {
				res.status(200).json(result)
			})
			.catch(err => console.log(err))
	},
	searchDailyEnvironmentalConditions: function (req, res) {
		const searchObject = req.body;
		DailyEnvironmentalConditions.find(searchObject)
			.then(result => {
				res.status(200).json(result)
			})
			.catch(err => res.json(err))
	},
	deleteDailyEnvironmentalConditions: function (req, res) {
		DailyEnvironmentalConditions.deleteOne({ _id: req.params.id })
			.then(result => {
				res.status(200).json(result)
			})
			.catch(err => res.json(err))
	},
	updateOneDailyEnvironmentalConditions: function (req, res) {
		const { id, data } = req.body;
		DailyEnvironmentalConditions.findOneAndUpdate({ _id: id }, { ...data }, { new: true })
			.then(result => {
				res.status(200).json(result)
			})
			.catch(err => res.json(err))
	},
}
