import { getProducts } from "@/api/products";
import ProductCard from "@/app/products/_components/Card";

const Featured = async () => {
  let products = [];

  try {
    products = await getProducts({ limit: 4 });
  } catch {
    products = [];
  }

  return (
    <section id="featured" className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-center mb-8 font-bold text-2xl dark:text-white">
          Featured products
        </h2>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">
            Products will appear here once the catalog is connected to the live database.
          </p>
        )}
      </div>
    </section>
  );
};

export default Featured;
