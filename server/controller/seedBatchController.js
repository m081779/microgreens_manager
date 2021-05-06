const SeedBatch = require('../models/seedBatch')

module.exports = {
    createNewSeedBatch: function (req, res) {
        console.log('req.body: ', req.body);
        SeedBatch.create(req.body)
            .then(result => {
                console.log('result: ', result);
                res.status(201).json(result)
            })
            .catch(err => res.json(err))
    },
    findOneSeedBatch: function (req, res) {
        const searchObject = req.body;
        console.log('searchObject find one: ', searchObject);
        SeedBatch.findOne(searchObject)
            .then(result => {
                console.log('result find one: ', result);
                res.status(200).json(result)
            })
            .catch(err => res.json(err))
    },
    findAllSeedBatches: function (req, res) {
        const searchObject = req.body;
        console.log('searchObject find all: ', searchObject);
        SeedBatch.find(searchObject)
            .then(result => {
                console.log('result find all: ', result);
                res.status(200).json(result)
            })
            .catch(err => res.json(err))
    },
    deleteSeedBatch: function (req, res) {
        console.log('req.params.id: ', req.params.id);
        SeedBatch.deleteOne({ _id: req.params.id })
            .then(result => {
                console.log('result delete: ', result);
                res.status(200).json(result)
            })
            .catch(err => res.json(err))
    },
    updateOneSeedBatch: function (req, res) {
        const { id, data } = req.body;
        console.log('searchObject find one and update: ', id, data);
        SeedBatch.findOneAndUpdate({ _id: id }, { ...data }, { new: true })
            .then(result => {
                console.log('result find one and update: ', result);
                res.status(200).json(result)
            })
            .catch(err => res.json(err))
    },
}
