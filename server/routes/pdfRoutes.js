const express = require('express');
const router = express.Router();
const pdfController = require('../controllers/pdfController');
const authMiddleware = require('../middleware/middleware');


const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.get('/',  pdfController.getAllPdfs);
router.get('/:subject', pdfController.getPdfsBySubject);
router.get('/:id', pdfController.getPdfsByUser);
router.post('/add', authMiddleware.auth, upload.single('file'), pdfController.addPdf);
router.delete('/:pdfId', authMiddleware.auth, pdfController.deletePdf);

module.exports = router;
