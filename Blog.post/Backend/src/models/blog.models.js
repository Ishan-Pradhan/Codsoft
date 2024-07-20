import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    blogImage: { type: String, required: true },
    author: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Blogs = mongoose.model("Blogs", blogSchema);
