import { sql, poolPromise } from '../config/database.js';

const getAllComments = async (postID) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('postID', sql.Int, postID)
      .query('SELECT * FROM Comments WHERE postID = @postID');
    return result.recordset;
  } catch (error) {
    console.error('SQL error', error);
  }
};

const createComment = async ({ postID, userID, content }) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('postID', sql.Int, postID)
      .input('userID', sql.Int, userID)
      .input('content', sql.Text, content)
      .query('INSERT INTO Comments (postID, userID, content) VALUES (@postID, @userID, @content)');
    return result;
  } catch (error) {
    console.error('SQL error', error);
  }
};

export { getAllComments, createComment };
