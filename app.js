import express from "express";
import cors from "cors";
import path from 'path';
import fileUpload from "express-fileupload";
import bodyParser from 'body-parser';
import "./connecting/Index.js";
import dotenv from 'dotenv';
import router from "./router/index.js";
import users from "./router/APIs.js";
import helper from "./utility/helper.js";
import { Server } from "socket.io";
import { createServer } from 'node:http';
dotenv.config({
    path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development'
});

const PORT = process.env.PORTs
const catchServerErrors = helper.catchServerError;
const app = express();
const server = createServer(app);
const io = new Server(server);
app.set('views', path.join(path.resolve(), 'views'));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(path.resolve(), 'public')));
app.use(fileUpload());
// dotenv.config(ENVPATH);
// await server();
app.use('/', router);
app.use('/api', users);
app.use(catchServerErrors);
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});









