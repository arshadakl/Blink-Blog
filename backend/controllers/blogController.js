import { getAllPosts, createPost } from '../models/blogModel.js';

const getAllPostsController = async (req, res) => {
  try {
    const posts = await getAllPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).send('Error fetching posts');
  }
};

const createPostController = async (req, res) => {
  const { userID, title, content } = req.body;
  try {
    await createPost({ userID, title, content });
    res.status(201).send('Post created successfully');
  } catch (error) {
    res.status(500).send('Error creating post');
  }
};

export { getAllPostsController, createPostController };
