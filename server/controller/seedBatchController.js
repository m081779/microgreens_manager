const SeedBatch = require('../models/seedBatch')

module.exports = {
    createNewSeedBatch: function (req, res) {
        SeedBatch.create(req.body)
            .then(result => {
                res.status(201).json(result)
            })
            .catch(err => res.json(err))
    },
    findOneSeedBatch: function (req, res) {
        const searchObject = req.body;
        SeedBatch.findOne(searchObject)
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => res.json(err))
    },
    getAllSeedBatches: function (req, res) {
        const searchObject = req.body;
        SeedBatch.find(searchObject)
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => res.json(err))
    },
    deleteSeedBatch: function (req, res) {
        SeedBatch.deleteOne({ _id: req.params.id })
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => res.json(err))
    },
    updateOneSeedBatch: function (req, res) {
        const { id, data } = req.body;
        SeedBatch.findOneAndUpdate({ _id: id }, { ...data }, { new: true })
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => res.json(err))
    },
}
