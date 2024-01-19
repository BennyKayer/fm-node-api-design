import config from "./config";
import app from "./server";
import * as dotenv from "dotenv";

dotenv.config();

process.on("uncaughtException", (err) => {
    console.log("Unhandled sync exception");
    console.error(err);
});

process.on("unhandledRejection", (err) => {
    console.log("Unhandled async exception");
    console.error(err);
});

app.listen(config.port, () => {
    console.log(`Listening on port: ${config.port}`);
});
