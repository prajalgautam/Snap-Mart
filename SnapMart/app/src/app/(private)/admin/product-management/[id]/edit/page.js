"use client";

import { getProductById } from "@/api/products";
import ProductForm from "../../_components/Form";
import BackButton from "@/components/BackButton";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Spinner from "@/components/Spinner";

const EditProductPage = () => {
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
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <BackButton />
        <p className="text-center text-red-500 mt-8">Product not found.</p>
      </div>
    );
  }

  return (
    <section>
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <BackButton />
        <h2 className="my-4 text-xl font-bold text-gray-900 dark:text-white">
          Edit product
        </h2>
        <ProductForm product={product} isEditing={true} />
      </div>
    </section>
  );
};

export default EditProductPage;