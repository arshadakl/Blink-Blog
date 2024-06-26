import {
  getAllPosts,
  createPost,
  editPost,
  getPostByID,
} from "../models/blogModel.js";
import { findUserByID, updateUserProfile } from "../models/userModel.js";
import { uploadToCloudinary } from "../utils/Cloudinary.js";
import CustomError from "../utils/CustomError.js";
import fs from "fs";
const getAllPostsController = async (req, res, next) => {
  try {
    const posts = await getAllPosts();
    res.status(200).json({ status: true, posts });
  } catch (error) {
    next(error);
  }
};

const createPostController = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const userID = req.user.userID
    if (!(title && content)) {
      throw new CustomError("Please fill all the fields", 422);
    }
    const PostData = {
      title,
      content,
      authorID: userID,
    };
    if (req.file) {
      const imageUrl = req.file.path;
      const CloudImgResponse = await uploadToCloudinary(imageUrl, "Blink");
      console.log(CloudImgResponse);
      PostData.imageUrl = CloudImgResponse.secure_url;
      fs.unlinkSync(imageUrl);
    }
    const newPost = await createPost(PostData);
    console.log(newPost);
    res
      .status(201)
      .json({
        status: true,
        message: "new Post created successfully",
        post: newPost,
      });
  } catch (error) {
    next(error);
  }
};

// const editPostController = async (req, res, next) => {
//   try {
//     const { title, content } = req.body;
//     const { postId } = req.params; // Assuming the postId is passed as a route parameter
//     const userID = req.user.userID;

//     if (!(title && content)) {
//       throw new CustomError("Please fill all the fields", 422);
//     }

//     // First, check if the post exists and belongs to the user
//     const existingPost = await getPostByID(postId);
//     if (!existingPost) {
//       throw new CustomError("Post not found", 404);
//     }
//     if (existingPost.authorID !== userID) {
//       throw new CustomError("You are not authorized to edit this post", 403);
//     }

//     let imageUrl = existingPost.imageUrl; // Keep the existing image URL by default

//     // Handle image upload if a new image is provided
//     if (req.file) {
//       const newImageUrl = req.file.path;
//       const CloudImgResponse = await uploadToCloudinary(newImageUrl, "Blink");
//       imageUrl = CloudImgResponse.secure_url;
//       fs.unlinkSync(newImageUrl);

//       // Delete the old image from Cloudinary if it exists
//       if (existingPost.imageUrl) {
//         await deleteFromCloudinary(existingPost.imageUrl);
//       }
//     }

//     const updatedPost = await editPost({ postID: postId, title, content, imageUrl });
//     console.log(updatedPost);
//     res.status(200).json({
//       status: true,
//       message: "Post updated successfully",
//       post: updatedPost,
//     });
//   } catch (error) {
//     next(error);
//   }
// };


const editPostController = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const { postId } = req.params;
    const userID = req.user.userID;

    console.log('Received data:', { postId, title, content, userID });

    if (!(title && content)) {
      throw new CustomError("Please fill all the fields", 422);
    }

    // Fetch the existing post
    const existingPost = await getPostByID(postId);
    console.log('Existing post:', existingPost);

    if (!existingPost) {
      throw new CustomError("Post not found", 404);
    }
    if (existingPost.authorID !== userID) {
      throw new CustomError("You are not authorized to edit this post", 403);
    }

    let imageUrl = existingPost.imageUrl;

    if (req.file) {
      const newImageUrl = req.file.path;
      const CloudImgResponse = await uploadToCloudinary(newImageUrl, "Blink");
      imageUrl = CloudImgResponse.secure_url;
      fs.unlinkSync(newImageUrl);

    }

    console.log('Updating post with:', { postID: postId, title, content, imageUrl });

    const updatedPost = await editPost({ postID: postId, title, content, imageUrl });

    console.log('Updated post:', updatedPost);

    res.status(200).json({
      status: true,
      message: "Post updated successfully",
      post: updatedPost,
    });
  } catch (error) {
    console.error('Error in editPostController:', error);
    next(error);
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
      throw new CustomError("Post not found", 404);
    }
  } catch (error) {
    next(error);
  }
};

const getPostByIDController = async (req, res, next) => {
  try {
    const { postID } = req.params;
    const post = await getPostByID(postID);
    if (!post) {
      throw new CustomError("Post not found", 404);
    }
    const user = await findUserByID(post.authorID);
    user.password = undefined
    res.status(200).json({status:true, post,user});
  } catch (error) {
    next(error);
  }
};

const getUserByIDController = async (req, res, next) => {
  try {
    const { userID } = req.params;
    const user = await findUserByID(userID);
    if (!user) {
      throw new CustomError("User not found", 404);
    }
    res.status(200).json({status:true, user});
  } catch (error) {
    next(error);
  }
};

const updateUserProfileController = async (req, res, next) => {
  try {
    const { userID, profileURL } = req.body;
    if (!userID) {
      throw new CustomError("User ID is required", 422);
    }
    const updatedUser = await updateUserProfile(userID, profileURL);
    res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    next(error);
  }
};

export {
  getAllPostsController,
  createPostController,
  editPostController,
  deletePostController,
  getPostByIDController,
  updateUserProfileController,
  getUserByIDController
};
