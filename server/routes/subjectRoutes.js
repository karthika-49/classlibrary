// server/routes/subjectRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/middleware');

const subjectController = require('../controllers/subjectController');

router.get('/all',  subjectController.getSubjects);
router.get('/:subjectName', subjectController.getSubjectByName);

module.exports = router;
