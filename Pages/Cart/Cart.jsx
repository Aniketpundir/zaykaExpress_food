import React, { useContext, useEffect, useState } from "react";
import "./Cart.css";
// import { Storecontext } from "../../context/Storecontext";
import { Storecontext } from "../../src/context/Storecontext"
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItem, fetchCart, removeFromCart, amount } =
    useContext(Storecontext);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCart = async () => {
      await fetchCart();
      setLoading(false);
    };

    loadCart();
  }, []);

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading Cart...</h2>;
  }

  return (
    <div className="cart">
      <div className="cart-items">

        {cartItem.length === 0 ? (
          <h2>Your cart is empty</h2>
        ) : (
          cartItem.map((item) => (
            <React.Fragment key={item._id}>
              <div className="cart-items-title cart-items-item">

                <img
                  src={item.image}
                  alt={item.name}
                  width="100"
                />

                <p>Title: {item.name}</p>

                <p>Price: ₹ {item.price}</p>

                <p>Quantity: {item.quantity}</p>

                <p>
                  Total: ₹ {item.price * item.quantity}
                </p>

                <p
                  className="cross"
                  onClick={() => {
                    removeFromCart(item._id, item.restroId),
                    fetchCart()
                  }
                  }
                  style={{
                    cursor: "pointer",
                    color: "red",
                    fontWeight: "bold",
                  }}
                >
                  X
                </p>

              </div>

              <hr />
            </React.Fragment>
          ))
        )}
      </div>

      {/* Cart Bottom */}
      <div className="cart-bottom">

        {/* Total */}
        <div className="cart-total">

          <h2>Cart Total</h2>

          <div>

            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹ {amount}</p>
            </div>

            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>Free</p>
            </div>

            <hr />

            <div className="cart-total-details">
              <b>Total</b>
              <b>₹ {amount}</b>
            </div>

          </div>

          <button
            onClick={() => navigate("/placeorder")}
          >
            PROCEED TO CHECKOUT
          </button>

        </div>

        {/* Promo */}
        <div className="cart-promocode">

          <p>If you have a promo code, Enter it here</p>

          <div className="cart-promocode-input">

            <input
              type="text"
              placeholder="Enter promocode"
            />

            <button>Submit</button>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Cart;
