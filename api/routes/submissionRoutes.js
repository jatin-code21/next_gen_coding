const express = require('express')
const router = express.Router();
const submissionController = require('../controllers/submissionController');
// const checkJwt = require('../middlewares/authMiddleware')

router.post('/submit',submissionController.createSubmission);
router.get('/:id', submissionController.getSubmissionById);

module.exports = router