const express = require('express');
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const s3Controller = require('../controllers/s3Controller');

router.post('/uploadFile', upload.single('fileData') ,s3Controller.uploadFile);

module.exports = router;