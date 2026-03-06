"use client";
import { v4 } from "uuid";
import React, { useState, useEffect } from "react";
import Header from "../(components)/Header/index";
import { motion, AnimatePresence } from "framer-motion";

type ProductFormData = {
  name: string;
  price: number;
  stockQuantity: number;
  rating: number;
};

type CreateProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (formData: ProductFormData) => void;
};

const CreateProductModal = ({
  isOpen,
  onClose,
  onCreate,
}: CreateProductModalProps) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);
  const [formData, setFormData] = useState({
    productId: v4(),
    name: "",
    price: 0,
    stockQuantity: 0,
    rating: 0,
  });
  const [pending, setPending] = useState(false);
  if (!isOpen) return null;
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    onCreate(formData);
    setPending(false);
    onClose();
    setFormData({
      productId: v4(),
      name: "",
      price: 0,
      stockQuantity: 0,
      rating: 0,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData({
      ...formData,
      [name]:
        name === "price" || name === "stockQuantity" || name === "rating"
          ? parseFloat(value)
          : value,
    });
  };
  const handleCancel = () => {
    onClose();
    setFormData({
      productId: v4(),
      name: "",
      price: 0,
      stockQuantity: 0,
      rating: 0,
    });
  };
  const labelCssStyles = "block text-sm font-medium text-gray-700 mb-1";
  const inputCssStyles =
    "block w-full mb-2 p-2 border-gray-500 border-2 rounded-md";

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-gray-600/50 overflow-y-auto h-full w-full z-20 aria-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"
          initial={{ scale: 0.15, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.15, opacity: 0 }}
          transition={{ duration: 0.45 }}
        >
          <Header title="Create New Product" />
          <form onSubmit={handleSubmit}>
            <label className={labelCssStyles} htmlFor="productName">
              Product Name
            </label>
            <input
              className={inputCssStyles}
              value={formData.name}
              name="name"
              id="productName"
              type="text"
              placeholder="Name"
              onChange={handleChange}
              required
            />

            <label className={labelCssStyles} htmlFor="price">
              Price
            </label>
            <input
              className={inputCssStyles}
              value={formData.price}
              name="price"
              id="price"
              type="number"
              placeholder="Price"
              onChange={handleChange}
              required
            />

            <label className={labelCssStyles} htmlFor="stockQuantity">
              Stock Quantity
            </label>
            <input
              className={inputCssStyles}
              value={formData.stockQuantity}
              name="stockQuantity"
              id="stockQuantity"
              type="number"
              placeholder="Stock Quantity"
              onChange={handleChange}
              required
            />

            <label className={labelCssStyles} htmlFor="rating">
              Rating
            </label>
            <input
              className={inputCssStyles}
              value={formData.rating}
              name="rating"
              id="rating"
              type="number"
              placeholder="Rating"
              onChange={handleChange}
              required
            />

            <button
              type="submit"
              className={`px-4 py-2 mt-4 ${pending ? " bg-green-500" : "bg-blue-500"}  text-white rounded ${pending ? "hover:bg-green-700" : "hover:bg-blue-700"}`}
              disabled={pending}
            >
              {pending ? "Creating" : "Create"}
            </button>
            <button
              type="button"
              className="px-4 py-2 ml-1 mt-4 bg-gray-500 text-white rounde"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CreateProductModal;
