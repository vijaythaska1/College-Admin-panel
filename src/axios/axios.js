import axios from 'axios'
const token = JSON.parse(localStorage.getItem("userProfile"))?.authToken;


export const http = axios.create({
    baseURL: process.env.REACT_APP_PUBLIC_URL,
    headers: {
        SECRET_KEY: process.env.REACT_APP_SECRET_KEY,
        PUBLISH_KEY: process.env.REACT_APP_PUBLISH_KEY,
        Authorization: 'Bearer ' + token
    }
});



