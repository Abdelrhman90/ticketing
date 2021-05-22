import request from "supertest";
import { app } from "../../app";

it("return 400 whn signin with invalid email", async () => {
  return request(app)
    .post("/api/users/signin")
    .send({
      email: "abbady@mail.com",
      password: "password",
    })
    .expect(400);
});

it("send cookie back to response header when successfuly signed in", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "abbady@mail.com",
      password: "password",
    })
    .expect(201);

  const response = await request(app)
    .post("/api/users/signin")
    .send({
      email: "abbady@mail.com",
      password: "password",
    })
    .expect(200);

  expect(response.get("Set-Cookie")).toBeDefined;
});
