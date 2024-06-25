import { sql, poolPromise } from '../config/database.js';

const getAllPosts = async () => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM BlogPosts');
    return result.recordset;
  } catch (error) {
    console.error('SQL error', error);
  }
};

const createPost = async ({ userID, title, content }) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('userID', sql.Int, userID)
      .input('title', sql.NVarChar, title)
      .input('content', sql.Text, content)
      .execute('AddBlogPost');
    return result;
  } catch (error) {
    console.error('SQL error', error);
  }
};

export { getAllPosts, createPost };
