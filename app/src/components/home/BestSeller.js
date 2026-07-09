import { getProductById } from "@/api/products";
import config from "@/config";
import { PRODUCTS_ROUTE } from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";

const BestSeller = async () => {
  if (!config.bestSellerId) return null;

  const product = await getProductById(config.bestSellerId);
  const imageUrl = product?.imageUrls?.[0];

  if (!product || !imageUrl) return null;

  return (
    <section id="best-seller" className="py-12 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="bg-primary/5 dark:bg-primary-dark p-8 rounded-3xl grid grid-cols-1 sm:grid-cols-2 md:px-12 md:gap-8 gap-4 items-center">
          <Image
            className="max-w-full h-full rounded-2xl object-cover"
            src={imageUrl}
            height={600}
            width={800}
            alt="bestseller"
          />
          <div>
            <span className="inline-block rounded-xl bg-secondary/20 px-3 py-1 text-xs font-semibold text-primary dark:bg-white/20 dark:text-white">
              Local favorite
            </span>
            <h2 className="dark:text-white font-bold text-3xl">
              {product?.name}
            </h2>
            <p className="text-light dark:text-white py-2">
              {product?.description?.slice(0, 300)}...
            </p>
            <h3 className="dark:text-white text-2xl font-semibold">
              Rs. {product?.price}
            </h3>
            <Link
              href={`${PRODUCTS_ROUTE}/${config.bestSellerId}`}
              className="inline-block bg-primary dark:bg-white rounded-3xl font-medium text-white dark:text-primary px-8 py-3 transition duration-300 ease mt-4"
            >
              View Nearby Deal
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestSeller;
