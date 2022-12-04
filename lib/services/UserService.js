const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

module.exports = class UserService {
  static async create({ email, password }) {
    const passwordHash = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUNDS)
    );
    const user = await User.insert({
      email,
      passwordHash,
    });

    return user;
  }

  static async signIn({ email, password }) {
    // get the user with matching email from the database
    const user = await User.getByEmail(email);
    // if the user doesn't exist, throw an error
    if (!user) throw new Error('Invalid email!');
    // compare the password in req.body with the password_hash in the db
    //    (bcrypt has a built in function for this)
    // if the passwords don't match, throw an error
    if (!bcrypt.compareSync(password, user.passwordHash))
      // checked the ID
      throw new Error('Invalid password');
    // create a jsonwebtoken and return
    // give the user their wristband
    const token = jwt.sign({ ...user }, process.env.JWT_SECRET, {
      expiresIn: '1 day',
    });
    return token;
  }
};
