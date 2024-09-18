import express from "express";

const router = express.Router();

router.get("/gfhfghf", function(req, res) {
    console.log("connect");
    res.send("Connected!");
});

export default router;
