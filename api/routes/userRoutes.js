const express = require('express')
const router = express.Router();
const userController = require('../controllers/userController');
const checkJwt = require('../middlewares/authMiddleware')

router.post('/login', userController.createUser);

module.exports = router;