const express = require('express');
const { registerUser, generateOTP, resendOTP } = require('../controllers/userController');
const { validateUserRegistration } = require('../middlewares/validationMiddleware');

const router = express.Router();

router.post('/register', validateUserRegistration, registerUser);
router.post('/generate-otp', generateOTP);
router.post('/resend-otp', resendOTP);

module.exports = router;
