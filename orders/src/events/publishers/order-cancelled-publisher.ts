import {
  Subjects,
  Publisher,
  OrderCancelledEvent,
} from "@abbadytickets/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
