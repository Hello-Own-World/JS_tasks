const bcrypt = require('bcryptjs');

async function hashPass(pass) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(pass, salt);
  return hashedPassword;
}

async function checkPass(pass1, pass2) {
  const res = await bcrypt.compare(pass1, pass2);
  return res;
}

module.exports = {
  hashPass,
  checkPass,
};
