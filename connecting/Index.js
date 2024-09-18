import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config({
    path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development'
})
mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('Mongoose connect');
    }).catch((error) => {
        console.log(`Mongodb connection error -:${error}`);
    });