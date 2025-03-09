const express = require('express');
const router = express.Router();
const { login, register } = require('../controllers/authController');

// POST /api/auth/register - Create new user
router.post('/register', register);

// POST /api/auth/login - Login user and generate token

router.post('/login', login);

module.exports = router;
