import React from "react";
import { useStateValue } from "../../ReactContextApi/StateProvider";
import "./CheckoutProduct.css";
function CheckoutProduct({ id, title, image, price, rating,hideRemoveButton }) {
  const [{basket},dispatch] =useStateValue();

  const removeFromBasket = () => {
        dispatch({
            type:"REMOVE_FROM_BASKET",
            id:id,
        })
  };
  
  return (
    <div className="checkoutProduct">
      <img className="checkoutProduct__img" src={image} alt="" />
      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{title}</p>
        <p className="checkoutProduct__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="checkoutProduct__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>⭐</p>
            ))}
        </div>
        {!hideRemoveButton && (<button onClick={removeFromBasket}>Remove from Basket</button>)}
      </div>
    </div>
  );
}

export default CheckoutProduct;
