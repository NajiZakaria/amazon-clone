import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "../axios";
import {db} from "../firebase";
import React, { useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";
import { Link, useHistory } from "react-router-dom";
import CheckoutProduct from "../Checkout/CheckoutProduct/CheckoutProduct";
import { getBasketTotal } from "../ReactContextApi/reducer";
import { useStateValue } from "../ReactContextApi/StateProvider";
import "./Payment.css";
function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const history = useHistory();
  const elements = useElements();
  const stripe = useStripe();
  const [succeeded, setSucceded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);

  useEffect(() => {
    //generate the special stripe secret
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        //stripe expect total in currencies submit
        url: "payments/create?total=" + getBasketTotal(basket) * 100,
      });
      setClientSecret(response.data.clientSecret);
    };
    getClientSecret();

  }, [basket]);

  console.log('the secret is'+clientSecret)



  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    }).then(({paymentIntent})=>{
        //paymentIntent - payment confirmation
        db.collection('users')
        .doc(user?.uid)
        .collection('orders')
        .doc(paymentIntent.id)
        .set({
          basket:basket,
          amount:paymentIntent.amount,
          created:paymentIntent.created
        })

        setSucceded(true)
        setError(null)
        setProcessing(false)

        dispatch({
            type:"EMPTY_BASKET", 
        })

        history.replace('/orders');
    });
  };

  const handleChange = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout" />
          {basket?.length} items)
        </h1>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>LOTIS EL KHAMISSIYA N 44</p>
            <p>ZEMAMRA ,CS</p>
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment__priceContainer">
                <CurrencyFormat
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                  renderText={(value) => (
                    <>
                      <h3>Order Total : {value}</h3>
                    </>
                  )}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
