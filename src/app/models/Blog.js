import mongoose from "mongoose";
const BlogSchema = new mongoose.schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      min: 4,
    },
    desc: {
      type: String,
      required: true,
      unique: true,
      min: 6,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Nature", "Mountain", "Ocean", "Wildlife", "Forest"],
    },
  },
  {
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    likes: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  }
);
export default mongoose?.model?.Blog || monsooge.model("Blog", BlogSchema);
