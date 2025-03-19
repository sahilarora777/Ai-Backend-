const express = require('express');

const { signup, login, verifyotp } = require('../controllers/auth.controller');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/verifyotp', verifyotp);

module.exports = router;