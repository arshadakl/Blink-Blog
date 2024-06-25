import express from 'express';
import { getAllPostsController, createPostController, editPostController, deletePostController, getPostByIDController } from '../controllers/blogController.js';

const router = express.Router();

router.get('/posts', getAllPostsController);
router.post('/posts', createPostController);
router.put('/posts', editPostController);
router.delete('/posts/:postID', deletePostController);
router.get('/posts/:postID', getPostByIDController);

export default router;
