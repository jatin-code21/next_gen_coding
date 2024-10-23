const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');
const auth = require('../middlewares/authMiddleware');

router.post('/', auth.checkJwt, roomController.createRoom);
router.post('/:roomId', auth.checkJwt, roomController.joinRoom);
router.get('/:roomId', auth.checkJwt, roomController.roomStatus);

module.exports = router; 