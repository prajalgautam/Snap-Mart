import heroImg from "@/assets/images/hero.jpg";
import { ABOUT_ROUTE, PRODUCTS_ROUTE } from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaStar } from "react-icons/fa";

const Hero = () => {
  return (
    <section id="hero" className="relative overflow-hidden bg-gray-50 dark:bg-gray-950 py-16 lg:py-24 border-b border-gray-100 dark:border-gray-900">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-accent/10 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-16">
          {/* Text Content */}
          <div className="lg:col-span-7 text-left space-y-6">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 text-xs font-semibold px-4 py-1.5 rounded-full dark:bg-primary/20 dark:text-primary-dark">
              <FaStar className="animate-spin-slow text-[10px]" />
              <span>Hyperlocal Shopping Reimagined</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black dark:text-white tracking-tight leading-tight">
              Your Neighborhood, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-indigo-600 to-accent">
                Delivered Instantly.
              </span>
            </h1>
            
            <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg max-w-xl leading-relaxed">
              SnapMart brings local supermarkets, pharmacies, dairies, and stationery stores onto one smart platform. Order from shops you trust and receive them in minutes, backed by AI-driven recommendations.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href={PRODUCTS_ROUTE}
                className="inline-flex items-center gap-2 bg-primary text-white font-semibold text-sm px-8 py-3.5 rounded-full shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all hover:-translate-y-0.5"
              >
                <span>Shop Marketplace</span>
                <FaArrowRight className="text-xs" />
              </Link>
              <Link
                href={ABOUT_ROUTE}
                className="inline-flex items-center bg-white dark:bg-gray-900 dark:text-white border border-gray-200 dark:border-gray-800 text-gray-800 font-semibold text-sm px-8 py-3.5 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Graphical Banner */}
          <div className="lg:col-span-5 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary to-accent rounded-3xl rotate-3 scale-[1.02] opacity-10 blur-sm pointer-events-none" />
            <Image
              src={heroImg}
              alt="SnapMart Hyperlocal"
              height={700}
              width={900}
              priority
              className="relative max-w-full w-full h-auto rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
