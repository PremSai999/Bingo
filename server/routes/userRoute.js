const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.signup);
router.post('/login', userController.login);
router.get('/getUser/:user',userController.getUser);
router.get('/getUsers',userController.getUsers);
router.get('/search',userController.invite);


module.exports = router;