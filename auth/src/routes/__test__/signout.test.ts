import request from "supertest";
import { app } from "../../app";

it("clear cookie after user signout", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "abbady@mail.com",
      password: "password",
    })
    .expect(201);

  const response = await request(app)
    .post("/api/users/signout")
    .send({})
    .expect(200);

  expect(response.get("Set-Cookie")).toBeDefined();
});
