"use client";
import {
  useGetProductsQuery,
  useCreateProductsMutation,
  useDeleteProductsMutation,
} from "@/state/api";
import Header from "../(components)/Header/index";
import { useState } from "react";
import { SearchIcon, PlusCircleIcon, DeleteIcon } from "lucide-react";
import Rating from "@/app/(components)/Rating/Rating";
import CreateProductModal from "@/app/products/CreateProductModal";
import ConfirmModal from "@/app/products/ConfirmModal";

type ProductFormData = {
  name: string;
  price: number;
  rating: number;
  stockQuantity: number;
};
const Page = () => {
  const [searchItem, setSearchItem] = useState("");
  const [isModalOpen, setIsModeOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const {
    data: products,
    isLoading,
    isError,
  } = useGetProductsQuery(searchItem);
  const [createProduct] = useCreateProductsMutation();
  const [deleteProducts] = useDeleteProductsMutation();
  const handleDeleteClick = (productId: string) => {
    setSelectedId(productId);
    setConfirmOpen(true);
  };
  const handleConfirmDeletion = async () => {
    if (!selectedId) return;
    try {
      await deleteProducts(selectedId).unwrap();
    } catch (err) {
      console.error("Deletion failed", err);
    } finally {
      setConfirmOpen(false);
      setSelectedId(null);
    }
  };
  const handleCreateProduct = async (productData: ProductFormData) => {
    await createProduct(productData);
  };
  if (isLoading) {
    return (
      <div className="flex items-center justify-around m-4 p-4 text-2xl font-semibold">
        Loading...
      </div>
    );
  }
  if (isError) {
    return (
      <div className="flex items-center justify-around m-4 p-4 text-2xl font-semibold text-red-500">
        Failed to fetch products...
      </div>
    );
  }
  return (
    <>
      <div className="mx-auto pb-5 w-full">
        {/* SEARCH BAR */}
        <div className="mb-6">
          <div className="flex items-center border-2 border-gray-200 rounded">
            <SearchIcon className="w-5 h-5 text-gray-500 m-2" />
            <input
              type="search"
              placeholder="Search products"
              className="w-full py-2 px-4 rounded bg-white"
              value={searchItem}
              onChange={(e) => setSearchItem(e.currentTarget.value)}
            />
          </div>
        </div>
        {/* HEADER BAR */}
        <div className="flex justify-between items-center mb-6">
          <Header title="Products" />
          <button
            className="flex items-center bg-blue-400 hover:bg-blue-600 text-gray-200 font-bold py-2 px-4 rounded"
            onClick={() => setIsModeOpen(true)}
          >
            <PlusCircleIcon className="w-5 h-5 mr-2 text-gray-200" />
            Create Product
          </button>
        </div>
        {/* BODY PRODUCT LIST*/}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 justify-bewteen">
          {products?.map((product) => {
            return (
              <div
                className="relative flex flex-col justify-between items-center gap-1 border-2 shadow-xl rounded-xl border-gray-200"
                key={product.productId}
              >
                <button
                  type="button"
                  className="absolute top-0 right-0 text-red-300 rounded hover:text-red-500"
                  onClick={() => handleDeleteClick(product.productId)}
                >
                  <DeleteIcon className="w-6 h-6" />
                </button>
                <p className=" mt-3 flex flex-row justify-between gap-8">
                  Logo
                </p>
                <h3 className="text-black font-bold text-lg">{product.name}</h3>
                <p className="text-gray-500 text-small">
                  ${product.price.toFixed(2)}
                </p>
                <p className="text-gray-500 text-small">
                  Stock: {product.stockQuantity}
                </p>
                <div className="flex flex-row mb-2">
                  <Rating rating={product.rating ? product.rating : 0} />
                </div>
              </div>
            );
          })}
        </div>
        {/* MODAL */}
        <CreateProductModal
          isOpen={isModalOpen}
          onClose={() => setIsModeOpen(false)}
          onCreate={handleCreateProduct}
        />
        <ConfirmModal
          isOpen={confirmOpen}
          onConfirm={handleConfirmDeletion}
          onCancel={() => setConfirmOpen(false)}
          title="Delete product"
          message="This product will be permanently removed."
        />
      </div>
    </>
  );
};

export default Page;
