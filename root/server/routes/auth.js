const express = require('express'); 
const router = express.Router(); 
const authController = require('../controllers/AuthController')



router.post('/register', authController.signup); 
router.post('/login', authController.login); 
router.post('/logout', authController.logout);
router.post('/refresh_token', authController.refreshToken);


module.exports = router;