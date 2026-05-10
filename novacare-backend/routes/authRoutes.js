const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

console.log('--- Debugging Imports ---');
console.log('Register Function:', register);
console.log('Login Function:', login);

// These will be prefixed by /api/auth in server.js
router.post('/register', register);
router.post('/login', login);

module.exports = router;