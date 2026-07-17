"use client";

import { getProducts } from "@/api/products";
import ProductCard from "../../_components/Card";
import { useEffect, useState } from "react";

const SuggestedProducts = ({ category }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const data = await getProducts({ category, limit: 4 });
      setProducts(data || []);
    }

    fetchProducts();
  }, [category]);

  return (
    <div className="self-start grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 mt-6">
      {products?.map((product, index) => (
        <ProductCard product={product} key={index} />
      ))}
    </div>
  );
};

export default SuggestedProducts;