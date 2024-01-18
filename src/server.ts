import express from "express";
import router from "./router";
import morgan from "morgan";
import cors from "cors";

const app = express();

//
// const customLogger = (msg) => (req, res, next) => {
//     console.log(req);
//     console.log(res);
//     next();
// };
// app.use(customLogger('hi'));

app.use(cors({ origin: ["localhost:3000"] }));
app.use(morgan("dev"));
app.use(express.json());
// ?id=1,name=josh -> this middleware will put it into object
app.use(express.urlencoded({ extended: true }));

// app.use((req, res, next) => {
//     // ts makes problems but it actually works
//     (req as any).additionalData = "woohoho";
//     next();
// });
// seems like middlewares can be passed into gets directly
// app.get("/todo/:id", myMiddleware, my2ndMiddleware, handler);
// // or
// app.get("/todo/:id", [myMiddleware, my2ndMiddleware], handler);

app.use("/api", router);

app.get("/", (req, res) => {
    res.status(200).json({ message: "Working correctly" });
});

export default app;
