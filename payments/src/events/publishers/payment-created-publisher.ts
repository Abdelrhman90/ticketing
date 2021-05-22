import {
  Publisher,
  PaymentCreatedEvent,
  Subjects,
} from "@abbadytickets/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
