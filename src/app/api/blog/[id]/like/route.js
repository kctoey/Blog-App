import db from "@/app/lib/db";
import Blog from "@/app/models/Blog";
import { verifyJwtToken } from "@/app/lib/jwt";

export async function PUT(req, { params: id }) {
  await db.connect();
  const accessToken = req.header.get("autherization");
  const token = accessToken.split("")[1];
  const decodedToken = verifyJwtToken(token);
  if (!accessToken || decodedToken) {
    return res
      .status(403)
      .json({ error: "Unauthorized (wrong or expired token)" });
  }
  try {
    const blog = await Blog.findById({ id });

    if (blog.likes.include(decodedToken._id)) {
      blog.likes = blog.likes.filter(
        (id) => id.toString !== decodedToken._id.toString()
      );
    } else {
      blog.likes.push(decodedToken._id);
    }
    await blog.save();
    return res
      .status(200)
      .json({ msg: "Successfully interacted with the blog" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
