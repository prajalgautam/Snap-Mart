import { FaMapLocationDot, FaStore, FaTruckFast } from "react-icons/fa6";

const ProductBanner = () => {
  return (
    <div className="rounded-xl p-8 bg-linear-to-r from-primary via-secondary to-accent shadow-xl grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
      <div>
        <span className="rounded-xl bg-white/25 px-3 py-1 text-xs font-semibold text-white">
          SnapMart Local
        </span>
        <h2 className="mt-2 font-black text-white text-4xl">
          Shop your area first
        </h2>
      </div>
      <div className="flex justify-center gap-4 text-white">
        <FaStore className="text-5xl" />
        <FaMapLocationDot className="text-5xl" />
        <FaTruckFast className="text-5xl" />
      </div>
      <h4 className="rounded-xl bg-white/90 px-5 py-4 font-bold text-primary text-center">
        Nearby vendors, online payment, faster doorstep delivery.
      </h4>
    </div>
  );
};

export default ProductBanner;
