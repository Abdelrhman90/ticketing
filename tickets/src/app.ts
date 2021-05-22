import express from "express";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import "express-async-errors";
import { createTicketRouter } from "./routes/new";
import { updateTicketRouter } from "./routes/update";
import { showTicketRouter } from "./routes/show";
import { showTicketsRouter } from "./routes/index";
import {
  errorHandler,
  NotFoundError,
  currentUser,
} from "@abbadytickets/common";
const app = express();
app.set("trust proxy", true);
app.use(json());

app.use(
  cookieSession({
    secure: process.env.NODE_ENV !== "test",
    signed: false,
  })
);

app.use(currentUser);

app.use(showTicketsRouter);
app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(updateTicketRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
