import React, { useContext, useEffect } from "react";
import "./fooditem.css";
import { assets } from "../../assets/assets";
import { Storecontext } from "../../context/Storecontext";

const FoodItem = ({ id, name, price, des, img, restroId }) => {
  // const [itemCount, setItemCount] = useState(0);

  const { cartItems, addToCart, removeFromCart, cartItem } = useContext(Storecontext);
  // console.log(itemCount);

  return (
    <>
      <div className="food-item" data-aos="fade-in">
        <div className="food-item-container">
          <img className="food-item-image" src={img} />
          {!cartItems[id] || !cartItems[id][restroId] ? (
            <img
              className="add"
              onClick={() => { addToCart(id, restroId) }}
              src={assets.add_icon_white}
            />
          ) : (
            <div className="food-item-counter">
              <img
                onClick={() => removeFromCart(id, restroId)}
                src={assets.remove_icon_red}
              />
              <p> {cartItems[id]?.[restroId]?.quantity ?? 0} </p>
              <img
                onClick={() => addToCart(id, restroId)}
                src={assets.add_icon_green}
              />
            </div>
          )}
        </div>
        <div className="food-item-info">
          <div className="food-item-name-rating">
            <p>{name}</p>
            <img src={assets.rating_starts} />
          </div>
          <p className="food-item-des">{des}</p>
          <p className="food-item-price">&#x20B9; {price}</p>
        </div>
      </div>
    </>
  );
};

export default FoodItem;
