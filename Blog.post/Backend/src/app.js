import express from "express";
const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

import userRouter from "./routes/user.routes.js";
import blogRouter from "./routes/blog.routes.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/blogs", blogRouter);
export default app;
