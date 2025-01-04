const crypto = require('crypto');

let otpStore = {}; // Store OTPs temporarily for simplicity

exports.generateOTP = () => {
  const otp = crypto.randomInt(100000, 999999).toString();
  return otp;
};

exports.sendOTP = async (phoneNumber, otp) => {
  otpStore[phoneNumber] = otp;
  console.log(`Sending OTP ${otp} to phone number ${phoneNumber}`);
};

exports.verifyOTP = (phoneNumber, otp) => {
  return otpStore[phoneNumber] === otp;
};
