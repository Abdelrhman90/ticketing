import { Publisher, Subjects, TicketCreatedEvent } from "@abbadytickets/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
