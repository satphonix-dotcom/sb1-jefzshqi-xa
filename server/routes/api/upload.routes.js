const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const upload = require('../../config/s3');
const {
  uploadSingle,
  uploadMultiple,
  deleteFile
} = require('../../controllers/upload.controller');

router.use(auth);

router.post('/single', upload.single('image'), uploadSingle);
router.post('/multiple', upload.array('images', 5), uploadMultiple);
router.delete('/:key', deleteFile);

module.exports = router;