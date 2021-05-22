import { useState } from "react";
import Router from "next/router";
import useRequest from "../../hooks/use-request";
const createTicket = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const { doRequest, errors } = useRequest({
    url: "/api/tickets",
    method: "post",
    body: { title, price },
    onSuccess: () => Router.push("/"),
  });
  const onSubmit = (e) => {
    e.preventDefault();

    doRequest();
  };
  const onBlur = () => {
    const value = parseFloat(price);

    if (isNaN(value)) {
      return;
    }

    setPrice(value.toFixed(2));
  };
  return (
    <form onSubmit={onSubmit}>
      <h1>Create a Ticket</h1>
      <div className="form-group">
        <label>Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Price</label>
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          onBlur={onBlur}
          type="text"
          className="form-control"
        />
      </div>
      {errors}
      <button className="btn btn-primary">Create</button>
    </form>
  );
};

export default createTicket;
