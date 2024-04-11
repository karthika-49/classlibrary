const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const authMiddleware = require('../middleware/middleware');

router.get('/profile', authMiddleware.auth, userController.profile);
router.put('/profile', authMiddleware.auth, userController.updateProfile); 

module.exports = router;
