import { Subjects, Publisher, OrderCreatedEvent } from "@abbadytickets/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
