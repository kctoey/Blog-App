import db from "@/app/lib/db";
import bcrypt from "bcrypt";
import Blog from "@/app/models/Blog";
import { verifyJwtToken } from "@/app/lib/jwt";
export async function GET(req) {
  await db.connect();
  try {
    const blogs = await Blog.find({}).limit(16).populate("authorId");
    return res.status(200).json(blogs);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
export async function POST(req) {
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
    const body = await req.json();
    const newBlog = await Blog.create(body);
    return res.status(201).json(newBlog);
  } catch (error) {
    return {
      status: 500,
      message: "Internal Server Error",
    };
  }
}
