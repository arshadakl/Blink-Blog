import express from 'express';
import { getAllCommentsController, createCommentController } from '../controllers/commentController.js';

const router = express.Router();

router.get('/posts/:postID/comments', getAllCommentsController);
router.post('/posts/:postID/comments', createCommentController);

export default router;
