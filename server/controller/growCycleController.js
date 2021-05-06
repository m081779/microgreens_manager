const GrowCycle = require('../models/growCycle')
const SeedBatch = require('../models/seedBatch')

module.exports = {
    createNewGrowCycle: function (req, res) {
        console.log('req.body: ', req.body);
        GrowCycle.create(req.body)
            .then(result => {
                console.log('result from createNewGrowCycle: ', result);
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
        GrowCycle.find({})
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => res.json(err))
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
        GrowCycle.deleteOne({ _id: req.params.id })
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => res.json(err))
    },
    updateOneGrowCycle: function (req, res) {
        const { id, data } = req.body;
        GrowCycle.findOneAndUpdate({ _id: id }, { ...data }, { new: true })
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => res.json(err))
    },
}
