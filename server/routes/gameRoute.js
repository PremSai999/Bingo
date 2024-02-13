const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

router.post('/isUnique', gameController.isUnique);
router.post('/checkRoom', gameController.checkRoom);
router.post('/updatePlayer', gameController.updatePlayer);
router.post('/updateReady', gameController.updateReady);
router.post('/getPlayers', gameController.getPlayers);
router.post('/getGameStats', gameController.getGameStats);

module.exports = router;