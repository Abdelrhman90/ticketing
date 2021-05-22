import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

it("returns 404 if the route was leading to not found ticket", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app).get(`/api/tickets/${id}`).expect(404);
});

it("returns the ticket if the ticket was found", async () => {
  const title = "Concert";
  const price = 20;

  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title, price })
    .expect(201);

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send()
    .expect(200);

  expect(ticketResponse.body.price).toEqual(price);
  expect(ticketResponse.body.title).toEqual(title);
});
