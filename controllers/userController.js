const User = require('../models/User');
const { generateOTP, verifyOTP, sendOTP } = require('../utils/otpUtils');

exports.registerUser = async (req, res) => {
  try {
    const { fullName, phoneNumber, email, workPassStatus, otp } = req.body;

    // Verify OTP
    // if (!verifyOTP(phoneNumber, otp)) {
    //   return res.status(400).json({ message: 'Invalid OTP' });
    // }

    const newUser = new User({ fullName, phoneNumber, email, workPassStatus });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.generateOTP = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    const otp = generateOTP();
    await sendOTP(phoneNumber, otp);
    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.resendOTP = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    const otp = generateOTP();
    await sendOTP(phoneNumber, otp);
    res.status(200).json({ message: 'OTP resent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
