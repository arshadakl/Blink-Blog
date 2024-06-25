import { getAllComments, createComment } from '../models/commentModel.js';

const getAllCommentsController = async (req, res) => {
  const { postID } = req.params;
  try {
    const comments = await getAllComments(postID);
    res.json(comments);
  } catch (error) {
    res.status(500).send('Error fetching comments');
  }
};

const createCommentController = async (req, res) => {
  const { postID, userID, content } = req.body;
  try {
    await createComment({ postID, userID, content });
    res.status(201).send('Comment added successfully');
  } catch (error) {
    res.status(500).send('Error adding comment');
  }
};

export { getAllCommentsController, createCommentController };
