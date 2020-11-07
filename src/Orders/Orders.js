import moment from "moment";
import React, { useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";
import CheckoutProduct from "../Checkout/CheckoutProduct/CheckoutProduct";
import { db } from "../firebase";
import { useStateValue } from "../ReactContextApi/StateProvider";
import "./Orders.css";
function Orders() {
  const [orders, setOrders] = useState([]);
  const [{ basket, user }, dispatch] = useStateValue();

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user?.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((sn) => {
          setOrders(
            sn.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    } else {
      setOrders([]);
    }
  }, []);

  return (
    <div className="orders">
      <h1>Your Orders</h1>
      <div className="orders__order">
        {orders?.map((order) => (
          <div className="order">
            <h2>Order</h2>
            <p>
              {moment.unix(order.data.created).format("MMMM Do YYYY,h:mma")}
            </p>
            <p className="order__id">
              <small>{order.id}</small>
            </p>
            {order.data.basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
                hideRemoveButton
              />
        ))}
            <CurrencyFormat
              decimalScale={2}
              value={order.data.amount / 100}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
              renderText={(value) => (
                <h3 className="order__total">Order Total : {value}</h3>
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
