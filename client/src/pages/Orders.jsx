import React, { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import { notOrder, orderHis } from "../assets/gifs/gifs";

const Orders = () => {
  const { backendUrl, token, rupee, fetchCart, navigate } =
    useContext(ShopContext);

  const [order, setOrder] = useState([]);

  const orderHistory = async () => {
    try {
      if (!token) {
        return null;
      }
      const { data } = await axios.post(
        `${backendUrl}/order/userorder`,
        {},
        {
          headers: { token },
        }
      );
      if (data.success == true) {
        setOrder(data.orders);
        console.log(data);
      } else {
        console.log(data.msg);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    orderHistory();
  }, [token]);

  if (!token) {
    return (
      <div className="flex flex-col items-center justify-center mt-6">
        <img src={notOrder} alt="Not Login" className="w-96 mb-3" />
        <p className="text-gray-500 text-center">
          Missing out on your order history?
        </p>
        <p className="text-gray-500 text-center">
          Login in now to track your past and upcoming orders effortlessly!
        </p>
        <Link to={"/login"}>
          <button className="px-4 py-1 text-white bg-black mt-2">Login</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={"my"} text2={"orders"} />
      </div>
      {order.length > 0 ? (
        order
          ?.slice()
          .reverse()
          .map((order) => (
            <div
              key={order._id}
              className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-6"
            >
              <div className="flex flex-col items-start gap-6 text-sm">
                {order.products.map((item, index) => (
                  <div className="flex items-start gap-6  pb-4" key={index}>
                    <img
                      className="w-16 sm:w-20"
                      src={item.productId.image}
                      alt={item.productId.name}
                    />
                    <div>
                      <p className="sm:text-base font-medium">
                        {item.productId.name}
                      </p>
                      <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                        <p className="text-lg">
                          {rupee}
                          {item.productId.price}
                        </p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Size: {item.size}</p>
                      </div>
                      <p className="mt-2">
                        Date:{" "}
                        <span className="text-gray-400">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                      </p>
                      <p className="mt-2">
                        Payment:{" "}
                        <span className="text-gray-400">
                          {order.paymentMethod}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <p>Amount: {rupee}{order.amount}</p>
              <div className="md:w-1/2 flex justify-between">
              
                <div className="flex items-center gap-2">
                  <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                  <p className="text-sm md:text-base">{order.status}</p>
                </div>
                <button
                  onClick={() => orderHistory()}
                  className="border px-4 py-2 text-sm font-medium rounded-sm"
                >
                  Track Order
                </button>
                {order.paymentMethod === "Razorpay" && (
                  <button
                    className="border px-4 py-2 text-sm font-medium rounded-sm bg-blue-500 text-white"
                    onClick={() =>
                      navigate("/invoice", { state: { orderId: order._id } })
                    }
                  >
                    Invoice
                  </button>
                )}
              </div>
            </div>
          ))
      ) : (
        <div className="flex flex-col items-center justify-center">
          <img src={orderHis} alt="" className="w-96 " />
          <p className="text-gray-500 text-center mt-2">No orders found!</p>
          <p className="text-gray-500 text-center">
            Please place an order to see it listed here.
          </p>
          <Link to={"/cart"}>
            <button className="px-4 py-2 bg-black text-white mt-3">Cart</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Orders;
