import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";
import { natsWrapper } from "../../nats-wrapper";

it("has a route handler for /api/tickets for post request", async () => {
  const response = await request(app).post("/api/tickets").send({});

  expect(response.status).not.toEqual(404);
});
it(" return 401 if user is not logged in", async () => {
  await request(app).post("/api/tickets").send({}).expect(401);
});
it("didn't return 401 if user is logged in", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({});

  expect(response.status).not.toEqual(401);
});

it("returns error for invalid title inputs", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "",
      price: 10,
    })
    .expect(400);
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      price: 10,
    })
    .expect(400);
});
it("returns error for invalid price inputs", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "asdkjalsdkj",
      price: -10,
    })
    .expect(400);
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "asdlkjasdlkj",
    })
    .expect(400);
});
it("creates the ticket successfully", async () => {
  let tickets = await Ticket.find({});

  expect(tickets.length).toEqual(0);

  await request(app).post("/api/tickets").set("Cookie", global.signin()).send({
    title: "new ticket",
    price: 20,
  });

  tickets = await Ticket.find({});
  expect(tickets.length).toEqual(1);
  expect(tickets[0].price).toEqual(20);
});

it("publish an event", async () => {
  await request(app).post("/api/tickets").set("Cookie", global.signin()).send({
    title: "new ticket",
    price: 20,
  });

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
