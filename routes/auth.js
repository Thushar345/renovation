const express = require('express');
const { register, login, dashboard } = require('../controllers/authController');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/dashboard', authenticate, dashboard);

module.exports = router;
