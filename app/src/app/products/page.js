import { getBrands, getCategories, getProducts } from "@/api/products";
import ProductCard from "./_components/Card";
import Filters from "./_components/Filters";

export const metadata = {
  title: "Products",
};

const ProductsPage = async ({ searchParams }) => {
  const products = await getProducts(await searchParams);
  const brands = await getBrands();
  const categories = await getCategories();

  return (
    <>
      <div className="mb-8">
        <span className="text-primary bg-primary/10 text-xs font-medium px-4 py-1 rounded-xl">
          Local marketplace
        </span>
        <h2 className="mt-2 text-2xl dark:text-white">
          Products from nearby shops
        </h2>
        <p className="text-light dark:text-gray-400">
          Browse available items from vendors around your area.
        </p>
      </div>
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
