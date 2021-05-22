import { Listener, Subjects, OrderCreatedEvent } from "@abbadytickets/common";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/order";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
  queueGroupName = "payments-service";

  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    const order = Order.build({
      status: data.status,
      id: data.id,
      price: data.ticket.price,
      version: data.version,
      userId: data.userId,
    });
    await order.save();

    msg.ack();
  }
}
