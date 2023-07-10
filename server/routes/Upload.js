const express = require('express');
const router = express.Router();
const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
     
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, file.originalname.split('.')[0] + '-' + uniqueSuffix + '.' + file.originalname.split('.')[1]);
    },
  });
  
  const upload = multer({ storage: storage });

const { uploadController } = require('../controllers/uploadController');


router.post('/', upload.single('image'), uploadController
);

module.exports = router;
