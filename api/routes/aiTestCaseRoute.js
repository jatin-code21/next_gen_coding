const express = require('express');
const router = express.Router();
const aiTestCaseController = require('../controllers/aiTestCaseController');

router.get('/generate-test-cases/:problemId', aiTestCaseController.generateTestCases);

module.exports = router;