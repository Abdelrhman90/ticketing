import { useState, useEffect } from "react";
import StripeCheckout from "react-stripe-checkout";
import useRequest from "../../hooks/use-request";
const OrderShow = ({ order, currentUser }) => {
  const [timeLeft, setTimeLeft] = useState("");
  const { doRequest, errors } = useRequest({
    url: "/api/payments",
    method: "post",
    body: { orderId: order.id },
    onSuccess: (payment) => console.log(payment),
  });
  console.log(order);
  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };
    findTimeLeft();
    const timer = setInterval(findTimeLeft, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  if (timeLeft < 0) {
    return <div>Order has expired</div>;
  }
  return (
    <div>
      <h1>{timeLeft} left for this order to expire</h1>
      <StripeCheckout
        token={(token) => doRequest(token.id)}
        amount={order.ticket.price * 100}
        email={currentUser.email}
        stripeKey="pk_test_51HJ0mqDAUx3o4e7ixVsvsGUcDi5UODgRSfcsD10OKAaMuKn7d8OSFxvFqwZdxLv7jdGeNqCHR5e2Nf8ptE2I8aRq00l32z2j34"
      />
    </div>
  );
};

OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);

  return { order: data };
};

export default OrderShow;
