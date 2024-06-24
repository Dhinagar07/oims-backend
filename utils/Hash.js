const bcrypt = require("bcrypt");
class Hash {
  // Function to hash a password
  static async hashPassword(password) {
    try {
      const saltRounds = 10; // Number of salt rounds
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      return hashedPassword;
    } catch (error) {
      throw error;
    }
  }

  // Function to verify a password
  static async verifyPassword(plainPassword, hashedPassword) {
    try {
      const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
      return isMatch;
    } catch (error) {
      throw error;
    }
  }
}
module.exports = Hash
