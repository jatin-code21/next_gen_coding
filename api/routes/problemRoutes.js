const express = require('express')
const router = express.Router();
const problemController = require('../controllers/problemController')

router.post('/', problemController.createProblem);
router.get('/getProblem/:id', problemController.getProblemById);
router.get('/getAllProblems', problemController.getAllProblem)

module.exports = router;