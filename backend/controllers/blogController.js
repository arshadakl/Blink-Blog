import { getAllPosts, createPost, editPost, getPostByID } from "../models/blogModel.js";
import { updateUserProfile } from "../models/userModel.js";
import CustomError from "../utils/CustomError.js";

const getAllPostsController = async (req, res, next) => {
  try {
    const posts = await getAllPosts();
    res.status(200).json({status:true,posts});
  } catch (error) {
    next(error)
  }
};

const createPostController = async (req, res, next) => {
  try {
    const { title, content, authorID, imageUrl } = req.body;
    if (!(title && content && authorID)) {
      throw new CustomError("Please fill all the fields", 422);
    }

    const newPost = await createPost({title, content, authorID, imageUrl });
    res.status(201).json({status:true , message: "Post created successfully", post: newPost });
  } catch (error) {
    next(error)
  }
};

const editPostController = async (req, res, next) => {
  try {
    const { postID, title, content } = req.body;
    if (!(postID && title && content)) {
      throw new CustomError("Please fill all the fields", 422);
    }
    const updatedPost = await editPost({postID, title, content, imageUrl });
    res.status(200).json({ message: "Post updated successfully", post: updatedPost });
  } catch (error) {
    next(error)
  }
};

const deletePostController = async (req, res, next) => {
  try {
    const { postID } = req.params;
    if (!postID) {
      throw new CustomError("Post ID is required", 422);
    }

    const isDeleted = await deletePost(postID);
    if (isDeleted) {
      res
        .status(200)
        .json({ status: true, message: "Post deleted successfully" });
    } else {
      throw new CustomError("Post not found");
    }
  } catch (error) {
    next(error);
  }
};


const getPostByIDController = async (req, res) => {
  try {
    const { postID } = req.params;
    const post = await getPostByID(postID);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    console.error('Error retrieving post:', error);
    res.status(500).send('Error retrieving post');
  }
};



const updateUserProfileController = async (req, res, next) => {
  try {
    const { userID, profileURL } = req.body;
    if (!userID) {
      throw new CustomError("User ID is required", 422);
    }

    const updatedUser = await updateUserProfile(userID, profileURL);
    res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (error) {
    next(error)
  }
};

export {
  getAllPostsController,
  createPostController,
  editPostController,
  deletePostController,
  getPostByIDController,
  updateUserProfileController
};
