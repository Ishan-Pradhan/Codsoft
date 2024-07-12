import { Blogs } from "../models/blog.models";
import { ApiError } from "../utils/ApiError";

const postBlog = async (req, res) => {
  const { title, user_id, content, blogImage, _id } = req.body;

  if ([user_id, title, content].some((field) => field.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const imageBlog = req.files?.blogImage?.[0]?.path;
};
