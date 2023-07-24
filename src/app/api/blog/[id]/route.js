import db from "@/app/lib/db";
import bcrypt from "bcrypt";
import Blog from "@/app/models/Blog";
import { verifyJwtToken } from "@/app/lib/jwt";
import User from "@/app/models/User";
export async function GET(req, { params: id }) {
  await db.connect();
  try {
    const blog = await Blog.findById({ id })
      .populate("authorId") //ส่งเฉพาะauthorIdคืน
      .select("-password"); //ไม่เอาพาสเวิด เพราะในauthorIdมีพาสเวิด
    return res.status(200).json(blog);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
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
    //เช็คtokenก่อนว่าเป็นคนเขียนจริงไหม
    const body = await req.json();
    const blog = await Blog.findById({ id }).populate("authorId");
    if (blog?.authorId?._id.toString() !== decodedToken._id.toString()) {
      return res.status(403).json({ error: "Only author can update his blog" });
    }
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { $set: { ...body } },
      { new: true }
    ); //อัปเดตค่าในฟิลจาก req ทั้งหมด
    return res.status(200).json(updatedBlog);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
export async function DELETE(req, { params: id }) {
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
    const blog = await Blog.findById({ id }).populate("authorId");
    if (blog?.authorId?._id.toString() !== decodedToken._id.toString()) {
      return res.status(403).json({ msg: "Only author can update his blog" });
    }
    await Blog.findByIdAndDelete({ id });
    return res.status(200).json({ msg: "Successfully deleted Blog" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
