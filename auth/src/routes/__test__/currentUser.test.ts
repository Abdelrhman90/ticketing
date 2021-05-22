import request from "supertest";
import { app } from "../../app";

it("return current user after signin", async () => {
  const cookie = await global.signup();
  const response = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toEqual("abbady@mail.com");
});

it("return currentuser of null if user not authenticated", async () => {
  const response = await request(app)
    .get("/api/users/currentuser")
    .send()
    .expect(200);

  expect(response.body.currentUser).toEqual(null);
});
