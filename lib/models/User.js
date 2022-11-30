const pool = require('../utils/pool');

class User {
  id;
  email;
  firstName;
  lastName;
  #passwordHash;

  constructor(row) {
    this.id = row.id;
    this.email = row.email;
    this.firstName = row.first_name;
    this.lastName = row.last_name;
    this.#passwordHash = row.password_hash;
  }

  static async insert({ email, firstName, lastName, passwordHash }) {
    const { rows } = await pool.query(
      'INSERT INTO users2 (email, first_name, last_name, password_hash) VALUES ($1, $2, $3, $4) RETURNING *',
      [email, firstName, lastName, passwordHash]
    );

    return new User(rows[0]);
  }
}
module.exports = User;
