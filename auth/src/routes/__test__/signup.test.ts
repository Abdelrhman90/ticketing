import request from "supertest";
import { app } from "../../app";

it("When signup send 201 response", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "abbady@mail.com",
      password: "password",
    })
    .expect(201);
});

it("return 400 with invalid inputs", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "abbadymail.com",
      password: "password",
    })
    .expect(400);

  return request(app)
    .post("/api/users/signup")
    .send({
      email: "abbady@mail.com",
      password: "p",
    })
    .expect(400);
});

it("disallows duplication", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "abbady@mail.com",
      password: "password",
    })
    .expect(201);

  return request(app)
    .post("/api/users/signup")
    .send({
      email: "abbady@mail.com",
      password: "password",
    })
    .expect(400);
});

it("sets a cookie to header response after signup", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email: "abbady@mail.com",
      password: "password",
    })
    .expect(201);

  expect(response.get("Set-Cookie")).toBeDefined();
});
