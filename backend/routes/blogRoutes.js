import express from 'express';
import { getAllPostsController, createPostController, editPostController, deletePostController, getPostByIDController, getUserByIDController } from '../controllers/blogController.js';
import { uploadMiddleware } from '../middlewares/fileupload.js';
import { Auth } from '../middlewares/Auth.js';


const router = express.Router();

router.get('/posts', getAllPostsController);
router.post('/posts', Auth,uploadMiddleware, createPostController);
router.put('/posts/:postId', Auth, uploadMiddleware, editPostController);
router.delete('/posts/:postID',Auth, deletePostController);
router.get('/posts/:postID', getPostByIDController);
router.get('/getuser/:userID', getUserByIDController)

export default router;
