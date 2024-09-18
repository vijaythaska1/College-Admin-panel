import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    role: {
      type: Number,
      enum: [0, 1, 2],
      default: 1,
    }, // 0: Admin, 1: Teacher, 2: Student
    rollNo: {
      type: String,
      default: "",
    },
    firstName: {
      type: String,
      default: "",
    },
    lastName: {
      type: String,
      default: "",
    },
    department: {
      type: String,
      default: "",
    },
    gender: {
      type: Number,
      enum: [0, 1, 2],
      default: null,
    }, // 0: Male, 1: Female, 2: Other
    email: {
      type: String,
      unique: true,
      default: "",
    },
    countryCode: {
      type: String,
      default: "",
    },
    phoneNumber: {
      type: Number,
      unique: true,
      default: null,
    },
    registrationNo: {
      type: Number,
      default: "",
    },
    password: {
      type: String,
      default: "",
    },
    status: {
      type: Number,
      enum: [0, 1],
      default: 0,
    }, // 0: Active, 1: Inactive
    joiningDate: {
      type: Date,
      default: Date.now(),
    },
    image: { type: String, default: "" },
    documents: [
      {
        name: {
          type: String,
          default: "",
        },
        image: {
          type: String,
          default: "",
        },
      },
    ],
    isDeleted: {
      type: Boolean,
      default: false,
    },
    authToken: {
      type: String,
      default: "",
    },
    deviceToken: {
      type: String,
      default: "",
    },
    deviceType: {
      type: Number,
      enum: [0, 1, 2],
      default: 2,
    }, // 0: Android, 1: iOS, 2: Website
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
