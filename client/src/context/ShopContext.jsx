import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const rupee = "₹";
  const deliveryFee = 10;
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [userName,setUserName] = useState("")
  const [showSearch, setShowSearch] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [cartData, setCartData] = useState({});
  const [cartAmount,setCartAmount] = useState(0)
  const navigate = useNavigate()
  const [token,setToken] = useState("")
  
  const getProducts = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/product/view`);
      if (data.success == true) {
        setProducts(data.product);
      } else {
        toast.error(data.msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCart = async () => {
    if (!token) return;
    try {
      const { data } = await axios.get(`${backendUrl}/user/viewcart`,{
        headers:{
          token
        }
      });      
      if (data.success == true) {
        setCartData(data.cart);
        setUserName(data.cart.name);
        setCartCount(data.cart.cart.length);
        toast.success(data.msg);
      } else {
        toast.error(data.msg);
      }
    } catch (err) {
      console.log(err);
    }
  };
  


  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    if (token) {
      fetchCart(); 
    } else if (localStorage.getItem("token")) {
      const savedToken = localStorage.getItem("token");
      setToken(savedToken);
      fetchCart(); 
    }
  }, [token]);
    
  return (
    <ShopContext.Provider
      value={{
        products,
        rupee,
        deliveryFee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        backendUrl,
        cartCount,
        setCartCount,
        cartData,
        setCartData,
        fetchCart,
        navigate,
        token,
        setToken,
        cartAmount,
        setCartAmount,
        userName
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
