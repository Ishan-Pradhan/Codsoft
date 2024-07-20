import { Blogs } from "../models/blog.models.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const postBlog = async (req, res) => {
  const { title, content, author_id, _id } = req.body;

  const imageBlogPath = req.file?.path;
  if (!imageBlogPath) {
    throw new ApiError(400, "Blog image is required");
  }

  const imageBlog = await uploadOnCloudinary(imageBlogPath);

  if (!imageBlog) throw new ApiError(400, "blog image file is required");

  const authorName = await User.findById(author_id);

  const blog = await Blogs.create({
    title,
    content,
    blogImage: imageBlog.url,
    author: authorName.username,
  });

  const createdBlog = await Blogs.findById(blog._id).select();

  if (!createdBlog) {
    throw new ApiError(500, "Something went wrong while creating the blog");
  }

  return res
    .status(201)
    .json(new ApiResponse(200), createdBlog, "Blog created successfully");
};

export { postBlog };
