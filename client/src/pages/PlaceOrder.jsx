import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { ShopContext } from "../context/ShopContext";
import { razorpay } from "../assets/icons/icons";
import axios from "axios";
import { toast } from "react-toastify";
import confetti from 'canvas-confetti';

const PlaceOrder = () => {
  const {
    cartData,
    backendUrl,
    cartAmount,
    token,
    setCartData,
    navigate,
    fetchCart,
  } = useContext(ShopContext);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [address, setAddress] = useState({
    firstname: "",
    lastname: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const formFun = (event) => {
    setAddress({ ...address, [event.target.name]: event.target.value });
  };

  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Order Pyment",
      description: "Order Pyment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response);
        if (!token) {
          return null;
        }
        try {
          const { data } = await axios.post(
            `${backendUrl}/order/verify`,
            response,
            { headers: { token } }
          );
          if (data.success == true) {
            setCartData({ cart: [] });
            await fetchCart()
            navigate("/orders",{ replace: true });
            confetti({
              particleCount: 100,
              spread: 70,
              origin: {
                y: 0.6,
              },
            });
            toast.success(data.msg);
          }
        } catch (err) {
          console.log(err.msg);
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", (response) => {
      toast.error("Payment failed. Please try again.");
    });
    rzp.open();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const productId = cartData.cart;
      const payload = { address, productId, cartAmount, paymentMethod };
      let response;

      switch (paymentMethod) {
        case "Cash on Delivery":
          response = await axios.post(`${backendUrl}/order/cod`, payload, {
            headers: { token },
          });
          break;

        case "Razorpay":
          response = await axios.post(`${backendUrl}/order/razorpay`, payload, {
            headers: { token },
          });
          break;

        default:
          toast.error("Invalid payment method selected.");
          return;
      }

      const { success, msg } = response.data;
      if (success) {
        if (paymentMethod === "Cash on Delivery") {
          setCartData({ cart: [] });
          navigate("/orders",{ replace: true });
          confetti({
            particleCount: 100,
            spread: 70,
            origin: {
              y: 0.6,
            },
          });
        } else {
          console.log(response.data.order);

          initPay(response.data.order);
        }
        toast.success(msg);
      } else {
        toast.error(msg);
      }
    } catch (err) {
      console.error(err.message);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/* left side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"delivery"} text2={"information"} />
        </div>

        <div className="flex gap-3 dark:text-black">
          <input
            className="border border-gray-300 rounded dark:bg-slate-300  py-1.5 w-full"
            type="text"
            placeholder="First name"
            name="firstname"
            value={address.firstname}
            onChange={formFun}
            required
          />
          <input
            className="border border-gray-300 dark:bg-slate-300 rounded py-1.5 w-full"
            type="text"
            placeholder="Last name"
            name="lastname"
            value={address.lastname}
            onChange={formFun}
            required
          />
        </div>
        <input
          className="border border-gray-300 dark:bg-slate-300 rounded py-1.5 w-full dark:text-black"
          type="email"
          placeholder="Email Address"
          name="email"
          value={address.email}
          onChange={formFun}
          required
        />
        <input
          className="border border-gray-300 dark:text-black dark:bg-slate-300 rounded py-1.5 w-full"
          type="text"
          placeholder="Street"
          name="street"
          value={address.street}
          onChange={formFun}
          required
        />
        <div className="flex gap-3">
          <input
            className="border border-gray-300 dark:text-black dark:bg-slate-300 rounded py-1.5 w-full"
            type="text"
            placeholder="City"
            name="city"
            value={address.city}
            onChange={formFun}
            required
          />
          <input
            className="border border-gray-300 dark:text-black dark:bg-slate-300 rounded py-1.5 w-full"
            type="text"
            placeholder="State"
            name="state"
            value={address.state}
            onChange={formFun}
            required
          />
        </div>
        <div className="flex gap-3">
          <input
            className="border border-gray-300 dark:text-black dark:bg-slate-300 rounded py-1.5 w-full"
            type="number"
            placeholder="Zipcode"
            name="zipcode"
            value={address.zipcode}
            onChange={formFun}
            required
          />
          <input
            className="border border-gray-300 dark:text-black dark:bg-slate-300 rounded py-1.5 w-full"
            type="text"
            placeholder="Country"
            name="country"
            value={address.country}
            onChange={formFun}
            required
          />
        </div>
        <input
          className="border border-gray-300 dark:text-black dark:bg-slate-300 rounded py-1.5 w-full"
          type="number"
          placeholder="Phone"
          name="phone"
          value={address.phone}
          onChange={formFun}
          required
        />
      </div>

      {/* right side */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal cartData={cartData} />
        </div>
        <div className="mt-12">
          <Title text1={"payment"} text2={"method"} />
        </div>
        {/* payment method */}
        <div className="flex gap-3 flex-col lg:flex-row mt-4">
          <label className="flex items-center gap-3 p-2 px-3 border cursor-pointer">
            <input
              type="radio"
              name="payment"
              value="Razorpay"
              onChange={handlePaymentChange}
            />
            <img src={razorpay} alt="Razorpay" className="" />
          </label>
          <label className="flex items-center gap-3 p-2 px-3 border cursor-pointer">
            <input
              type="radio"
              name="payment"
              value="Cash on Delivery"
              onChange={handlePaymentChange}
            />
            <p className="text-gray-500 text-sm font-medium mx-4">
              Cash on Delivery
            </p>
          </label>
        </div>

        <div className="w-full text-end mt-8">
          <button
            type="submit"
            className="bg-black text-white px-16 py-3 text-sm"
          >
            Place Order
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
