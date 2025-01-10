import React, { useState } from "react";
import { upload_area } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const AddProduct = ({ token }) => {
  const [product, setProduct] = useState({});
  const [size, setSize] = useState([]);
  const formData = new FormData();
  
  const addProduct = (event) => {
    setProduct({ ...product, [event.target.name]: event.target.value });
  };

  const handleFileUpload = (event) => {
    setProduct({ ...product, [event.target.name]: event.target.files[0] });
  };

  const handleCheckbox = (event) => {
    setProduct({ ...product, [event.target.name]: event.target.checked });
  };

  const toggleSize = (sizeValue) => {
    setSize((prev) =>
      prev.includes(sizeValue)
        ? prev.filter((size) => size !== sizeValue)
        : [...prev, sizeValue]
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      formData.append("name", product.name);
      formData.append("description", product.description);
      formData.append("price", product.price);
      formData.append("category", product.category);
      formData.append("subCategory", product.subCategory);
      formData.append("sizes", JSON.stringify(size));
      formData.append("bestSeller", product.bestSeller);
      formData.append("image", product.image);

      const { data } = await axios.post(`${backendUrl}/product/add`, formData, {
        headers: {
          token,
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.success == false) {
        toast.error(data.msg);
      } else {
        setProduct({})
        setSize([])
        toast.success(data.msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form
      className="flex flex-col w-full items-start gap-3"
      encType="multipart/form-data"
      onSubmit={handleSubmit}
    >
      <div>
        <p>Upload Image</p>
      </div>
      <label htmlFor="image">
        <img
          className="w-20 cursor-pointer"
          src={
            !product.image ? upload_area : URL.createObjectURL(product.image)
          }
          alt=""
        />
        <input
          type="file"
          id="image"
          hidden
          name="image"
          onChange={handleFileUpload}
        />
      </label>
      <div className="w-full">
        <p className="mb-2">Product Name</p>
        <input
          className="w-full max-w-[500px] px-3 py-2 border border-slate-400"
          type="text"
          placeholder="Type product name"
          name="name"
          value={product.name || ""}
          required
          onChange={addProduct}
        />
      </div>
      <div className="w-full">
        <p className="mb-2">Product Description</p>
        <textarea
          className="w-full max-w-[500px] px-3 py-2 border border-slate-400"
          type="text"
          placeholder="Type product description"
          required
          name="description"
          value={product.description || ""}
          onChange={addProduct}
        />
      </div>

      <div>
        <div className="mb-2">
          <p className="mb-2">Product Category</p>
          <select
            className="w-full px-3 py-2"
            name="category"
            value={product.category || ""}
            onChange={addProduct}
          >
            <option value="">Select category</option>
            <option value="Men">Men</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div className="mb-2">
          <p className="mb-2">Product Subcategory</p>
          <select
            className="w-full px-3 py-2"
            name="subCategory"
            value={product.subCategory || ""}
            onChange={addProduct}
          >
            <option value="">Select category</option>
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Product Price</p>
          <input
            className="px-2 py-1 border border-slate-400"
            type="number"
            placeholder="Enter price"
            name="price"
            value={product.price || ""}
            onChange={addProduct}
          />
        </div>
      </div>

      <div>
        <p className="mb-2">Product Sizes</p>
        <div className="flex gap-3">
          <div>
            <p
              className={`${
                size.includes("S") ? "bg-sky-400" : " bg-slate-200"
              } px-3 py-1 cursor-pointer`}
              onClick={() => toggleSize("S")}
            >
              S
            </p>
          </div>
          <div>
            <p
              className={`${
                size.includes("M") ? "bg-sky-400" : " bg-slate-200"
              } px-3 py-1 cursor-pointer`}
              onClick={() => toggleSize("M")}
            >
              M
            </p>
          </div>
          <div>
            <p
              className={`${
                size.includes("L") ? "bg-sky-400" : " bg-slate-200"
              } px-3 py-1 cursor-pointer`}
              onClick={() => toggleSize("L")}
            >
              L
            </p>
          </div>
          <div>
            <p
              className={`${
                size.includes("XL") ? "bg-sky-400" : " bg-slate-200"
              } px-3 py-1 cursor-pointer`}
              onClick={() => toggleSize("XL")}
            >
              XL
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <input
          type="checkbox"
          name="bestSeller"
          id="bestSeller"
          onChange={handleCheckbox}
        />
        <label htmlFor="bestSeller">Best Seller</label>
      </div>

      <button className="px-4 py-2 mt-4 bg-black text-white" type="submit">
        Add Product
      </button>
    </form>
  );
};

export default AddProduct;
