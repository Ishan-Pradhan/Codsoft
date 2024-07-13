import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { postBlog } from "../controllers/blog.controller.js";

const router = Router();

router.route("/postBlog").post(upload.single("blogImage"), postBlog);

export default router;
