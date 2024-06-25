import { sql, poolPromise } from '../config/database.js';

const createUser = async ({ username, email, password }) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('username', sql.NVarChar, username)
      .input('email', sql.NVarChar, email)
      .input('password', sql.NVarChar, password)
      .query(`INSERT INTO Users (username, email, password) 
              OUTPUT INSERTED.userID, INSERTED.username, INSERTED.email, INSERTED.created_at
              VALUES (@username, @email, @password)`);
    return result.recordset[0];
  } catch (error) {
    console.error('SQL error', error);
    throw error;
  }
};

const findUserByEmail = async (email) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('email', sql.NVarChar, email)
      .query('SELECT * FROM Users WHERE email = @email');
    return result.recordset[0];
  } catch (error) {
    console.error('SQL error', error);
    throw error;
  }
};

const findUserByUsername = async (username) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('username', sql.NVarChar, username)
      .query('SELECT * FROM Users WHERE username = @username');
    return result.recordset[0];
  } catch (error) {
    console.error('SQL error', error);
    throw error;
  }
};

export { createUser, findUserByEmail, findUserByUsername };
