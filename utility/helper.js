// Importing necessary modules
import { v4 as uuidv4 } from 'uuid';
import * as dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';
import UserModel from '../Model/UserModel.js';
import CryptoJS from 'crypto-js';
dotenv.config({
    path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env.developments'
})
// Regular expression for validating UUIDs
const uuidRegex = /^[a-f\d]{8}(-[a-f\d]{4}){4}[a-f\d]{8}$/i;

// Mapping MIME types to file types
const supportedTypes = {
    'image/jpeg': 'images',
    'image/png': 'images',
    'application/pdf': 'pdf',
    'application/msword': 'docs',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docs',
    'audio/mpeg': 'audio',
    'video/mp4': 'video'
};
// Function to determine file type based on MIME type
const getFileType = (mimeType) => supportedTypes[mimeType] || null;
const failed = async (res, message = "") => {
    message =
        typeof message === "object"
            ? message.message
                ? message.message
                : ""
            : message;
    return res.status(400).json({
        success: false,
        code: 400,
        message: message,
        body: {},
    });
};
// Exporting an object containing uploadFile function
export default {
    // Function to handle file uploads
    uploadFile: async (req, res) => {
        try {
            // Extracting uploaded files from request object
            const files = Array.isArray(req?.files?.file)
                ? req?.files?.file
                : [req?.files?.file];

            // Iterating over each file
            const uploadResults = await Promise.all(files?.map(async (file) => {
                if (!file) {
                    return {
                        success: false,
                        message: 'No file uploaded'
                    };
                }

                // Determining file type based on MIME type
                const fileType = getFileType(file.mimetype);
                if (!fileType) {
                    return {
                        success: false,
                        message: 'Invalid file type'
                    };
                }

                // Creating upload directory if it doesn't exist
                const uploadDir = path.join(path.resolve(), '/public/uploads/', fileType);
                const isDirExist = fs.existsSync(uploadDir);
                if (!isDirExist) fs.mkdirSync(uploadDir);

                // Generating unique file name
                const fileNameUnic = `${uuidv4()}-${file.name}`;
                const fileBasePath = `uploads/${fileType}/${fileNameUnic}`;

                // Constructing file path
                const filePath = path.join(uploadDir, fileNameUnic);

                // Moving the file to the specified path
                await file.mv(filePath);

                return {
                    success: true,
                    fileUrl: `${process?.env?.REACT_APP_PUBLIC_URL}/${fileBasePath}`
                };

            }));

            // Filtering successfully uploaded files and failed uploads
            const successUploads = uploadResults.filter(result => result.success);
            const failedUploads = uploadResults.filter(result => !result.success);

            // Responding with appropriate status and messages
            if (failedUploads.length > 0) {
                return res.status(400).send({
                    message: 'Some files failed to upload',
                    success: false,
                    failedUploads: failedUploads.map(upload => upload.message)
                });
            }

            return res.status(200).send({
                message: 'All files uploaded successfully',
                success: true,
                uploadedFiles: successUploads.map(upload => upload.fileUrl)
            });

        } catch (error) {
            console.log(error);
            return failed(res, "Internal server error", error)
        }
    },

    catchServerError: async (err, req, res, next) => {
        try {
            if (err) {
                if (err.statusCode) {
                    return res.status(err.statusCode).send(err);
                } else throw err;
            }
        } catch (err) {
            console.log("err : -", err);
            return res.status(501).send({
                statusCode: 501,
                message: "Internal server error",
                body: {
                    apiVersion,
                    apiType,
                    apiDoc,
                    info: `We are unable for handdle this request at this time`,
                },
            });
        }
    },

    TryCatchHanddler: (fun) => {
        return async (req, res, next) => {
            try {
                await fun(req, res, next);
            } catch (err) {
                console.error(err);
                const errorResponse = {
                    message: err.message || "Internal server error",
                    statusCode: err.statusCode || 500,
                    body: {}
                };
                return res.status(errorResponse.statusCode).send(errorResponse);
            }
        };
    },

    dataValidator: (validationSchema, data) => {
        try {
            const validation = validationSchema.validate(data);
            if (validation.error) {
                let message = validation.error.details[0].message;
                message = message.split(" ");
                message[0] = message[0].split('"')[1];
                let erroeMessage = "";
                message.map((w) => (erroeMessage += ` ${w}`));
                throw { message: erroeMessage.trim(), statusCode: 400 };
            }
            return true;
        } catch (err) {
            console.log(err);
            throw err
        }
    },

    reactDataValidator: (validationSchema, data) => {
        const validation = validationSchema.validate(data, { abortEarly: false });
        if (validation.error) {
            const newErrors = {};
            error.details?.forEach((detail) => {
                newErrors[detail.path[0]] = detail.message;
            });
            setErrors(newErrors);
            return false;
        }
        return true;
    },

    success: async (res, message = "", body = {}) => {
        return res.status(200).json({
            success: true,
            code: 200,
            message: message,
            body: body,
        })
    },

    failed: failed,

    AsyncHanddle: (fn) => {
        return async (req, res, next) => {
            try {
                await fn(req, res, next);
            } catch (err) {
                console.log("error: -", err);
                let errorMEssage = "";
                if (typeof err === 'string') errorMEssage = err;
                if (typeof err === 'object') errorMEssage = err?.message;
                return failed(res, errorMEssage)
            }
        };
    },

    asyncMiddleware: async (req, res, next) => {
        try {
            const SECRET_KEY = req.headers['secret_key'];
            const PUBLISH_KEY = req.headers['publish_key'];
            if (process.env.SECRET_KEY == SECRET_KEY &&
                process.env.PUBLISH_KEY == PUBLISH_KEY) {
                next()
            } else {
                return res.status(404).send({
                    message: "key is not macth"
                })
            }

        } catch (error) {
            console.log(error);
        }
    },

    authenticateToken: async (req, res, next) => {
        try {
            const authHeader = req.headers["authorization"];
            const token = authHeader.split(' ')[1];
            if (!token) {
                return failed(res, "Unauthorized");
            }
            const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
            const isValidUser = await UserModel.findOne({ id: decodedToken._id });
            if (!isValidUser) {
                return failed(res, "Invalid token");
            }
            req.user = isValidUser;
            next();
        } catch (error) {
            console.log(error);
            return failed(res, "Invalid token");
        }
    },

    encryptData: (data) => {
        return CryptoJS.AES.encrypt(data, secretKey).toString();
    },

    decryptData: (encryptedData) => {
        const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
        return bytes.toString(CryptoJS.enc.Utf8);
    }

};