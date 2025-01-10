import React, { useContext, useEffect } from "react";
import Title from "./Title";
import { ShopContext } from "../context/ShopContext";

const CartTotal = ({ cartData }) => {
  const {  cartAmount, setCartAmount, deliveryFee } = useContext(ShopContext);

  const cartItems = cartData?.cart || [];

  const subtotal = cartItems.reduce((total, item) => {
    return total + item.productId.price * item.quantity;
  }, 0);
  
  const shippingFee = 10;
  const totalAmount = subtotal + shippingFee;

  useEffect(() => {
    if (setCartAmount) {
      setCartAmount(totalAmount);
    }
  }, [subtotal, setCartAmount]);

  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1="cart" text2="total" />
      </div>

      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>{subtotal.toFixed(2)}</p>
        </div>

        <hr />

        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>{shippingFee.toFixed(2)}</p>
        </div>

        <hr />

        <div className="flex justify-between">
          <b>Total</b>
          <b>{totalAmount.toFixed(2)}</b>
        </div>
      </div>
    </div>
  );
};

// CartTotal.defaultProps = {
//   cartData: { cart: [] }, // Provide a default structure
// };

export default CartTotal;
