const express = require('express')
const router = express.Router();
const submissionController = require('../controllers/submissionController');
const auth = require('../middlewares/authMiddleware')

router.post('/submit',submissionController.createSubmission);
router.get('/submit/:id', submissionController.getSubmissionById);
router.post('/analyze', submissionController.analyzeSubmission);
router.get('/solved', auth.checkJwt ,submissionController.getSolvedProblems);

module.exports = router