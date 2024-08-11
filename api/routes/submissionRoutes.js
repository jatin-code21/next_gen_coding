const express = require('express')
const router = express.Router();
const submissionController = require('../controllers/submissionController');
const checkJwt = require('../middlewares/authMiddleware')

router.post('/submit', checkJwt, submissionController.createSubmission);
router.get('/:id', checkJwt, submissionController.getSubmissionById);

module.exports = router