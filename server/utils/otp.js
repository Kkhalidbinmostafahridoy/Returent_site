const crypto = require('crypto')

function generateOtp() {
  return String(crypto.randomInt(100000, 999999))
}

module.exports = { generateOtp }
