import app from "./server";
import * as dotenv from "dotenv";

dotenv.config();

const API_PORT = 8012;

app.listen(API_PORT, () => {
    console.log(`Listening on port: ${API_PORT}`);
});
