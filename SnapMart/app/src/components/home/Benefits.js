import { FaTruck, FaMapMarkerAlt, FaShieldAlt, FaRobot } from "react-icons/fa";

const benefits = [
  {
    icon: FaTruck,
    label: "Hyperlocal Velocity",
    info: "No massive warehouses. Products are delivered straight from neighborhood shops, guaranteeing ultra-rapid local courier routes.",
    color: "text-rose-500",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
  },
  {
    icon: FaMapMarkerAlt,
    label: "Geo-Discovered Stores",
    info: "Locate nearby supermarkets, pharmacies, stationary hubs, and clothing boutiques instantly from your current location.",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  {
    icon: FaRobot,
    label: "AI Shopping Engine",
    info: "Get personalized product curation, price comparison recommendations, and predictive inventory warnings directly as you shop.",
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20",
  },
  {
    icon: FaShieldAlt,
    label: "Secured Local Checkout",
    info: "Enjoy frictionless digital checkout options. Secure payment gateway integrations (Khalti) or reliable Cash on Delivery.",
    color: "text-teal-500",
    bg: "bg-teal-500/10",
    border: "border-teal-500/20",
  },
];

const Benefits = () => {
  return (
    <section id="benefits" className="py-20 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-900">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-[10px] bg-indigo-500/10 text-indigo-500 font-bold uppercase tracking-widest px-3 py-1 rounded-full dark:bg-indigo-500/20">
            Platform Capabilities
          </span>
          <h2 className="font-extrabold text-3xl md:text-4xl text-gray-900 dark:text-white tracking-tight">
            Built for modern local commerce.
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            SnapMart redesigns the connection between physical stores and local customers with advanced hyperlocal logistics and AI intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`relative overflow-hidden bg-white dark:bg-gray-950 p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-gray-200 dark:hover:border-gray-700`}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gray-50 dark:bg-gray-900/50 rounded-full blur-2xl pointer-events-none" />
              <div className={`p-4 w-12 h-12 rounded-2xl flex items-center justify-center ${benefit.bg} border ${benefit.border} mb-6`}>
                <benefit.icon className={`text-xl ${benefit.color}`} />
              </div>
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {benefit.label}
              </h4>
              <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">
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
