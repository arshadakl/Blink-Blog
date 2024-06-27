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
    console.log('editPost function called with:', { postID, title, content, imageUrl });

    const pool = await poolPromise;
    
    // First, update the post
    await pool.request()
      .input('postID', sql.Int, postID)
      .input('title', sql.NVarChar, title)
      .input('content', sql.NVarChar, content)
      .input('imageUrl', sql.NVarChar, imageUrl || null)
      .query(`
        UPDATE Posts
        SET title = @title, content = @content, imageUrl = @imageUrl
        WHERE postID = @postID
      `);

    // Then, fetch the updated post
    const result = await pool.request()
      .input('postID', sql.Int, postID)
      .query(`
        SELECT postID, title, content, authorID, created_at, imageUrl
        FROM Posts
        WHERE postID = @postID
      `);

    console.log('SQL query result:', result);

    if (result.recordset.length === 0) {
      throw new Error('No rows were updated');
    }

    return result.recordset[0];
  } catch (error) {
    console.error('SQL error in editPost:', error);
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


const getPostByUserID = async (authorID) => {
  try {

    if (isNaN(authorID)) {
      throw new Error('authorID must be a valid integer');
    }

    const pool = await poolPromise;
    const result = await pool.request()
      .input('authorID', sql.Int, authorID)
      .query('SELECT * FROM Posts WHERE authorID = @authorID');

    return result.recordset; 
  } catch (error) {
    console.error('SQL error', error);
    throw error; 
  }
};


export { getAllPosts, createPost, editPost, deletePost, getPostByID, getPostByUserID };
