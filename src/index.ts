import app from "./server";

const API_PORT = 8012;

app.listen(API_PORT, () => {
    console.log(`Listening on port: ${API_PORT}`);
});
