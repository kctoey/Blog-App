import db from "@/app/lib/db";
import Comment from "@/app/models/Comment";
import { verifyJwtToken } from "@/app/lib/jwt";

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
    const body = await res.json();
    let newComment = await Comment.create(body);
    newComment = await newComment.populate("authorId");
    return res.status(201).json(newComment);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
