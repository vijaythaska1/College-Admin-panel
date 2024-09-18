import Model from "../Model/index.js";
import dotenv from "dotenv";
import helper from "../utility/helper.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Joi from "joi";

dotenv.config({
    path:
        process.env.NODE_ENV === "production"
            ? ".env.production"
            : ".env.development",
});
const SECRET_KEY = process.env.SECRET_KEY;
export default {
    ChangePassword: helper.TryCatchHanddler(async (req, res) => {
        const validationSchema = Joi.object({
            oldPassword: Joi.string().required(),
            newPassword: Joi.string().min(6).alphanum().required(),
            confirmPassword: Joi.string().valid(Joi.ref("newPassword")).required(),
        });
        helper.dataValidator(validationSchema, req?.body);
        const { oldPassword, newPassword } = req?.body;
        const { id } = req.user;
        const user = await Model.UserModel.findById(id);
        const match = await bcrypt.compare(oldPassword, user.password);
        if (!match) {
            return helper.failed(res, "Invalid current password");
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();
        helper.success(res, "Password Changed successfully");
    }),

    login: helper.TryCatchHanddler(async (req, res) => {
        const validationSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        });
        helper.dataValidator(validationSchema, req?.body);
        const { email, password } = req.body;
        const user = await Model.UserModel.findOne({ email });
        if (!user) {
            return helper.failed(res, "Invalid Email");
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return helper.failed(res, "Invalid Password");
        }
        const token = jwt.sign({ id: user._id }, SECRET_KEY);
        user.authToken = token;
        await user.save();
        helper.success(res, "Login Successful", { authToken: user.authToken });
    }),

    UserProfile: helper.TryCatchHanddler(async (req, res) => {
        const { id } = req.user;
        const user = await Model.UserModel.findById(id);
        helper.success(res, "Profile Retrieved Successfully", user);
    }),
    logout: helper.TryCatchHanddler(async (req, res) => {
        const { id } = req.user;
        const data = await Model.UserModel.findByIdAndUpdate(
            id,
            { authToken: "" },
            { new: true }
        );
        helper.success(res, "User Logout Successfully");
    }),
};
