import {
  Publisher,
  ExpirationCompleteEvent,
  Subjects,
} from "@abbadytickets/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
