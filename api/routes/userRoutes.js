const express = require('express')
const router = express.Router();
const userController = require('../controllers/userController');
const checkJwt = require('../middlewares/authMiddleware')

router.post('/login', userController.createUser);
router.get('/:auth0Id', userController.getCurrentUser);


module.exports = router;