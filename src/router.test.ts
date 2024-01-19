import app from "./server";
import request from "supertest";

describe("POST /product", function () {
    it("responds with json", async () => {
        const res = await request(app)
            .post("/api/product")
            .send({ name: "Test product" })
            .set("Accept", "application/json");

        expect(res.status).toEqual(401);
    });
});
