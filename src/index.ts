import app from "./server";
import * as dotenv from "dotenv";

dotenv.config();

const API_PORT = 8012;

process.on("uncaughtException", (err) => {
    console.log("Unhandled sync exception");
    console.error(err);
});

process.on("unhandledRejection", (err) => {
    console.log("Unhandled async exception");
    console.error(err);
});

app.listen(API_PORT, () => {
    console.log(`Listening on port: ${API_PORT}`);
});
