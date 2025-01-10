import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl, rupee } from "../App";
import { toast } from "react-toastify";
import { item } from "../assets/assets";

const ProductOrders = ({ token }) => {
  const [orders, setOrders] = useState([]);


  const fetchOrders = async () => {
    if (!token) {
      return null;
    }
    try {
      const { data } = await axios.get(`${backendUrl}/order/list`, {
        headers: { token },
      });
      if (data.success == true) {
        setOrders(data.orders)
        console.log(data.orders);
      } else {
        toast.error(data.msg);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const updateStatus = async(orderId,status)=>{
    if(!token){
      return null
    }
    try{
      const {data} = await axios.post(`${backendUrl}/order/status`,{orderId,status},{headers:{token}})
      console.log(data)
      if(data.success == true){
        toast.success(data.msg)
        await fetchOrders()
      }
      else{
        toast.error(data.msg)
      }
    }
    catch(err){
      console.log(err.message)
    }
  }


  useEffect(() => {
    fetchOrders();
  }, [token,orders]);

  return (
  <div className="">
    <h3>Order Page</h3>
    <div>
      {
        orders.slice().reverse().map((list,index)=>(
          <div key={index} className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700">
            <img className="w-12" src={item} alt="" />
                <div>
                <div>{
                  list.products.map((item,index)=>(
                    <p className="py-0.5 flex gap-8" key={index}><span>{item.productId.name}</span> <span>{item.quantity}</span> <span className="font-semibold border px-2 py-[0.8] bg-slate-100">{item.size}</span></p>
                  ))
                  }
                </div>
                <p className="mt-3 mb-2 font-medium">{`${list.address.firstname} ${list.address.lastname}`}</p>
                <div>
                  {/* <p className="font-semibold">Address:</p> */}
                  <p>{list.address.street}</p>
                  <p>{`${list.address.city}, ${list.address.state}, ${list.address.country}, ${list.address.zipcode}`}</p>
                </div>
                <p>{`${list.address.phone}`}</p>
              </div>

              <div>
                <p className="text-sm sm:text-[15px]">Items: {list.products.length}</p>
                <p className="mt-3">Method: {list.paymentMethod}</p>
                <p>Payment: {list.payment ? 'Done' : "Pending"}</p>
                <p>Date: {new Date(list.createdAt).toLocaleDateString()}</p>
              </div>

                <p className="text-sm sm:text-[15px]">{rupee}{list.amount}</p>

                <select onChange={(event)=>updateStatus(list._id,event.target.value)} value={list.status} className="p-2 font-semibold">
                  <option value="">Update Status</option>
                  <option value="Order Placed">Order Placed</option>
                  <option value="Pending">Pending</option>
                  <option value="Packing">Packing</option>
                  <option value="Ready to ship">Ready to Ship</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>

            </div>       
             ))
      }
    </div>
  </div>
  )
};

export default ProductOrders;
