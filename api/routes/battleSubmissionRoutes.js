const express = require('express');
const router = express.Router();
const Battle = require('../models/Battle');
const {io} = require('../sockets/socket');
const { createBattleSubmission } = require('../controllers/battleSubmissonController');

router.post('/', createBattleSubmission)

module.exports = router;