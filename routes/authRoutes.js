const express = require('express');
const { register, login, resendOtp } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
// router.post('/resend-otp', resendOtp);

module.exports = router;
