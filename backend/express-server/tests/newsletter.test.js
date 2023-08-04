const request = require("supertest");
const app = require("../src/app");

test("Should signup email to newsletter", async () => {
  await request(app)
    .post("/newsletter/signup")
    .send({
      email: "email@example.com",
    })
    .expect(201);
});
