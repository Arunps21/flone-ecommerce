import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import RelatedProducts from "../components/RelatedProducts";
import axios from "axios";
import { toast } from "react-toastify";
import Faq from "../components/Faq";
import OurPolicies from "../sections/OurPolicies";
import ReviewStars from "../components/ReviewStars";
import Review from "../components/Review";
import { dullstar, star } from "../assets/icons/icons";
// const userId = "6767e4bdbe1254f406913d3e";

const IndividualProduct = () => {
  const { rupee, backendUrl, fetchCart, setCartCount, token } =
    useContext(ShopContext);
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState("");

  const singleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/product/singleview/${id}`
      );
      if (data.success == true) {
        setProduct(data.product);
      } else {
        toast.error(data.msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addToCart = async (productId, size) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/user/addtocart`,
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
      console.log(data);

      if (data.success == true) {
        setCartCount((prevCount) => prevCount + 1);
        toast.success(data.msg);
      } else {
        toast.error(data.msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    singleProduct();
  }, [product]);

  useEffect(() => {
    fetchCart();
  }, []);
  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* product data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* product images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-[540px]" src={product.image} alt="image" />
          </div>
        </div>

        {/* product Information */}
        <div className="flex-1 ">
          <h1 className="font-medium text-2xl mt-2">{product.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={star} alt="rating" className="w-3"/>
            <img src={star} alt="rating" className="w-3"/>
            <img src={star} alt="rating" className="w-3"/>
            <img src={star} alt="rating" className="w-3"/>
            <img src={star} alt="rating" className="w-3"/>
            <img src={dullstar} alt="rating" className="w-3"/>
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {rupee}
            {product.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">{product.description}</p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {Array.isArray(product.sizes) &&
                product.sizes.length > 0 &&
                product.sizes.map((size, index) => (
                  <button
                    key={index}
                    className={`border py-2 px-4 ${
                      size === selectedSize ? "bg-sky-400 dark:bg-sky-700" : " bg-gray-100 dark:bg-gray-600 "
                    }`}
                    onClick={() => {
                      setSelectedSize(size);
                    }}
                  >
                    {size}
                  </button>
                ))}
            </div>
          </div>
          <button
            onClick={() => addToCart(id, selectedSize)}
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
          >
            Add to cart
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% original products</p>
            <p>Cash on Delivery avalable on this product</p>
            <p>Easy return and exchange policy within 7 days</p>
          </div>
        </div>
      </div>
      
      <OurPolicies />
      {/* realted products */}

      <RelatedProducts
        category={product.category}
        subCategory={product.subCategory}
      />

      {/* FAQ's */}
      <Faq />

      <ReviewStars />

      {/* description and review */}
      <Review />
    </div>
  );
};

export default IndividualProduct;
