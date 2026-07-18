import { getProductById } from "@/api/products";
import config from "@/config";
import { PRODUCTS_ROUTE } from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";

const BestSeller = async () => {
  let product = null;

  if (config.bestSellerId) {
    try {
      product = await getProductById(config.bestSellerId);
    } catch {
      product = null;
    }
  }

  if (!product) {
    try {
      const { getProducts } = await import("@/api/products");
      const products = await getProducts({ limit: 1 });
      product = products?.[0] || null;
    } catch {
      product = null;
    }
  }

  if (!product) return null;

  const imageUrl = product.imageUrls?.[0];

  return (
    <section id="best-seller" className="py-12 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="bg-primary/5 dark:bg-primary-dark p-8 rounded-3xl grid grid-cols-1 sm:grid-cols-2 md:px-12 md:gap-8 gap-4 items-center">
          {imageUrl && (
            <Image
              className="max-w-full h-full rounded-2xl object-cover"
              src={imageUrl}
              height={600}
              width={800}
              alt="bestseller"
            />
          )}
          <div>
            <h2 className="dark:text-white font-bold text-3xl">
              {product.name}
            </h2>
            <p className="text-light dark:text-white py-2">
              {product.description?.slice(0, 300)}...
            </p>
            <h3 className="dark:text-white text-2xl font-semibold">
              Rs. {product.price}
            </h3>
            <Link
              href={`${PRODUCTS_ROUTE}/${product._id}`}
              className="inline-block bg-primary dark:bg-white rounded-3xl font-medium text-white dark:text-primary px-8 py-3 transition duration-300 ease mt-4"
            >
              View Product
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestSeller;
