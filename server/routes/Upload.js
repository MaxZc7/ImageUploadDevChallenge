const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const { uploadController } = require('../controllers/uploadController');


router.post('/', upload.single('image'), uploadController
);

module.exports = router;
