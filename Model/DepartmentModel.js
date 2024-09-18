import mongoose from "mongoose";

const CmsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: 0,
    },
    status: {
      type: Number,
      enum: [0, 1],
      default: 0, // 0 Active 1 IN-Active
    },
    content: {
      type: String,
      default: "",
    },
    isDeleted: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("department", CmsSchema);
