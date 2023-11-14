const express = require('express'); 
const router = express.Router(); 
const panelController = require('../controllers/ProtectedExample');
const {isAuth} = require('../utils/isAuth');


router.post('/protected', panelController.panel)


module.exports = router;