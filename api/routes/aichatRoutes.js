const express = require('express');
const router = express.Router();
const aiChatController = require('../controllers/aiChatController');
const authMiddleware = require('../middlewares/authMiddleware');

// router.use(authMiddleware.checkJwt);

router.get('/questions-left', authMiddleware.checkJwt, aiChatController.getQuestionsLeft);
router.post('/ask', authMiddleware.checkJwt, aiChatController.askQuestion);

module.exports = router;
