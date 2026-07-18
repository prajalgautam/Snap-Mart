"use client";

import { getProductById } from "@/api/products";
import ProductImage from "./_components/ProductImage";
import AddToCart from "../_components/AddToCart";
import ProductDescription from "./_components/ProductDescription";
import SuggestedProducts from "./_components/SuggestedProducts";
import Spinner from "@/components/Spinner";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      const data = await getProductById(id);
      setProduct(data);
      setLoading(false);
    }

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Spinner />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-red-500 text-lg">Product not found.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-5 lg:gap-24 md:grid-cols-2 text-black dark:text-white">
        <ProductImage imageUrls={product.imageUrls} />
        <div className="py-12">
          <span className="bg-blue-500/10 border border-blue-500 text-blue-500 text-xs font-medium px-1.5 py-0.5 rounded-full">
            {product.category}
          </span>

          <h1 className="text-4xl font-bold mb-5 mt-2">{product.name}</h1>
          <h3 className="text-2xl font-semibold text-primary-dark py-3">
            Rs. {product.price}
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            {product.description || "No product description has been provided yet."}
          </p>
          <div className="py-5">
            <AddToCart product={product} />
          </div>
        </div>
      </div>
      <div className="my-12">
        <ProductDescription source={product.description} />
      </div>
      <div>
        <h2 className="text-2xl font-semibold dark:text-white">
          You may also like
        </h2>
        <SuggestedProducts category={product.category} />
      </div>
    </div>
  );
};

export default ProductDetailsPage;
