import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.status(200).json({ message: "Working correctly" });
});

export default app;
