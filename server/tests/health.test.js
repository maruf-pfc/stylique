const request = require("supertest");
const app = require("../app");

describe("Health check", () => {
  it("GET / should return 404 (or your home route if defined)", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(404); // or 200 if you define a route
  });
});
