import express from "express";
import router from "./router";

const app = express();

app.use("/api", router);

app.get("/", (req, res) => {
    res.status(200).json({ message: "Working correctly" });
});

export default app;
