import {
  FaBoxesStacked,
  FaCreditCard,
  FaLocationDot,
  FaTruckFast,
} from "react-icons/fa6";

const benefits = [
  {
    Icon: FaLocationDot,
    label: "Nearby Vendors",
    info: "Shop from stores already serving your neighborhood.",
  },
  {
    Icon: FaTruckFast,
    label: "Faster Delivery",
    info: "Local fulfillment helps orders reach customers quickly.",
  },
  {
    Icon: FaBoxesStacked,
    label: "Live Inventory",
    info: "Vendors can manage product stock from their dashboard.",
  },
  {
    Icon: FaCreditCard,
    label: "Secure Payment",
    info: "Pay online and track your order from cart to delivery.",
  },
];

const Benefits = () => {
  return (
    <section id="benefits" className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-center mb-8 font-bold text-2xl dark:text-white">
          Why Choose Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="benefits-card">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <benefit.Icon className="text-2xl" />
              </span>
              <h4 className="text-lg dark:text-gray-200 font-medium">
                {benefit.label}
              </h4>
              <p className="text-light dark:text-gray-400 text-center text-sm">
                {benefit.info}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
