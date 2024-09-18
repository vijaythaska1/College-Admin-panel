import mongoose from "mongoose";

const CmsSchema = new mongoose.Schema(
  {
    type: {
      type: Number,
      default: 0,
    }, // 0 Abouts, 1 privacy, 0 terms and conditions
    title: {
      type: String,
      default: "",
    },
    content: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Cms", CmsSchema);
