import { Blogs } from "../models/blog.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const postBlog = async (req, res) => {
  const { title, user_id, content, author, blogImage, _id } = req.body;

  const imageBlogPath = req.file?.path;
  if (!imageBlogPath) {
    throw new ApiError(400, "Blog image is required");
  }

  const imageBlog = await uploadOnCloudinary(imageBlogPath);

  if (!imageBlog) throw new ApiError(400, "blog image file is required");

  const blog = await Blogs.create({
    title,
    content,
    blogImage: imageBlog.url,
    author: user_id,
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
