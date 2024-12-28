const { pool } = require('./db');
const bcrypt = require('bcrypt');

async function createUser(username, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hashedPassword]);
}

async function findUserByUsername(username) {
  const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
  return result.rows[0];
}

module.exports = { createUser, findUserByUsername };