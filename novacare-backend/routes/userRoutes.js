const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');

// This is the endpoint we will hit
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;