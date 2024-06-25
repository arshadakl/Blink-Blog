import { sql, poolPromise } from '../config/database.js';

const getAllPosts = async () => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Posts');
    return result.recordset;
  } catch (error) {
    console.error('SQL error', error);
  }
};

const createPost = async ({ title, content, authorID, imageUrl }) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('title', sql.NVarChar, title)
      .input('content', sql.NVarChar, content)
      .input('authorID', sql.Int, authorID)
      .input('imageUrl', sql.NVarChar, imageUrl || null)
      .query(`INSERT INTO Posts (title, content, authorID, imageUrl) 
              OUTPUT INSERTED.postID, INSERTED.title, INSERTED.content, INSERTED.authorID, INSERTED.created_at, INSERTED.imageUrl
              VALUES (@title, @content, @authorID, @imageUrl)`);
    return result.recordset[0];
  } catch (error) {
    console.error('SQL error', error);
    throw error;
  }
};


const editPost = async ({ postID, title, content, imageUrl }) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('postID', sql.Int, postID)
      .input('title', sql.NVarChar, title)
      .input('content', sql.NVarChar, content)
      .input('imageUrl', sql.NVarChar, imageUrl || null)
      .query(`UPDATE Posts 
              SET title = @title, content = @content, imageUrl = @imageUrl
              WHERE postID = @postID
              OUTPUT INSERTED.postID, INSERTED.title, INSERTED.content, INSERTED.authorID, INSERTED.created_at, INSERTED.imageUrl`);
    return result.recordset[0];
  } catch (error) {
    console.error('SQL error', error);
    throw error;
  }
};


const deletePost = async (postID) => {
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('postID', sql.Int, postID)
      .query('DELETE FROM Posts WHERE postID = @postID');
    return true;
  } catch (error) {
    console.error('SQL error', error);
    throw error;
  }
};

const getPostByID = async (postID) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('postID', sql.Int, postID)
      .query('SELECT * FROM Posts WHERE postID = @postID');
    return result.recordset[0];
  } catch (error) {
    console.error('SQL error', error);
    throw error;
  }
};


export { getAllPosts, createPost, editPost, deletePost, getPostByID };
