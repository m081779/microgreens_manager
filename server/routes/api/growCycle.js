const router = require('express').Router();
const growCycleController = require('../../controller/growCycleController');

router.post('/createNewGrowCycle', growCycleController.createNewGrowCycle);

router.post('/findOneGrowCycle', growCycleController.findOneGrowCycle);

router.get('/getAllGrowCycles', growCycleController.getAllGrowCycles);
router.post('/searchAllGrowCycles', growCycleController.getAllGrowCycles);

router.delete('/:id', growCycleController.deleteGrowCycle);

router.put('/updateOneGrowCycle', growCycleController.updateOneGrowCycle);

module.exports = router;