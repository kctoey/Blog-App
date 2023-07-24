import db from "@/app/lib/db";
import Comment from "@/app/models/Comment";
import { verifyJwtToken } from "@/app/lib/jwt";

export async function GET(req, { params: id }) {
  await db.connect();

  try {
    const comments = await Comment.find({ blogId: id }).populate("authorId");
    return res.json(comments).status(200);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function DELETE(req) {
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
    const comment = await Comment.findById({ id }).populate("authorId");
    if (comment.authorId._id.toString() !== decodedToken._id.toString()) {
      return res.status(401).json({ msg: "Only author can delete his blog" });
    }
    await Comment.findByIdAndDelete(id);
    return res.status(200).json({ msg: "Successfullt deleted comment" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
