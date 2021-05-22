import { Publisher, Subjects, TicketUpdatedEvent } from "@abbadytickets/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
