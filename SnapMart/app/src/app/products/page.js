"use client";

import { getBrands, getCategories, getProducts } from "@/api/products";
import ProductCard from "./_components/Card";
import Filters from "./_components/Filters";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Spinner from "@/components/Spinner";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      const params = {};
      searchParams.forEach((value, key) => {
        params[key] = value;
      });

      const [productsData, brandsData, categoriesData] = await Promise.all([
        getProducts(params),
        getBrands(),
        getCategories(),
      ]);

      setProducts(productsData);
      setBrands(brandsData);
      setCategories(categoriesData);
      setLoading(false);
    }

    fetchData();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <h2 className="mb-8 text-2xl dark:text-white">Featured products</h2>
      <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_2fr] xl:grid-cols-[1fr_3fr]">
        <Filters brands={brands} categories={categories} />
        <div className="self-start grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <ProductCard product={product} key={index} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductsPage;