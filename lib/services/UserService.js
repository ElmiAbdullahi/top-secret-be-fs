const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

module.exports = class UserService {
  static async create({ email, password }) {
    console.log(email, password);
    const passwordHash = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUNDS)
    );
    const user = await User.insert({
      email,
      passwordHash,
    });
    console.log(user);
    return user;
  }
};
