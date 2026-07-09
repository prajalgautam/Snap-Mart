import heroImg from "@/assets/images/hero.jpg";
import { PRODUCTS_ROUTE, REGISTER_ROUTE } from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section id="hero" className="bg-white dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 md:items-center gap-8 lg:gap-16">
          <div className="relative overflow-hidden rounded-2xl shadow-lg bg-primary/5">
            <Image
              src={heroImg}
              alt="Local shop products ready for SnapMart delivery"
              height={900}
              width={1200}
              className="max-w-full w-full h-full object-cover"
              priority
            />
            <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-2">
              {["Nearby shops", "Fast delivery", "Secure pay"].map((item) => (
                <span
                  key={item}
                  className="rounded-lg bg-white/90 px-2 py-2 text-center text-xs font-semibold text-dark shadow"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div>
            <span className="text-primary bg-primary/10 text-xs font-medium px-4 py-1 rounded-xl">
              Hyperlocal shopping for your neighborhood
            </span>
            <h1 className="mt-2 text-4xl dark:text-white font-bold tracking-tight md:text-5xl lg:text-6xl">
              Order from local shops near you
            </h1>
            <p className="text-light dark:text-gray-400 py-4">
              SnapMart connects customers with trusted nearby vendors. Browse
              daily essentials, compare local products, pay online, and get
              faster deliveries without waiting on a central warehouse.
            </p>
            <div className="grid grid-cols-3 gap-3 py-2">
              <div>
                <h3 className="text-2xl font-bold text-primary">25m</h3>
                <p className="text-xs text-light dark:text-gray-400">
                  quick dispatch
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-primary">Local</h3>
                <p className="text-xs text-light dark:text-gray-400">
                  vendor network
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-primary">Online</h3>
                <p className="text-xs text-light dark:text-gray-400">
                  payments
                </p>
              </div>
            </div>
            <Link
              href={PRODUCTS_ROUTE}
              className="bg-primary rounded-3xl text-white py-2 px-8 transition ease duration-300 hover:shadow-lg"
            >
              Browse Nearby Shops
            </Link>
            <Link
              href={REGISTER_ROUTE}
              className="bg-tranparent rounded-3xl border-2 border-primary text-primary px-8 py-2 transition ease duration-300 mx-2 hover:bg-primary hover:text-white"
            >
              Become a Vendor
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
