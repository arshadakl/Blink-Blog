import { getAllComments, createComment } from '../models/commentModel.js';

const getAllCommentsController = async (req, res, next) => {
  const { postID } = req.params;
  try {
    const comments = await getAllComments(postID);
    res.json(comments);
  } catch (error) {
    next(error)
  }
};

const createCommentController = async (req, res, next) => {
  const { postID, userID, content } = req.body;
  try {
    await createComment({ postID, userID, content });
    res.status(201).send({status:true,message:'Comment added successfully'});
  } catch (error) {
    next(error)
  }
};

export { getAllCommentsController, createCommentController };
