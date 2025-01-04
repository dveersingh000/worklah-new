const User = require('../models/User');
const crypto = require('crypto');

// Generate OTP (6-digit random code)
// const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

// Register API
exports.register = async (req, res) => {
  const { fullName, phoneNumber, email, employmentStatus } = req.body;
  try {
    const existingUser = await User.findOne({ phoneNumber });
    if (existingUser) {
      return res.status(400).json({ message: 'User already registered.' });
    }

    // const otp = generateOtp();
    // const otpExpiry = Date.now() + 5 * 60 * 1000; // OTP valid for 5 minutes

    // const user = new User({ fullName, phoneNumber, email, employmentStatus, otp, otpExpiry });
    // await user.save();
    const user = new User({ fullName, phoneNumber, email, employmentStatus });
    await user.save();

    // Ideally, send OTP via SMS provider
    // console.log(`OTP for ${phoneNumber}: ${otp}`);

    res.status(201).json({ message: 'User registered successfully. OTP sent to mobile.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Login API
exports.login = async (req, res) => {
  const { phoneNumber /*,otp*/ } = req.body;

  try {
    const user = await User.findOne({ phoneNumber });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // if (user.otp !== otp || user.otpExpiry < Date.now()) {
    //   return res.status(400).json({ message: 'Invalid or expired OTP.' });
    // }

    // Invalidate OTP after successful login
    // user.otp = null;
    // user.otpExpiry = null;
    await user.save();

    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Resend OTP API
// exports.resendOtp = async (req, res) => {
//   const { phoneNumber } = req.body;

//   try {
//     const user = await User.findOne({ phoneNumber });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found.' });
//     }

//     const otp = generateOtp();
//     user.otp = otp;
//     user.otpExpiry = Date.now() + 5 * 60 * 1000;
//     await user.save();

//     // Ideally, send OTP via SMS provider
//     console.log(`New OTP for ${phoneNumber}: ${otp}`);

//     res.status(200).json({ message: 'OTP resent successfully.' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// };
