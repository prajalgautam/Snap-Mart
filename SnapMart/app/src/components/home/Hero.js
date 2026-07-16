import heroImg from "@/assets/images/hero.jpg";
import { ABOUT_ROUTE, PRODUCTS_ROUTE } from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section id="hero" className="bg-white dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 md:items-center gap-8 lg:gap-16">
          <Image
            src={heroImg}
            alt="Hero image"
            height={900}
            width={1200}
            className="max-w-full w-auto h-full rounded-2xl shadow-lg"
          />
          <div>
            <span className="text-accent bg-accent/10 text-xs font-medium px-4 py-1 rounded-xl">
              Hyperlocal Delivery ⚡
            </span>
            <h1 className="mt-2 text-4xl dark:text-white font-bold tracking-tight md:text-5xl lg:text-6xl">
              Shop Nearby, Get It Faster
            </h1>
            <p className="text-light dark:text-gray-400 py-4">
              SnapMart connects you with local grocery stores, pharmacies, and
              shops near you. Order fresh products from nearby stores and get
              them delivered in record time. AI-powered recommendations make
              shopping smarter.
            </p>
            <Link
              href={PRODUCTS_ROUTE}
              className="bg-primary rounded-3xl text-white py-2 px-8 transition ease duration-300 hover:shadow-lg"
            >
              Shop Now →
            </Link>
            <Link
              href={ABOUT_ROUTE}
              className="bg-tranparent rounded-3xl border-2 border-primary text-primary px-8 py-2 transition ease duration-300 mx-2 hover:bg-primary hover:text-white"
            >
              Explore
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
