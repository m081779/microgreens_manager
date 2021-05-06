const router = require('express').Router();
const seedBatchController = require('../../controller/seedBatchController');

router.post('/createNewSeedBatch', seedBatchController.createNewSeedBatch);

router.post('/findOneSeedBatch', seedBatchController.findOneSeedBatch);

router.post('/findAllSeedBatches', seedBatchController.findAllSeedBatches);

router.delete('/:id', seedBatchController.deleteSeedBatch);

router.put('/updateOneSeedBatch', seedBatchController.updateOneSeedBatch);

module.exports = router;