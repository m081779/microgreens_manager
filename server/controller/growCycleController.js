const GrowCycle = require('../models/growCycle');

module.exports = {
    createNewGrowCycle: function (req, res) {
        GrowCycle.create(req.body)
            .then(result => {
                res.status(201).json(result)
            })
            .catch(err => res.json(err))
    },
    findOneGrowCycle: function (req, res) {
        const searchObject = req.body;
        GrowCycle.findOne(searchObject)
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => res.json(err))
    },
    getAllGrowCycles: function (req, res) {
        GrowCycle
            .find({})
            .populate('seedBatch')
            .populate('dailyWaterUsage')
            .populate('dailyEnvironmentalConditions')
            .populate('dailyEnvironmentalConditions')
            .populate('dailyGrowNotes')
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => console.log(err))
    },
    searchGrowCycles: function (req, res) {
        const searchObject = req.body;
        GrowCycle.find(searchObject)
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => res.json(err))
    },
    deleteGrowCycle: function (req, res) {
        const baseURL = 'http://' + req.headers.host + '/';
        const params = new URL(req.url, baseURL).searchParams;
        const _id = params.get('id');
        GrowCycle.deleteOne({ _id })
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => res.json(err))
    },
    updateOneGrowCycle: function (req, res) {
        const { id, data } = req.body;
        GrowCycle.findOneAndUpdate({ _id: id }, { ...data }, { new: true })
            .populate('seedBatch')
            .populate('dailyWaterUsage')
            .populate('dailyEnvironmentalConditions')
            .populate('dailyEnvironmentalConditions')
            .populate('dailyGrowNotes')
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => res.json(err))
    },
    updateAllGrowCycles: function (req, res) {
        const { idArray, payload } = req.body;
        GrowCycle.updateMany(
            {
                _id: { "$in": idArray }
            },
            payload,
            { "multi": true })
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => res.json(err))
    },
}
