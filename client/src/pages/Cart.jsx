import React, { useContext, useEffect } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { ShopContext } from "../context/ShopContext";
import { bin } from "../assets/icons/icons";
import axios from "axios";
import { toast } from "react-toastify";
import { addCart, missingCart } from "../assets/gifs/gifs";
import { Link } from "react-router-dom";

const Cart = () => {
  const {
    cartData,
    rupee,
    backendUrl,
    setCartData,
    setCartCount,
    fetchCart,
    cartCount,
    navigate,
    token,
  } = useContext(ShopContext);

  const cartItemRemove = async (productId, size) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/user/deletecartitems`,
        {
          productId,
          size,
        },
        {
          headers: {
            token,
          },
        }
      );

      if (data.success == true) {
        fetchCart();
        setCartData(data.cart);
        setCartCount((prevCount) => prevCount - 1);
        toast.success(data.msg);
      } else {
        toast.error(data.msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateQuantity = async (productId, size, quantity) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/user/updatecartquantity`,
        {
          productId,
          size,
          quantity,
        },
        {
          headers: {
            token,
          },
        }
      );
      if (data.success == true) {
        fetchCart();
        setCartData(data.cart);
      } else {
        toast.error(data.msg);
      }
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (token) {
      fetchCart();
    }
  }, [token]);

  if (!token) {
    return (
      <div className="flex flex-col items-center justify-center mt-6">
        <img src={missingCart} alt="Empty Cart" className="w-80 mb-3" />
        <p className="text-gray-500 text-center">Missing Cart items?</p>
        <p className="text-gray-500 text-center">
          Login to see the items you added previously
        </p>
        <Link to={"/login"}>
          <button className="px-4 py-1 text-white bg-black mt-2">Login</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1="your" text2="cart" />
      </div>

      <div>
        {cartData.cart && cartData.cart.length > 0 ? (
          cartData.cart.map((list, index) => (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 grid grid-cols[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-start gap-6">
                <img
                  className="w-16 sm:w-20"
                  src={list.productId.image}
                  alt=""
                />

                <div>
                  <p className="text-xs sm:text-lg font-medium">
                    {list.productId.name}
                  </p>
                  <div className="flex items-center gap-5 mt-2">
                    <p>
                      {rupee}
                      {list.productId.price}
                    </p>
                    <p className="px-2 sm:px-3 sm:py-1 border bg-slate-100">
                      {list.size}
                    </p>
                  </div>
                </div>
              </div>
              <input
                className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                type="number"
                min={1}
                defaultValue={list.quantity}
                onChange={(event) =>
                  updateQuantity(
                    list.productId._id,
                    list.size,
                    event.target.value
                  )
                }
              />
              <img
                className="w-4 mr-4 sm:w-5 cursor-pointer"
                src={bin}
                alt="delete icon"
                onClick={() => cartItemRemove(list.productId._id, list.size)}
              />
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center">
            <img src={addCart} alt="" className="w-96 " />
            <p className="text-gray-500 text-center mt-2">
              No items in the cart
            </p>
            <p className="text-gray-500 text-center">
              Save it for later or proceed to checkout!
            </p>
            <Link to={"/collection"}>
              <button className="px-4 py-2 bg-black text-white mt-3">
                Collections
              </button>
            </Link>
          </div>
        )}
      </div>

      {cartCount > 0 && (
        <div className="flex justify-end my-20">
          <div className="w-full sm:w-[450px]">
            <CartTotal cartData={cartData} />
            <div className="w-full text-end">
              <button
                className="bg-black text-white text-sm px-4 py-2 my-8"
                onClick={() => navigate("/placeorder")}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
