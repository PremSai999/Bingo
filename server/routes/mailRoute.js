const express = require('express');
const router = express.Router();
const mailController = require('../controllers/mailController')

router.post('/sendMail',mailController.sendWinnerMail)

module.exports = router;